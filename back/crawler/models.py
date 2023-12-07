from django.db import models
from django.utils import timezone
from crm.models import CustomUser
from crm.managers import CustomHistoryManager
from crm.mixins import SaveUserMixin
from simple_history.models import HistoricalRecords


class CrawlList(models.Model):
    jigyosyo_code = models.CharField(max_length=255, primary_key=True, unique=True)
    jigyosyo_name = models.CharField(max_length=255, null=True, blank=True)
    kourou_jigyosyo_url = models.CharField(max_length=255, null=True, blank=True)
    history = HistoricalRecords()

    # history_objects = CustomHistoryManager()
    # fetch_datetime = models.DateTimeField(default=timezone.now, blank=True)
    def save(self, *args, **kwargs):
        history_user_id = kwargs.pop("history_user_id", None)
        print(f"history_user_id LIST_SAVE ================> {history_user_id}")
        print(f"kwargs ================> {kwargs}")
        super().save(*args, **kwargs)

        if history_user_id is not None:
            latest_history = self.history.latest()
            latest_history.history_user_id = history_user_id
            latest_history.save()

    # def save(self, *args, **kwargs):
    #     history_user_id = kwargs.pop("history_user_id", None)
    #     print(f"history_user_id LIST_SAVE ================> {history_user_id}")e
    #     print(f"kwargs ================> {kwargs}")
    #     super().save(*args, **kwargs)

    #     if history_user_id is not None:
    #         latest_history = self.history.latest()
    #         latest_history.history_user_id = history_user_id
    #         latest_history.save()


class CrawlDetail(models.Model, SaveUserMixin):
    crawl_list = models.ForeignKey(
        CrawlList, on_delete=models.CASCADE, related_name="details", null=True
    )
    history = HistoricalRecords()

    # history_objects = CustomHistoryManager()
    # fetch_datetime = models.DateTimeField(default=timezone.now, blank=True)
    def save(self, *args, **kwargs):
        history_user_id = kwargs.pop("history_user_id", None)
        print(f"history_user_id DETAIL_SAVE ================> {history_user_id}")
        print(f"kwargs ================> {kwargs}")
        super().save(*args, **kwargs)

        if history_user_id is not None:
            latest_history = self.history.latest()
            latest_history.history_user_id = history_user_id
            latest_history.save()
