from django.contrib import admin
from .models import City


class CityAdmin(admin.ModelAdmin):
    list_display = ["city", "lat", "lon", "country"]


admin.site.register(City, CityAdmin)
