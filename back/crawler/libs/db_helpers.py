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


system_user = CustomUser.objects.get(username="system")


def update_or_create_crawl_list(_crawl_list_data):
    crawl_list_data = {
        k.replace("crawl_list__", ""): v for k, v in _crawl_list_data.items()
    }

    instance, created = CrawlList.objects.update_or_create(
        jigyosyo_code=crawl_list_data.get("jigyosyo_code"),
        defaults=crawl_list_data,
    )
    return instance, created


def update_or_create_detail_info(detail_data):
    try:
        crawl_list_instance = CrawlList.objects.get(
            jigyosyo_code=detail_data.get("jigyosyo__code")
        )

        crawl_detail_instance = CrawlDetail.objects.filter(
            crawl_list=crawl_list_instance
        ).first()

        print(f"\n\n\n+++++++++++++++{detail_data}+++++++++++\n\n\n")
        if getattr(crawl_detail_instance, "fetch_datetime", None):
            last_fetch_time_diff_now = (
                timezone.now() - crawl_detail_instance.fetch_datetime
            )
            if last_fetch_time_diff_now < timedelta(days=90):
                return None

        # 1. Create or update Company instance
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

        print(f"company_management_data ====================> {company_data}")

        company_instance, _ = custom_update_or_create(
            Company,
            defaults=company_data,
            name=company_data["name"],
            address=company_data["address"],
        )

        # 2. Create or update Jigyosyo instance with reference to Company instance
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
            "crawl_list_instance": crawl_list_instance,
            "company": company_instance,
        }

        print(
            f"\n\n begin jigyosyo_data ====================> {jigyosyo_data} \n\n end\n\n"
        )

        Jigyosyo.objects.update_or_create_with_user(
            user=system_user,
            jigyosyo_code=jigyosyo_data["jigyosyo_code"],
            defaults=jigyosyo_data,
        )

        # 3. Update or create other related data
        CrawlDetail.objects.update_or_create_with_user(
            user=system_user,
            crawl_list=crawl_list_instance,
            defaults={"fetch_datetime": timezone.now()},
        )

    except Exception as e:
        print(f"Error encountered: {e}")
        traceback.print_exc()

    return None


@transaction.atomic
def custom_update_or_create(model, defaults=None, **kwargs):
    defaults = defaults or {}
    instance = model.objects.filter(**kwargs).first()

    if instance:
        # Update the object's fields
        for key, value in defaults.items():
            setattr(instance, key, value)
        instance.save()
        return instance, False

    else:
        # If the object does not exist, create it
        params = {**kwargs, **defaults}
        instance = model.objects.create(**params)
        return instance, True
