from django.urls import path
from rest_framework_simplejwt.views import TokenRefreshView
from .weather.views import WeatherView, CitiesView
from .users.views import RegisterView, LoginView, DeleteAccountView

urlpatterns = [
    # users
    path("signup/", RegisterView.as_view(), name="signup"),
    path("login/", LoginView.as_view(), name="login"),
    path("token/refresh/", TokenRefreshView.as_view(), name="token_refresh"),
    path("delete/", DeleteAccountView.as_view(), name="delete_account"),
    # weather
    path("weather/", WeatherView.as_view(), name="weather"),
    path("cities/", CitiesView.as_view(), name="cities"),
]
