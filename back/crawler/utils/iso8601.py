import re
from django.utils import timezone  # Import timezone from Django


# e.g. date_string = '2022年09月28日11:23' => 2022-09-28T11:23:00


def from_jp_time(date_string: str) -> timezone.datetime | None:
    print(f"~~~~~~~~~~~~~~~{date_string}~~~~~~~~~~~~~~~~~~~~~~~~")
    match = re.match(r"(\d{4})年(\d{2})月(\d{2})日(\d{2}):(\d{2})", date_string)
    if match:
        year, month, day, hour, minute = map(int, match.groups())
        # Use timezone.datetime instead of datetime
        dt_naive = timezone.datetime(year, month, day, hour, minute)
        dt_aware = timezone.make_aware(dt_naive)
        print(f"~~~~~~~~~~~~~~~{dt_aware}~~~~~~~~~~~~~~~~~~~~~~~~")
        return dt_aware
    else:
        # Return None if the date_string is not matched
        return None
