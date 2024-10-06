import type { MetaFunction } from "@remix-run/node";
import { json } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";
import { fetchWeather } from "~/services/weatherService";
import SideBar from "~/components/Sidebar";
import { HourlyForecast, DailyForecast } from "~/components/Forecast";
import { CityInfo, AirConditions } from "~/components/WeatherInfo";
import Search from "~/components/Search";
import { CheckToken } from "~/services/authentication";

export const meta: MetaFunction = () => {
  return [
    { title: "New Remix App" },
    { name: "description", content: "Welcome to Remix!" },
  ];
};

export async function loader({ request }: { request: Request }) {
  // Get the JWT token from the cookie
  const tokenCheck = await CheckToken(request);

  if (tokenCheck) return tokenCheck;

  const url = new URL(request.url);
  const city = url.searchParams.get("city") || "Tokyo";
  const country = url.searchParams.get("country") || "Japan";

  try {
    const data = await fetchWeather(city, country);
    return json(data);
  } catch (error) {
    console.error("Error fetching data:", error);
    throw new Response("Failed to fetch data", { status: 500 });
  }
}

export default function Index() {
  const data: any = useLoaderData();

  return (
    <>
      {data && (
        <main className="flex h-screen bg-dark-gray">
          <div className="flex flex-grow relative my-9 mx-[30px]">
            <SideBar />
            <div className="flex flex-col w-full mx-[22px]">
              <Search />
              <div className="flex min-w-[46rem]">
                <CityInfo data={data} />
              </div>
              <div className="flex flex-grow min-w-[46rem] mb-4">
                <HourlyForecast hourly={data.hourly} />
              </div>
              <div className="flex min-w-[46rem]">
                <AirConditions data={data} />
              </div>
            </div>
            <div className="flex w-full mt-[68px]">
              <DailyForecast daily={data.daily} />
            </div>
          </div>
        </main>
      )}
    </>
  );
}
