from django.db import models
from crm.managers import CustomHistoryManager
from simple_history.models import HistoricalRecords


class HistoryMixin(models.Model):
    history = HistoricalRecords()
    objects = CustomHistoryManager()


# class UpdateMixin(models.Model):
#     update_user = models.ForeignKey(
#         "CustomUser",
#         related_name="updated_%(class)s",
#         on_delete=models.SET_NULL,
#         null=True,
#         blank=True,
#     )
#     update_time = models.DateTimeField(auto_now=True)

#     class Meta:
#         abstract = True
