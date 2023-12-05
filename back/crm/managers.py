from simple_history.manager import HistoryManager
from django.contrib.auth.models import BaseUserManager
from django.contrib.auth import get_user_model


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
    def __init__(self, model=None, *args, **kwargs):
        super().__init__(model=model, *args, **kwargs)

    def update_or_create_with_user(self, user=None, **kwargs):
        if user is None:
            User = get_user_model()
            user, _ = User.objects.get_or_create(username="system")
        jigyosyo_code = kwargs.get("jigyosyo_code")
        defaults = kwargs.get("defaults", {})
        print("--|||||||||||||-----------{}---------|||||-----".format(jigyosyo_code))
        obj, created = self.update_or_create(
            jigyosyo_code=jigyosyo_code, defaults=defaults
        )

        latest_history = obj.history.latest()
        latest_history.history_user = user
        latest_history.save()

        return obj, created
