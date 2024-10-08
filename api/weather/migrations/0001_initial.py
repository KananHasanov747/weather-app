# Generated by Django 5.1 on 2024-09-15 16:46

from django.db import migrations, models


class Migration(migrations.Migration):

    initial = True

    dependencies = []

    operations = [
        migrations.CreateModel(
            name="City",
            fields=[
                (
                    "id",
                    models.BigAutoField(
                        auto_created=True,
                        primary_key=True,
                        serialize=False,
                        verbose_name="ID",
                    ),
                ),
                ("city", models.CharField(max_length=60)),
                ("country", models.CharField(max_length=60)),
                ("lat", models.FloatField()),
                ("lon", models.FloatField()),
                ("population", models.IntegerField()),
            ],
            options={
                "verbose_name_plural": "cities",
                "db_table": "weather_cities",
            },
        ),
    ]
