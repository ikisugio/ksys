from django.contrib import admin
from .models import CustomUser, Jigyosyo, Company, JigyosyoTransaction
from crawler.models import CrawlList, CrawlDetail


class CrawlListAdmin(admin.ModelAdmin):
    list_display = [field.name for field in CrawlList._meta.fields]

class CustomUserAdmin(admin.ModelAdmin):
    list_display = [field.name for field in CustomUser._meta.fields if field.name != "password"]

class JigyosyoAdmin(admin.ModelAdmin):
    list_display = [field.name for field in Jigyosyo._meta.fields]

class CompanyAdmin(admin.ModelAdmin):
    list_display = [field.name for field in Company._meta.fields]

class JigyosyoTransactionAdmin(admin.ModelAdmin):
    list_display = [field.name for field in JigyosyoTransaction._meta.fields]


admin.site.register(CrawlList, CrawlListAdmin)
admin.site.register(CustomUser, CustomUserAdmin)
admin.site.register(Jigyosyo, JigyosyoAdmin)
admin.site.register(Company, CompanyAdmin)
admin.site.register(JigyosyoTransaction, JigyosyoTransactionAdmin)
