import time
from django.utils import timezone  # Import timezone from Django


def wait(wait_time):
    return time.sleep(wait_time)


def today(data_format):
    # Use timezone.now() instead of datetime.now()
    return timezone.now().strftime(data_format)
