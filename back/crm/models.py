from django.db import models
from django.contrib.auth.models import AbstractBaseUser, BaseUserManager, PermissionsMixin
from django.core.validators import EmailValidator


class CustomUserManager(BaseUserManager):
    def create_user(self, email=None, password=None, **extra_fields):
        email = self.normalize_email(email)
        user = self.model(email=email, **extra_fields)
        user.set_password(password)
        user.save(using=self._db)
        return user

    def create_superuser(self, email=None, password=None, **extra_fields):
        extra_fields.setdefault("is_staff", True)
        extra_fields.setdefault("is_superuser", True)

        return self.create_user(email, password, **extra_fields)


class CustomUser(AbstractBaseUser, PermissionsMixin):
    email = models.EmailField(blank=False, null=False,
                              validators=[EmailValidator()])
    username = models.CharField(
        unique=True, max_length=60, blank=True, null=True)
    date_joined = models.DateTimeField(auto_now_add=True, editable=False)
    is_active = models.BooleanField(default=True)
    is_staff = models.BooleanField(default=True)

    objects = CustomUserManager()

    USERNAME_FIELD = "username"
    REQUIRED_FIELDS = []

    def __str__(self):
        return self.username


class Jigyosyo(models.Model):
    jigyosyo_code = models.CharField(max_length=255)
    company = models.ForeignKey(
        "Company", on_delete=models.SET_NULL, related_name="jigyosyos", null=True, blank=True
    )
    type = models.CharField(max_length=255, null=True, blank=True)
    name = models.CharField(max_length=255, null=True, blank=True)
    postal_code = models.CharField(max_length=255, null=True, blank=True)
    address = models.CharField(max_length=255, null=True, blank=True)
    tel_number = models.CharField(max_length=255, null=True, blank=True)
    fax_number = models.CharField(max_length=255, null=True, blank=True)
    repr_name = models.CharField(max_length=255, null=True, blank=True)
    repr_position = models.CharField(max_length=255, null=True, blank=True)
    kourou_jigyosyo_url = models.CharField(
        max_length=255, null=True, blank=True)
    kourou_release_datetime = models.DateTimeField(null=True, blank=True)
    add_user = models.CharField(max_length=255, null=True, blank=True)

    def __str__(self):
        return self.name


class Company(models.Model):
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
    add_user = models.CharField(max_length=200)

    def __str__(self):
        return self.name


class JigyosyoTransaction(models.Model):
    jigyosyo = models.ForeignKey(
        Jigyosyo, on_delete=models.SET_NULL, related_name="transactions", null=True, blank=True
    )
    visit_datetime = models.DateTimeField(auto_now_add=True)
    content = models.TextField()

    def __str__(self):
        return f"訪問履歴: {(self.jigyosyo.name if self.jigyosyo else 'No Jigyosyo')} - {self.visit_datetime.strftime('%Y-%m-%d %H:%M:%S')}"
