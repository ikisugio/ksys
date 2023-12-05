from django.utils import timezone  # Import timezone from Django
from ..utils import kk_parsers
from ..libs import db_helpers
from ..etc import configs
import time
import logs.factories


logger = logs.factories.create_debug_logger(__name__)


def run():
    jigyosyo_natl_list = []
    initial_url = configs.NATL_TOP_URL
    wait_time = configs.DEFAULT_SELENIUM_WAIT_TIME
    search_prefs = configs.SEARCH_PREFS

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
            logger.debug(jigyosyo_natl_list)
            is_next = natl_kk_selenium.go_next_list_page()

    print(jigyosyo_natl_list)
