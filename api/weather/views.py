from rest_framework.views import APIView
from rest_framework import generics
from rest_framework.response import Response
from rest_framework import status
from .models import City
from .serializers import CitySerializer
from .api import WeatherAPI


class CitiesView(generics.ListAPIView):
    serializer_class = CitySerializer

    # @method_decorator(csrf_exempt)
    # def dispatch(self, *args, **kwargs):
    #     return super().dispatch(*args, **kwargs)

    def get_queryset(self):
        query = self.request.query_params.get("q", "")
        return City.objects.filter(city__icontains=query)[:4]


class WeatherView(APIView):
    def get(self, request, *args, **kwargs):
        city = request.GET.get("city", "")
        country = request.GET.get("country", "")
        if not city:
            return Response(
                {"error": "City parameter is required"},
                status=status.HTTP_400_BAD_REQUEST,
            )

        data = WeatherAPI(city=city, country=country).data()

        return Response(data, status=status.HTTP_200_OK)
