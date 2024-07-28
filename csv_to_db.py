import csv
import sqlite3

# Path to the CSV file
csv_file_path = "worldcities.csv"

# Connect to the SQLite database
conn = sqlite3.connect("db.sqlite3")
cursor = conn.cursor()

# Open the CSV file
with open(csv_file_path, newline="", encoding="utf-8") as csvfile:
    reader = csv.DictReader(csvfile)

    # Insert each row into the weather_cities table
    for row in reader:
        cursor.execute(
            """
            INSERT INTO weather_cities (city, lat, lon, country, population)
            VALUES (?, ?, ?, ?, ?)
        """,
            (
                row["city_ascii"],
                row["lat"],
                row["lng"],
                row["country"],
                row["population"],
            ),
        )

# Commit the changes and close the connection
conn.commit()
conn.close()
