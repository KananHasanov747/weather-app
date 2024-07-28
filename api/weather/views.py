from rest_framework.views import APIView
from rest_framework import generics

# from rest_framework.permissions import IsAdminUser
from rest_framework.response import Response
from rest_framework import status
from .models import City
from .serializers import CitySerializer
from .data import WeatherAPI


class CitiesView(generics.ListAPIView):
    serializer_class = CitySerializer

    def get_queryset(self):
        query = self.request.query_params.get("q", "")
        return City.objects.filter(city__icontains=query)[:10]


class WeatherView(APIView):
    def get(self, request, *args, **kwargs):
        city = request.GET.get("city", "")
        country = request.GET.get("country", "")
        if not city:
            return Response(
                {"error": "City parameter is required"},
                status=status.HTTP_400_BAD_REQUEST,
            )

        data = WeatherAPI(city=city).data()

        return Response(data, status=status.HTTP_200_OK)
        # weather_url = f'http://api.openweathermap.org/data/2.5/forecast?q={city}&cnt=40&units=metric&appid={os.getenv("WEATHER_API_KEY")}'
        # weather_response = requests.get(weather_url)
        #
        # if weather_response.status_code == 200:
        #     return Response(data, status=status.HTTP_200_OK)
        # else:
        #     return Response(
        #         {"error": "Failed to fetch weather data"},
        #         status=status.HTTP_500_INTERNAL_SERVER_ERROR,
        #     )
