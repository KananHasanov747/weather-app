from django.urls import path
from .views import WeatherView, CitiesView

urlpatterns = [
    path("weather/", WeatherView.as_view(), name="weather"),
    path("cities/", CitiesView.as_view(), name="cities"),
]
