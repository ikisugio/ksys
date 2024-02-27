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
    type = models.CharField(max_length=255, null=True, blank=True)
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
    custom_code = models.CharField(max_length=255, unique=True, null=True, blank=True)
    service_type = models.CharField(max_length=255, null=True, blank=True)
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
    number_of_capacity = models.PositiveIntegerField(null=True, blank=True)
    koyoukanri_sekinin_status = models.CharField(max_length=255, null=True, blank=True)
    established_date = models.DateField(null=True, blank=True)
    turnover_rate = models.FloatField(null=True, blank=True)
    url = models.CharField(max_length=255, null=True, blank=True)
    sanjo_number = models.PositiveIntegerField(null=True, blank=True)

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
    visit_staff = models.JSONField(default=list, blank=True, null=True)
    receptionist = models.JSONField(default=list, blank=True, null=True)
    visit_date = models.DateField(null=True, blank=True)
    visit_memo = models.TextField(null=True, blank=True)
    file = models.FileField(null=True, blank=True)
    history = HistoricalRecords()

    support_means = models.CharField(
        max_length=100, choices=constants.SUPPORT_MEANS_CHOICES, null=True, blank=True
    )
    keikei_kubun = models.CharField(
        max_length=100, choices=constants.KEIKEI_KUBUN_CHOICES, null=True, blank=True
    )
    support_status = models.CharField(
        max_length=100, choices=constants.SUPPORT_STATUS_CHOICES, null=True, blank=True
    )
    is_tool_utilization_business_manual = models.BooleanField(
        null=True, blank=True, verbose_name="業務推進マニュアル"
    )
    is_tool_utilization_check_action = models.BooleanField(
        null=True, blank=True, verbose_name="CHECK&ACTION"
    )
    is_tool_utilization_shibu_document = models.BooleanField(
        null=True, blank=True, verbose_name="支部作成の資料"
    )
    is_tool_utilization_others = models.BooleanField(
        null=True,
        blank=True,
        verbose_name="その他（ツール内容は「支援内容・把握した課題等」に記載）",
    )
    is_under_fifty = models.BooleanField(
        null=True, blank=True, verbose_name="５０人以下"
    )
    is_before_establishment = models.BooleanField(
        null=True, blank=True, verbose_name="開業前"
    )
    is_within_three_years_since_estabrishment = models.BooleanField(
        null=True, blank=True, verbose_name="開業３年未満"
    )
    is_dedicated = models.BooleanField(
        null=True, blank=True, verbose_name="雇用管理責任者選任の有無"
    )
    is_participated = models.BooleanField(
        null=True, blank=True, verbose_name="責任者講習受講の有無"
    )
    # is_use_kaigo_machine_subsidy = models.BooleanField(
    #     null=True, blank=True, verbose_name="介護機器助成金の使用"
    # )
    # is_use_other_subsidy = models.BooleanField(
    #     null=True, blank=True, verbose_name="助成金の活用状況"
    # )
    is_use_subsidy = models.BooleanField(
        null=True, blank=True, verbose_name="助成金の活用状況"
    )
    exists_koyoukanri = models.BooleanField(
        null=True, blank=True, verbose_name="雇用管理責任者の有無"
    )
    exists_sekininkousyu = models.BooleanField(
        null=True, blank=True, verbose_name="責任者講習経験者の有無"
    )
    is_recruiting_on_hw = models.BooleanField(
        null=True, blank=True, verbose_name="ＨＷに募集中"
    )
    is_recruiting_on_expect_hw = models.BooleanField(
        null=True, blank=True, verbose_name="ＨＷ以外に募集予定"
    )
    is_going_to_recruit = models.BooleanField(
        null=True, blank=True, verbose_name="募集予定"
    )
    is_accepting_intern = models.BooleanField(
        null=True, blank=True, verbose_name="介護実習の受入"
    )
    will_inform_hw = models.BooleanField(
        null=True, blank=True, verbose_name="労働局（ＨＷ）への伝達"
    )
    will_inform_prefecture = models.BooleanField(
        null=True, blank=True, verbose_name="都道府県への伝達"
    )
    will_inform_others = models.BooleanField(
        null=True, blank=True, verbose_name="その他の関係機関への伝達"
    )
    done_explain_support = models.BooleanField(
        null=True, blank=True, verbose_name="支援メニューの説明"
    )
    done_knowing_problem = models.BooleanField(
        null=True, blank=True, verbose_name="課題の把握"
    )
    with_employment_consultant = models.BooleanField(
        null=True, blank=True, verbose_name="雇用コンサルと同行"
    )
    with_health_counselor = models.BooleanField(
        null=True, blank=True, verbose_name="ヘルスカウンセラーと同行"
    )
    with_training_coordinator = models.BooleanField(
        null=True, blank=True, verbose_name="研修コーディネーターと同行"
    )
    with_alone_on_hw = models.BooleanField(
        null=True, blank=True, verbose_name="労働局委託で単独"
    )
    with_staff_on_hw = models.BooleanField(
        null=True, blank=True, verbose_name="労働局委託で職員と同行"
    )

    koyou_job_posting_consult = models.BooleanField(
        null=True, blank=True, verbose_name="雇用管理にかかる求人求職の相談"
    )
    koyou_job_posting_inform = models.BooleanField(
        null=True, blank=True, verbose_name="雇用管理にかかる求人求職の情報"
    )
    koyou_working_conditions_consult = models.BooleanField(
        null=True, blank=True, verbose_name="労働条件の相談"
    )
    koyou_working_conditions_inform = models.BooleanField(
        null=True, blank=True, verbose_name="労働条件の情報"
    )
    koyou_welfare_benefits_consult = models.BooleanField(
        null=True, blank=True, verbose_name="福利厚生の相談"
    )
    koyou_welfare_benefits_inform = models.BooleanField(
        null=True, blank=True, verbose_name="福利厚生の情報"
    )
    koyou_workplace_communication_consult = models.BooleanField(
        null=True, blank=True, verbose_name="職場のコミュニケーションの相談"
    )
    koyou_workplace_communication_inform = models.BooleanField(
        null=True, blank=True, verbose_name="職場のコミュニケーションの情報"
    )
    koyou_subsidies_consult = models.BooleanField(
        null=True, blank=True, verbose_name="助成金の相談"
    )
    koyou_subsidies_inform = models.BooleanField(
        null=True, blank=True, verbose_name="助成金の情報"
    )
    koyou_care_services_consult = models.BooleanField(
        null=True, blank=True, verbose_name="介護サービスの相談"
    )
    koyou_care_services_inform = models.BooleanField(
        null=True, blank=True, verbose_name="介護サービスの情報"
    )
    koyou_workplace_environment_philosophy_consult = models.BooleanField(
        null=True, blank=True, verbose_name="理念・教育・環境の相談"
    )
    koyou_workplace_environment_philosophy_inform = models.BooleanField(
        null=True, blank=True, verbose_name="理念・教育・環境の情報"
    )
    koyou_workplace_environment_ict_consult = models.BooleanField(
        null=True, blank=True, verbose_name="生産性向上（ICT）の相談"
    )
    koyou_workplace_environment_ict_inform = models.BooleanField(
        null=True, blank=True, verbose_name="生産性向上（ICT）の情報"
    )
    koyou_skill_development_consult = models.BooleanField(
        null=True, blank=True, verbose_name="能力開発の相談"
    )
    koyou_skill_development_inform = models.BooleanField(
        null=True, blank=True, verbose_name="能力開発の情報"
    )
    koyou_employment_management_responsibility_consult = models.BooleanField(
        null=True, blank=True, verbose_name="雇用管理責任者関係の相談"
    )
    koyou_employment_management_responsibility_inform = models.BooleanField(
        null=True, blank=True, verbose_name="雇用管理責任者関係の情報"
    )
    koyou_other_consult = models.BooleanField(
        null=True, blank=True, verbose_name="雇用管理に係るその他の相談"
    )
    koyou_other_inform = models.BooleanField(
        null=True, blank=True, verbose_name="雇用管理に係るその他の情報"
    )

    # 能力開発に関する項目
    noukai_qualification_system_training_consult = models.BooleanField(
        null=True, blank=True, verbose_name="資格制度研修情報の相談"
    )
    noukai_qualification_system_training_inform = models.BooleanField(
        null=True, blank=True, verbose_name="資格制度研修情報の情報"
    )
    noukai_job_posting_consult = models.BooleanField(
        null=True, blank=True, verbose_name="能力開発にかかる求人求職の相談"
    )
    noukai_job_posting_inform = models.BooleanField(
        null=True, blank=True, verbose_name="能力開発にかかる求人求職の情報"
    )
    noukai_training_plan_curriculum_consult = models.BooleanField(
        null=True, blank=True, verbose_name="研修計画カリキュラム策定の相談"
    )
    noukai_training_plan_curriculum_inform = models.BooleanField(
        null=True, blank=True, verbose_name="研修計画カリキュラム策定の情報"
    )
    noukai_subsidy_system_for_skill_development_consult = models.BooleanField(
        null=True, blank=True, verbose_name="能力開発にかかる助成制度関係の相談"
    )
    noukai_subsidy_system_for_skill_development_inform = models.BooleanField(
        null=True, blank=True, verbose_name="能力開発にかかる助成制度関係の情報"
    )
    noukai_vocational_skill_development_promoter_consult = models.BooleanField(
        null=True, blank=True, verbose_name="職業能力開発推進者関係の相談"
    )
    noukai_vocational_skill_development_promoter_inform = models.BooleanField(
        null=True, blank=True, verbose_name="職業能力開発推進者関係の情報"
    )
    noukai_other_skill_development_consult = models.BooleanField(
        null=True, blank=True, verbose_name="能力開発に係るその他の相談"
    )
    noukai_other_skill_development_inform = models.BooleanField(
        null=True, blank=True, verbose_name="能力開発に係るその他の情報"
    )

    _management_is_sanjo = models.BooleanField(default=False, null=True, blank=True)
    _management_description = models.CharField(max_length=200, null=True, blank=True)

    _jigyosyo_code = models.CharField(max_length=255, null=True, blank=True)
    _jigyosyo_custom_code = models.CharField(max_length=255, null=True, blank=True)
    _company_name = models.CharField(
        max_length=255, null=True, blank=True, verbose_name="法人名"
    )
    _jigyosyo_name = models.CharField(max_length=255, null=True, blank=True)
    _jigyosyo_service_type = models.CharField(
        max_length=255, null=True, blank=True, verbose_name="サービス種別"
    )
    _company_type = models.CharField(
        max_length=255,
        null=True,
        blank=True,
        verbose_name="法人種別",
        choices=constants.COMPANY_TYPE_CHOICES,
    )
    _jigyosyo_number_of_member = models.PositiveIntegerField(
        null=True, blank=True, verbose_name="職員数"
    )
    _jigyosyo_established_date = models.DateField(
        null=True, blank=True, verbose_name="事業所開業日"
    )
    _jigyosyo_address = models.CharField(
        max_length=255, null=True, blank=True, verbose_name="事業所住所"
    )
    _jigyosyo_tel_number = models.CharField(
        max_length=255, null=True, blank=True, verbose_name="事業所電話番号"
    )
    _jigyosyo_repr_name = models.CharField(
        max_length=255, null=True, blank=True, verbose_name="事業所代表者名"
    )
    _management_koyoukanri_memo = models.CharField(
        max_length=255, null=True, blank=True, verbose_name="雇用管理者専任状況"
    )

    _jigyosyo_postal_code = models.CharField(max_length=255, null=True, blank=True)
    _jigyosyo_fax_number = models.CharField(max_length=255, null=True, blank=True)
    _jigyosyo_repr_position = models.CharField(max_length=255, null=True, blank=True)
    _jigyosyo_kourou_url = models.CharField(max_length=255, null=True, blank=True)
    _jigyosyo_kourou_release_datetime = models.DateTimeField(null=True, blank=True)
    _jigyosyo_koyoukanri_sekinin_status = models.CharField(
        max_length=255, null=True, blank=True
    )

    def __str__(self):
        return f"訪問履歴: {(self._jigyosyo_name if self._jigyosyo_name else 'No Jigyosyo')} - {self.visit_date.strftime('%Y-%m-%d')}"

    def save(self, *args, **kwargs):
        if self.management:
            self._management_is_sanjo = (
                self._management_is_sanjo or self.management.is_sanjo
            )
            self._management_description = (
                self._management_description or self.management.description
            )

            jigyosyo = self.management.jigyosyo
            if jigyosyo:
                self._jigyosyo_code = self._jigyosyo_code or jigyosyo.jigyosyo_code
                self._jigyosyo_service_type = (
                    self._jigyosyo_service_type or jigyosyo.type
                )
                self._jigyosyo_name = self._jigyosyo_name or jigyosyo.name
                self._jigyosyo_postal_code = (
                    self._jigyosyo_postal_code or jigyosyo.postal_code
                )
                self._jigyosyo_address = self._jigyosyo_address or jigyosyo.address
                self._jigyosyo_tel_number = (
                    self._jigyosyo_tel_number or jigyosyo.tel_number
                )
                self._jigyosyo_fax_number = (
                    self._jigyosyo_fax_number or jigyosyo.fax_number
                )
                self._jigyosyo_repr_name = (
                    self._jigyosyo_repr_name or jigyosyo.repr_name
                )
                self._jigyosyo_repr_position = (
                    self._jigyosyo_repr_position or jigyosyo.repr_position
                )
                self._jigyosyo_kourou_url = (
                    self._jigyosyo_kourou_url or jigyosyo.kourou_jigyosyo_url
                )
                self._jigyosyo_kourou_release_datetime = (
                    self._jigyosyo_kourou_release_datetime
                    or jigyosyo.kourou_release_datetime
                )
                self._jigyosyo_number_of_member = (
                    self._jigyosyo_number_of_member or jigyosyo.number_of_member
                )
                self._jigyosyo_exists_koyou_sekininsha = (
                    self._jigyosyo_exists_koyou_sekininsha
                    or jigyosyo.exists_koyou_sekininsha
                )
                self._jigyosyo_is_use_kaigo_machine_subsidy = (
                    self._jigyosyo_is_use_kaigo_machine_subsidy
                    or jigyosyo.is_use_kaigo_machine_subsidy
                )
                self._jigyosyo_is_use_other_subsidy = (
                    self._jigyosyo_is_use_other_subsidy or jigyosyo.is_use_other_subsidy
                )

        super().save(*args, **kwargs)


# class TransactionStaffDetail(models.Model):
#     transaction = models.ForeignKey(
#         JigyosyoTransaction,
#         on_delete=models.CASCADE,
#         related_name="staff_details",
#         blank=True,
#         null=True,
#     )
#     staff_name = models.CharField(
#         max_length=255, verbose_name="スタッフ名", blank=True, null=True
#     )
#     position = models.CharField(
#         max_length=50,
#         choices=constants.POSITION_CHOICES,
#         verbose_name="役職",
#         blank=True,
#         null=True,
#     )

#     def __str__(self):
#         return f"{self.staff_name} ({self.position}) - {self.transaction}"


# class TransactionReceptionistDetail(models.Model):
#     transaction = models.ForeignKey(
#         JigyosyoTransaction,
#         on_delete=models.CASCADE,
#         related_name="receptionist_details",
#         blank=True,
#         null=True,
#     )
#     staff_name = models.CharField(
#         max_length=255, verbose_name="対応者", blank=True, null=True
#     )
#     position = models.CharField(
#         max_length=50,
#         verbose_name="役職",
#         blank=True,
#         null=True,
#     )

#     def __str__(self):
#         return f"{self.staff_name} ({self.position}) - {self.transaction}"
