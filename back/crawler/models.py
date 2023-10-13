from django.db import models
from django.utils import timezone
from crm.models import CustomUser
from crm.managers import CustomHistoryManager
from simple_history.models import HistoricalRecords


class CrawlList(models.Model):
    jigyosyo_code = models.CharField(max_length=255, primary_key=True)
    jigyosyo_name = models.CharField(max_length=255, null=True, blank=True)
    kourou_jigyosyo_url = models.CharField(max_length=255, null=True, blank=True)
    history = HistoricalRecords(manager_name="custom_objects")
    history_objects = CustomHistoryManager()
    # fetch_datetime = models.DateTimeField(default=timezone.now, blank=True)


class CrawlDetail(models.Model):
    crawl_list = models.ForeignKey(
        CrawlList, on_delete=models.CASCADE, related_name="details", null=True
    )
    history = HistoricalRecords(manager_name="custom_objects")
    history_objects = CustomHistoryManager()
    # fetch_datetime = models.DateTimeField(default=timezone.now, blank=True)
