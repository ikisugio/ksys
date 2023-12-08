from turtle import up
from django.db import transaction
from datetime import timedelta
from crawler.models import CrawlList, CrawlDetail
from crm.models import (
    CustomUser,
    Company,
    CompanyManagement,
    Jigyosyo,
    JigyosyoManagement,
)
from django.utils import timezone
import traceback
from crm.models import CustomUser


system_user = CustomUser.objects.get(username="system")
system_user_id = system_user.id


def update_or_create_crawl_list(_crawl_list_data):
    crawl_list_data = {
        k.replace("crawl_list__", ""): v for k, v in _crawl_list_data.items()
    }

    # 'fetch_datetime' フィールドを辞書から削除する
    crawl_list_data.pop("fetch_datetime", None)

    instance, created = CrawlList.objects.update_or_create(
        jigyosyo_code=crawl_list_data.get("jigyosyo_code"),
        defaults=crawl_list_data,
    )

    # instance.save(history_user_id=system_user_id)

    return instance, created


def update_or_create_detail_info(detail_data):
    try:
        crawl_list_instance = CrawlList.objects.get(
            jigyosyo_code=detail_data.get("jigyosyo__code")
        )

        # crawl_detail_instance = CrawlDetail.objects.filter(
        #     crawl_list=crawl_list_instance
        # ).first()

        print(f"\n\n\n+++++++++++++++{detail_data}+++++++++++\n\n\n")

        company_fields = [
            company_meta_field.name
            for company_meta_field in Company._meta.get_fields()
            if company_meta_field.name != "jigyosyos"
        ]

        company_data = {
            **{
                company_field: detail_data.get(f"company__{company_field}")
                for company_field in company_fields
            },
            "company_code": detail_data.get("company__code"),
            "release_datetime": detail_data.get("jigyosyo__release_datetime"),
        }
        print(f"company_data ====================> {company_data}")

        company_instance, _ = Company.objects.update_or_create(
            name=company_data["name"],
            address=company_data["address"],
            defaults=company_data,
        )

        relation_fields = ["management", "transactions"]

        jigyosyo_fields = [
            jigyosyo_meta_field.name
            for jigyosyo_meta_field in Jigyosyo._meta.get_fields()
            if jigyosyo_meta_field.name not in relation_fields
        ]

        jigyosyo_data = {
            **{
                jigyosyo_field: detail_data.get(f"jigyosyo__{jigyosyo_field}")
                for jigyosyo_field in jigyosyo_fields
            },
            "jigyosyo_code": detail_data.get("jigyosyo__code"),
            "name": crawl_list_instance.jigyosyo_name,
            "kourou_jigyosyo_url": crawl_list_instance.kourou_jigyosyo_url,
            "kourou_release_datetime": detail_data.get("jigyosyo__release_datetime"),
            # "crawl_list_instance": crawl_list_instance,
            "company": company_instance,
        }

        print(
            f"\n\n begin jigyosyo_data ====================> {jigyosyo_data} \n\n end\n\n"
        )

        Jigyosyo.objects.update_or_create(
            jigyosyo_code=jigyosyo_data["jigyosyo_code"],
            defaults={**jigyosyo_data},
        )

    except Exception as e:
        print(f"Error encountered: {e}")
        traceback.print_exc()

    return None
