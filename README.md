# Weather App

Used technologies:

- Django & React as a solid foundation using hybrid architecture and working on 1 local server
- Axios for frontend to make API calls
- Django REST Framework, to send JSON data to the frontend
- Webpack & Babel for correct React realization
- TailwindCSS as the main CSS framework
- OpenWeather is global weather data, which provides via API

Steps for running the project (Unix/MacOS):

- Download the project via (link)[https://github.com/KananHasanov747/weather-app]
- You need to have two sessions working in the terminal in order to run both frontend and backend side
- For frontend, install all important packages using `npm install` and run using `npm run dev`
- For backend, create a Python virtual environment using `python -m venv .venv` and run with `source .venv/bin/activate`
- Install packages using `pip install -r requiremenets.txt` and run the backend side with `python manage.py runserver`
- To access the admin account use the same name for both **login** and **password**

TODO:

- [x] **(required)** API call via using search engine with the provided data as a response from backend side for the near future
- [ ] Written tests
- [ ] Stored in Docker container
- [ ] Made autocomplete (hints) while typing the city name
- [ ] During the revisit would be suggested to watch the forecast of the city, which was viewed by User
- [ ] Will be saved the search history for each User individually, and will be an API showing how many times was the specific city being typed
