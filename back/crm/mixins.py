from simple_history.models import HistoricalRecords


class SaveUserMixin:
    # history = HistoricalRecords()

    def save(self, *args, **kwargs):
        history_user_id = kwargs.pop("history_user_id", None)
        print(f"history_user_id MIXIN_SAVE ================> {history_user_id}")
        print(f"kwargs ================> {kwargs}")
        super().save(*args, **kwargs)

        if history_user_id is not None:
            latest_history = self.history.latest()
            latest_history.history_user_id = history_user_id
            latest_history.save()
