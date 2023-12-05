from enum import unique
from django.db import models
from django.contrib.auth.models import (
    AbstractBaseUser,
    PermissionsMixin,
)
from django.core.validators import EmailValidator
from crm.managers import CustomUserManager, CustomHistoryManager
from crm.mixins import SaveUserMixin
from simple_history.models import HistoricalRecords


class CustomUser(AbstractBaseUser, PermissionsMixin, SaveUserMixin):
    email = models.EmailField(
        blank=False,
        null=False,
        validators=[EmailValidator()],
    )
    username = models.CharField(
        unique=True,
        max_length=60,
        blank=True,
        null=True,
    )
    date_joined = models.DateTimeField(auto_now_add=True, editable=False)
    is_active = models.BooleanField(default=True)
    is_staff = models.BooleanField(default=True)
    USERNAME_FIELD = "username"
    REQUIRED_FIELDS = []
    objects = CustomUserManager()
    history = HistoricalRecords()

    def __str__(self):
        return self.username


class Company(models.Model, SaveUserMixin):
    company_code = models.CharField(max_length=255, null=True, blank=True)
    shubetsu = models.CharField(max_length=255, null=True, blank=True)
    name = models.CharField(max_length=255, null=True, blank=True)
    name_kana = models.CharField(max_length=255, null=True, blank=True)
    postal_code = models.CharField(max_length=255, null=True, blank=True)
    address = models.CharField(max_length=255, null=True, blank=True)
    tel_number = models.CharField(max_length=255, null=True, blank=True)
    fax_number = models.CharField(max_length=255, null=True, blank=True)
    url = models.CharField(max_length=255, null=True, blank=True)
    repr_name = models.CharField(max_length=255, null=True, blank=True)
    repr_position = models.CharField(max_length=255, null=True, blank=True)
    established_date = models.DateField(null=True, blank=True)
    release_datetime = models.DateTimeField(null=True, blank=True)
    history = HistoricalRecords()

    class Meta:
        unique_together = ("name", "address")

    def __str__(self):
        return self.name


class CompanyManagement(models.Model, SaveUserMixin):
    company = models.OneToOneField(
        "Company",
        related_name="management",
        on_delete=models.CASCADE,
        null=True,
        blank=True,
    )
    description = models.TextField(null=True, blank=True)
    history = HistoricalRecords()


class Jigyosyo(models.Model, SaveUserMixin):
    jigyosyo_code = models.CharField(max_length=255, unique=True)
    company = models.ForeignKey(
        "Company",
        on_delete=models.SET_NULL,
        related_name="jigyosyos",
        null=True,
        blank=True,
    )
    type = models.CharField(max_length=255, null=True, blank=True)
    name = models.CharField(max_length=255, null=True, blank=True)
    postal_code = models.CharField(max_length=255, null=True, blank=True)
    address = models.CharField(max_length=255, null=True, blank=True)
    tel_number = models.CharField(max_length=255, null=True, blank=True)
    fax_number = models.CharField(max_length=255, null=True, blank=True)
    repr_name = models.CharField(max_length=255, null=True, blank=True)
    repr_position = models.CharField(max_length=255, null=True, blank=True)
    kourou_jigyosyo_url = models.CharField(max_length=255, null=True, blank=True)
    kourou_release_datetime = models.DateTimeField(null=True, blank=True)
    history = HistoricalRecords()
    objects = CustomHistoryManager()

    def __str__(self):
        return self.name


class JigyosyoManagement(models.Model, SaveUserMixin):
    jigyosyo = models.OneToOneField(
        "Jigyosyo",
        related_name="management",
        on_delete=models.CASCADE,
        null=True,
        blank=True,
    )
    is_sanjo = models.BooleanField(default=False)
    children = models.ManyToManyField(
        "self",
        related_name="parental_objects",
        symmetrical=False,
        blank=True,
    )

    @property
    def parents(self):
        return self.parental_objects.all()

    description = models.CharField(max_length=200, null=True, blank=True)
    crawl_list = models.ForeignKey(
        "crawler.CrawlList",
        related_name="jigyosyos_management",
        on_delete=models.SET_NULL,
        null=True,
        blank=True,
    )
    history = HistoricalRecords()


class JigyosyoTransaction(models.Model, SaveUserMixin):
    jigyosyo = models.ForeignKey(
        "Jigyosyo",
        related_name="transactions",
        on_delete=models.SET_NULL,
        null=True,
        blank=True,
    )
    visit_datetime = models.DateTimeField(auto_now_add=True)
    content = models.TextField()
    history = HistoricalRecords()

    def __str__(self):
        return f"訪問履歴: {(self.jigyosyo.name if self.jigyosyo else 'No Jigyosyo')} - {self.visit_datetime.strftime('%Y-%m-%d %H:%M:%S')}"
