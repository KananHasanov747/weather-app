from django.contrib import admin
from django.urls import path, include
from .views import FrontEndView

urlpatterns = [
    path('admin/', admin.site.urls),
    path('api/', include("api.weather.urls")),
    path("api-auth", include("rest_framework.urls")),
    path(r'', FrontEndView.as_view(), name="index"),
    path(r'<path:path>', FrontEndView.as_view(), name="paths"),
]
