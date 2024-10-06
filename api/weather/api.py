from .models import City
import openmeteo_requests
import pandas as pd
import requests_cache
from retry_requests import retry

from datetime import datetime, UTC

# import math


cache_session = requests_cache.CachedSession(".cache", expire_after=3600)
retry_session = retry(cache_session, retries=5, backoff_factor=0.2)
openmeteo = openmeteo_requests.Client(session=retry_session)
url = "https://api.open-meteo.com/v1/forecast"


class WeatherAPI:
    def __init__(self, city, country):
        _ = City.objects.get(city=city, country=country)
        self.city = _.city
        self.country = _.country
        self.lat = _.lat
        self.lon = _.lon

    def params(self):
        return {
            "latitude": self.lat,
            "longitude": self.lon,
            "current": [
                "temperature_2m",
                "apparent_temperature",
                "is_day",
                "precipitation",
                "rain",
                "weather_code",
                "wind_speed_10m",
                "wind_direction_10m",
            ],
            "hourly": ["temperature_2m", "relative_humidity_2m", "weather_code"],
            "daily": [
                "weather_code",
                "temperature_2m_max",
                "temperature_2m_min",
                "sunrise",
                "sunset",
                "uv_index_max",
            ],
            # "timezone": "auto",
        }

    def data(self):
        response = openmeteo.weather_api(url, params=self.params())[0]
        current = response.Current()
        hourly = response.Hourly()
        daily = response.Daily()
        hourly_date = pd.date_range(
            start=pd.to_datetime(
                datetime.now(UTC)
                .replace(minute=0, second=0, microsecond=0)
                .timestamp(),
                unit="s",
                utc=True,
            ),
            end=pd.to_datetime(hourly.TimeEnd(), unit="s", utc=True),
            freq=pd.Timedelta(seconds=hourly.Interval()),
            inclusive="left",
        )
        daily_date = pd.date_range(
            start=pd.to_datetime(daily.Time(), unit="s", utc=True),
            end=pd.to_datetime(daily.TimeEnd(), unit="s", utc=True),
            freq=pd.Timedelta(seconds=daily.Interval()),
            inclusive="left",
        )
        day_of_week = daily_date.day_name()

        return {
            "city": self.city,
            "country": self.country,
            "latitude": self.lat,
            "longitude": self.lon,
            "current": {
                "temperature": round(current.Variables(0).Value()),
                "apparent_temperature": round(current.Variables(1).Value()),
                "is_day": int(current.Variables(2).Value()),
                "precipitation": current.Variables(3).Value(),
                "rain": round(current.Variables(4).Value(), 2),
                "weather_code": current.Variables(5).Value(),
                "wind_speed": round(current.Variables(6).Value(), 2),
                "wind_direction": round(current.Variables(7).Value()),
            },
            "hourly": {
                "start": hourly.Time(),
                "date": hourly_date[:24:4],
                "is_day": hourly_date.map(
                    lambda x: (
                        True
                        if pd.Timestamp("05:00:00").time() <= x.time()
                        or x.time() < pd.Timestamp("20:00:00").time()
                        else False
                    )
                )[:24:4],
                "temperature": [
                    round(_) for _ in hourly.Variables(0).ValuesAsNumpy()[:24:4]
                ],
                "humidity": hourly.Variables(1).ValuesAsNumpy()[:24:4],
                "weather_code": [
                    round(_) for _ in hourly.Variables(2).ValuesAsNumpy()[:24:4]
                ],
            },
            "daily": {
                "date": daily_date,
                "day_of_week": day_of_week,
                "weather_code": [round(_) for _ in daily.Variables(0).ValuesAsNumpy()],
                "temperature_max": [
                    round(_) for _ in daily.Variables(1).ValuesAsNumpy()
                ],
                "temperature_min": [
                    round(_) for _ in daily.Variables(2).ValuesAsNumpy()
                ],
                "sunrise": daily.Variables(3).ValuesAsNumpy(),
                "sunset": daily.Variables(4).ValuesAsNumpy(),
                "uv_index": [round(_) for _ in daily.Variables(5).ValuesAsNumpy()],
            },
        }
