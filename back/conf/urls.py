from django.conf import settings
from django.contrib import admin
from django.urls import path, include

urlpatterns = [
    path("manage/", admin.site.urls),
    path("crawl/", include("crawler.urls")),
    path("api/", include("crm.urls")),
]

if settings.DEBUG:
    import debug_toolbar

    urlpatterns = [
        path("__debug__/", include(debug_toolbar.urls)),
    ] + urlpatterns
