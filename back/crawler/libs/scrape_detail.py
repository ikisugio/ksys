import requests
from bs4 import BeautifulSoup, Tag, NavigableString
import unicodedata
from django.utils import timezone
from datetime import date, datetime
from typing import Any, Callable
from ..utils import iso8601
from ..utils.adnorm import full_norm
from ..libs import db_helpers
from ..models import CrawlList
import time
from logs import factories as log_factories

# from crm.models import Company, Jigyosyo

logger = log_factories.create_debug_logger(__name__)


def convert_url(url: str) -> str:
    return url.replace("kani", "kihon")


def get_soup(url: str) -> BeautifulSoup | None:
    try:
        response = requests.get(url, timeout=10)
        response.raise_for_status()
        return BeautifulSoup(response.content, "html.parser")
    except requests.RequestException as e:
        print(f"Request error for URL {url}: {e}")
        return None
    except Exception as e:
        print(f"Unexpected error for URL {url}: {e}")
        return None


def fetch_company_detail(data_url: str) -> dict[str, str | date | datetime | None]:
    soup: BeautifulSoup | None = get_soup(data_url)
    if not soup:
        print("not found soup")
        return {}

    company_div_find: Tag | NavigableString | None = soup.find("div", id="tableGroup-1")
    if isinstance(company_div_find, Tag):
        company_div: Tag = company_div_find
    else:
        print("company_div is not a Tag or not found")
        return {}

    company_table_div: Tag | NavigableString | None = company_div.find("table")
    if isinstance(company_table_div, Tag):
        company_table: Tag = company_table_div
    else:
        print("company_table is not a Tag or not found")
        return {}

    details: dict[str, str | date | datetime | None] = {}
    mappings: dict[str, str] = {
        "法人番号": "company__code",
        "法人等の種類": "company__type",
        "名称": "company__name",
        "（ふりがな）": "company__name_kana",
        "所在地": "company__address",
        "電話番号": "company__tel_number",
        "ＦＡＸ番号": "company__fax_number",
        "ホームページ": "company__url",
        "氏名": "company__repr_name",
        "職名": "company__repr_position",
        "法人等の設立年月日": "company__established_date",
    }

    for soup_td in company_table.find_all("td"):
        soup_th = soup_td.find_previous("th")

        th = soup_th.text.split(",")[0].strip()
        td = soup_td.text.replace(" ", "").replace("\u3000", "")
        
        # logger.debug(f"soup_th: {soup_th}")
        # logger.debug(f"th: {th}")
        # logger.debug(f"td: {td}")

        if th in mappings:
            if th == "法人番号" and not td:
                details[mappings[th]] = ""
            elif th == "設立年月日":
                details[mappings[th]] = datetime.strptime(td, "%Y/%m/%d").date()
            elif th == "（ふりがな）":
                if soup_td.get("diffid") == "diff-c3":
                    details["company__name_kana"] = td.replace("\u3000", " ")
                elif soup_td.get("diffid") == "diff-c4":
                    details["company__name"] = td.replace("\u3000", " ")
            elif th == "法人等の設立年月日":

                def to_date(date_string: str) -> date | None:
                    if not date_string:
                        return None
                    return datetime.strptime(date_string, "%Y/%m/%d").date()

                date_string = td.replace("\u3000", " ")
                details[mappings[th]] = to_date(date_string)

            else:
                details[mappings[th]] = td.replace("\u3000", " ")

        if "所在地" in th:
            if soup_td.get("diffid") == "diff-c7":
                details["company__postal_code"] = td.replace("〒", "").strip()
            elif soup_td.get("diffid") == "diff-c8":
                details["company__address"] = full_norm(td)
    # logger.debug(f"details: {details}")
    return details


def fetch_jigyosyo_detail(
    base_data_url: str,
) -> dict[str, str | date | datetime | None]:
    detail_data_url = convert_url(base_data_url)

    soup = get_soup(detail_data_url)
    if not soup:
        print("detail soup not found")
        return {}

    p_tag_find: Tag | NavigableString | None = soup.find("p")
    if p_tag_find is not None:
        p_tag: Tag | NavigableString = p_tag_find
        jigyosyo__release_datetime: datetime | None = iso8601.from_jp_time(
            p_tag.text.split()[0]
        )
    else:
        print("p_tag not found")
        jigyosyo__release_datetime: datetime | None = None

    details: dict[str, str | datetime | None] = {
        "jigyosyo__release_datetime": jigyosyo__release_datetime,
        "jigyosyo__code": detail_data_url.split("JigyosyoCd=")[1].split("-")[0],
        "crawl_detail__fetch_datetime": timezone.now().replace(microsecond=0),
    }

    key_map: dict[str, str] = {
        "jigyosyo__tel_number": "電話番号",
        "jigyosyo__fax_number": "FAX番号",
        "jigyosyo__repr_name": "氏名",
        "jigyosyo__repr_position": "職名",
    }

    for key, search_text in key_map.items():
        found_element = soup.find(string=search_text)
        if found_element is not None:
            next_element = found_element.find_next()
            if next_element is not None:
                raw_text = next_element.text.strip()
                details[key] = unicodedata.normalize("NFKC", raw_text)
            else:
                details[key] = None

    def extract_and_normalize_address(soup: BeautifulSoup) -> tuple[str, str]:
        address_tag = soup.find(string="所在地").find_next().find_next()
        raw_address = address_tag.text.strip()
        postal_code = raw_address.split("\u3000")[0].replace("〒", "").strip()
        address = raw_address.replace("〒" + postal_code, "").strip()

        normalized_postal_code = unicodedata.normalize("NFKC", postal_code)
        normalized_address = unicodedata.normalize("NFKC", address)

        return normalized_postal_code, normalized_address

    jigyosyo_postal_code, jigyosyo_address = extract_and_normalize_address(soup)
    details["jigyosyo__postal_code"] = jigyosyo_postal_code
    details["jigyosyo__address"] = full_norm(jigyosyo_address)
    details["jigyosyo__type"] = soup.find(string="介護サービスの種類").find_next().text.strip()

    erase_space: Callable[[Any], str | date | datetime | None] = (
        lambda x: x.replace(" ", "").replace("\u3000", "") if type(x) == str else x
    )
    detail_jigyosyo_data: dict[str, str | date | datetime | None] = {
        k: erase_space(v) for k, v in details.items()
    }

    return detail_jigyosyo_data


def fetch_detail(base_data_url: str):
    detail_data_url = convert_url(base_data_url)
    print(f"~~~~~~~~~~~{detail_data_url}~~~~~~~~~~~~~~~~~")

    jigyosyo_details = fetch_jigyosyo_detail(detail_data_url)
    company_details = fetch_company_detail(detail_data_url)

    print("fetch ~~~~~~~~~~~~~~")
    print(jigyosyo_details)
    print(company_details)

    detail_data = {**jigyosyo_details, **company_details}
    print(f"\ndetail_data\n@@@@@@@@@@@@@@@@@\n{detail_data}\n@@@@@@@@@@@\n")

    # logger.debug(f"detail_data: {detail_data}")
    return detail_data


def run():
    crawl_list_entries = CrawlList.objects.all()

    for crawl_list_entry in crawl_list_entries:
        base_data_url = crawl_list_entry.kourou_jigyosyo_url
        detail_data = fetch_detail(base_data_url)

        db_helpers.update_or_create_detail_info(detail_data)
        
        time.sleep(1)
