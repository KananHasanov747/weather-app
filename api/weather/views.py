from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from dotenv import load_dotenv
from datetime import datetime
from collections import defaultdict
import requests
import os

load_dotenv()

class WeatherView(APIView):
    def get(self, request, *args, **kwargs):
        city = request.GET.get('city', 'Tokyo')
        if not city:
            return Response({"error": "City parameter is required"}, status=status.HTTP_400_BAD_REQUEST)
 
        weather_url = f'http://api.openweathermap.org/data/2.5/forecast?q={city}&cnt=40&units=metric&appid={os.getenv("WEATHER_API_KEY")}'
        weather_response = requests.get(weather_url)

        if weather_response.status_code == 200:
            response = weather_response.json()
            city = response["city"]["name"]
            data_list = response["list"]
            datestamp = lambda date: (
                    datetime.utcfromtimestamp(date).strftime('%Y-%m-%d'))
            timestamp = lambda time: (
                    datetime.utcfromtimestamp(time).strftime("%I:%M %p"))
            dayweekstamp = lambda dayweek: (
                    datetime.utcfromtimestamp(dayweek).strftime("%a")
            )
            current_date = datestamp(data_list[0]["dt"])
            hourly = {
                "icon": [],
                "time": [],
                "temp": [],
                "wind_speed": [],
                "feels_like": [],
                "chance_of_rain": []
            }
            daily = defaultdict(lambda: {
                "temp": [], 
                "temp_min": [],
                "temp_max": [],
                "day_of_week": "",
                "icon": "",
            })

            for entry in data_list:
                date = datestamp(entry["dt"])
                time = timestamp(entry["dt"])
                dayweek = dayweekstamp(entry["dt"])
                icon = entry["weather"][0]["icon"]
                temp = entry["main"]["temp"]
                temp_min = entry["main"]["temp_min"]
                temp_max = entry["main"]["temp_max"]
                feels_like = entry["main"]["feels_like"]
                wind_speed = entry["wind"]["speed"]
                chance_of_rain = entry.get("pop", 0) * 100

                if len(hourly["time"]) < 6:
                    hourly["icon"].append(icon)
                    hourly["time"].append(time)
                    hourly["temp"].append(round(temp))
                    hourly["wind_speed"].append(round(wind_speed, 2))
                    hourly["feels_like"].append(round(feels_like))
                    hourly["chance_of_rain"].append(round(chance_of_rain))
                
                daily[date]["temp"].append(temp)
                daily[date]["temp_min"].append(temp_min)
                daily[date]["temp_max"].append(temp_max)
                daily[date]["day_of_week"] = dayweek
                daily[date]["icon"] = icon.replace("n", "d")

            for date in daily:
                daily[date]["temp"] = (
                        round(sum(daily[date]["temp"]) / len(daily[date]["temp"])))
                daily[date]["temp_min"] = (
                        round(sum(daily[date]["temp_min"]) / len(daily[date]["temp_min"])))
                daily[date]["temp_max"] = (
                    round(sum(daily[date]["temp_max"]) / len(daily[date]["temp_max"])))

            data = {
                "city": city,
                "current": daily[current_date],
                "hourly": hourly,
                "daily": daily,
            }

            return Response(data, status=status.HTTP_200_OK)
        else:
            return Response({"error": "Failed to fetch weather data"}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)

