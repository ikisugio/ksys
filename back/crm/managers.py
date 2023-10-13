from simple_history.manager import HistoryManager
from django.contrib.auth.models import BaseUserManager


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


class CustomHistoryManager(HistoryManager):
    def update_or_create_with_user(self, user=None, **kwargs):
        jigyosyo_code = kwargs.get("jigyosyo_code")
        defaults = kwargs.get("defaults", {})
        obj, created = self.update_or_create(
            jigyosyo_code=jigyosyo_code, defaults=defaults
        )
        if user is not None:
            with obj.history.override_user(user):
                obj.save()
        return obj, created
