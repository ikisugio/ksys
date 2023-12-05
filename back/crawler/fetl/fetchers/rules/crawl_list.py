from django.utils import timezone
from crawler.utils import kk_parsers
from crawler.libs import db_helpers
from crawler.etc import configs


def run(url: str | None = None):
    jigyosyo_natl_list: list[str] = []
    if url:
        initial_url: str = url
    else:
        initial_url: str = configs.NATL_TOP_URL
    wait_time: int = configs.DEFAULT_SELENIUM_WAIT_TIME
    search_prefs: list[str] = configs.SEARCH_PREFS

    natl_kk_selenium = kk_parsers.KK_Selenium(initial_url, wait_time)
    pref_url_dict = natl_kk_selenium.get_pref_urls(search_prefs)

    for pref_url in pref_url_dict.values():
        natl_kk_selenium.driver.get(pref_url)
        natl_kk_selenium.all_search_pref_page()
        is_next = True

        while is_next:
            natl_kk_selenium._wait()
            jigyosyo_info_dict = natl_kk_selenium.get_crawl_list_page()
            current_datetime = (
                timezone.now()
            )  # Replace datetime.now() with timezone.now()

            print(jigyosyo_info_dict)
            for jigyosyo_info in jigyosyo_info_dict:
                jigyosyo_info["fetch_datetime"] = current_datetime
                # Update function name to custom_update_or_create_crawl_list
                db_helpers.update_or_create_crawl_list(jigyosyo_info)

            jigyosyo_natl_list.append(jigyosyo_info_dict)
            natl_kk_selenium._wait()
            print(jigyosyo_natl_list)
            is_next = natl_kk_selenium.go_next_list_page()

    print(jigyosyo_natl_list)
