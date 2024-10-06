from django.contrib import admin
from .models import City


class CityAdmin(admin.ModelAdmin):
    list_display = ["country", "city", "lat", "lon", "population"]


admin.site.register(City, CityAdmin)
