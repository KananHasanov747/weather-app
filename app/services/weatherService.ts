const API_BASE_URL = "http://localhost:8000/api";

async function API(
  url: string,
  content: { query?: string; city?: string; country?: string }
) {
  try {
    const response = await fetch(
      `${API_BASE_URL}${url}${
        url === "/cities/"
          ? `?q=${content.query}` // if /cities
          : `?city=${content.city}&country=${content.country}` // if /weather
      }`,
      {
        headers: {
          Accept: "application/json",
        },
      }
    );
    if (response.ok) {
      return await response.json();
    }
  } catch (error) {
    console.error(`Error fetching ${url}:`, error);
    throw error;
  }
}

export async function fetchCities(query: string) {
  return API("/cities/", { query });
}

export async function fetchWeather(city: string, country: string) {
  return API("/weather/", { city, country });
}
