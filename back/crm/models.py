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
from crm import constants


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
    company_code = models.CharField(max_length=255, null=True, blank=True, unique=True)
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
    jigyosyo_code = models.CharField(max_length=255, unique=True, null=True, blank=True)
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
    number_of_member = models.PositiveIntegerField(null=True, blank=True)
    exists_koyou_sekininsha = models.BooleanField(null=True, blank=True)
    is_use_kaigo_machine_subsidy = models.BooleanField(null=True, blank=True)
    is_use_other_subsidy = models.BooleanField(null=True, blank=True)

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
    management = models.ForeignKey(
        "JigyosyoManagement",
        related_name="transactions",
        on_delete=models.SET_NULL,
        null=True,
        blank=True,
    )
    visit_datetime = models.DateField()
    content = models.TextField()
    history = HistoricalRecords()
    keikei_kubun = models.CharField(
        max_length=100, choices=constants.KEIKEI_KUBUN_CHOICES
    )
    support_status = models.CharField(
        max_length=100, choices=constants.SUPPORT_STATUS_CHOICES
    )
    support_means = models.CharField(
        max_length=100, choices=constants.SUPPORT_MEANS_CHOICES
    )
    is_recruiting_on_hw = models.BooleanField(null=True, blank=True)
    is_recruiting_on_expect_hw = models.BooleanField(null=True, blank=True)
    is_going_to_recruit = models.BooleanField(null=True, blank=True)
    is_accepting_intern = models.BooleanField(null=True, blank=True)
    will_inform_hw = models.BooleanField(null=True, blank=True)
    will_inform_prefecture = models.BooleanField(null=True, blank=True)
    will_inform_others = models.BooleanField(null=True, blank=True)
    done_explain_support = models.BooleanField(null=True, blank=True)
    done_knowing_problem = models.BooleanField(null=True, blank=True)

    management_is_sanjo = models.BooleanField(default=False)
    management_description = models.CharField(max_length=200, null=True, blank=True)

    jigyosyo_code = models.CharField(max_length=255, null=True, blank=True)
    jigyosyo_type = models.CharField(max_length=255, null=True, blank=True)
    jigyosyo_name = models.CharField(max_length=255, null=True, blank=True)
    jigyosyo_postal_code = models.CharField(max_length=255, null=True, blank=True)
    jigyosyo_address = models.CharField(max_length=255, null=True, blank=True)
    jigyosyo_tel_number = models.CharField(max_length=255, null=True, blank=True)
    jigyosyo_fax_number = models.CharField(max_length=255, null=True, blank=True)
    jigyosyo_repr_name = models.CharField(max_length=255, null=True, blank=True)
    jigyosyo_repr_position = models.CharField(max_length=255, null=True, blank=True)
    jigyosyo_kourou_url = models.CharField(max_length=255, null=True, blank=True)
    jigyosyo_kourou_release_datetime = models.DateTimeField(null=True, blank=True)
    jigyosyo_number_of_member = models.PositiveIntegerField(null=True, blank=True)
    jigyosyo_exists_koyou_sekininsha = models.BooleanField(null=True, blank=True)
    jigyosyo_is_use_kaigo_machine_subsidy = models.BooleanField(null=True, blank=True)
    jigyosyo_is_use_other_subsidy = models.BooleanField(null=True, blank=True)

    def __str__(self):
        return f"訪問履歴: {(self.jigyosyo_name if self.jigyosyo_name else 'No Jigyosyo')} - {self.visit_datetime.strftime('%Y-%m-%d')}"

    def save(self, *args, **kwargs):
        if self.management:
            self.management_is_sanjo = self.management.is_sanjo
            self.management_description = self.management.description

            jigyosyo = self.management.jigyosyo
            if jigyosyo:
                self.jigyosyo_code = jigyosyo.jigyosyo_code
                self.jigyosyo_type = jigyosyo.type
                self.jigyosyo_name = jigyosyo.name
                self.jigyosyo_postal_code = jigyosyo.postal_code
                self.jigyosyo_address = jigyosyo.address
                self.jigyosyo_tel_number = jigyosyo.tel_number
                self.jigyosyo_fax_number = jigyosyo.fax_number
                self.jigyosyo_repr_name = jigyosyo.repr_name
                self.jigyosyo_repr_position = jigyosyo.repr_position
                self.jigyosyo_kourou_url = jigyosyo.kourou_jigyosyo_url
                self.jigyosyo_kourou_release_datetime = jigyosyo.kourou_release_datetime
                self.jigyosyo_number_of_member = jigyosyo.number_of_member
                self.jigyosyo_exists_koyou_sekininsha = jigyosyo.exists_koyou_sekininsha
                self.jigyosyo_is_use_kaigo_machine_subsidy = (
                    jigyosyo.is_use_kaigo_machine_subsidy
                )
                self.jigyosyo_is_use_other_subsidy = jigyosyo.is_use_other_subsidy

        super().save(*args, **kwargs)
