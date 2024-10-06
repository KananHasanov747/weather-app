from django.db import models
from django.contrib.auth.models import AbstractUser
from ..weather.models import City


class User(AbstractUser):
    visited_cities = models.ManyToManyField(
        City, blank=True, limit_choices_to={"id__lte": 5}
    )

    def __str__(self):
        return self.username
