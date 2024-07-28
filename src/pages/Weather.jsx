import React, { useState, useEffect } from "react";
import axios from "axios";
import SideBar from "../components/SideBar";
import HourlyForecast from "../components/HourlyForecast";
import DailyForecast from "../components/DailyForecast";
import images from "../assets/images";
import { FaThermometerHalf, FaWind } from "react-icons/fa";
import { IoWater } from "react-icons/io5";
import { TbUvIndex } from "react-icons/tb";
import Search from "../components/Search";

export default function Weather() {
  const [data, setData] = useState(null);

  const fetchData = async (city, country) => {
    if (city && country) {
      try {
        const response = await axios.get(
          `/api/weather/?city=${city}&country=${country}`,
        );
        setData(response.data);
      } catch (error) {
        console.error("Error fetching weather data:", error);
      }
    }
  };

  useEffect(() => {
    fetchData("Tokyo", "Japan"); // Call fetchData with initial city on mount
  }, []);

  return (
    <>
      {data && (
        <main className="flex h-screen bg-dark-gray">
          <div className="flex flex-grow relative my-9 mx-[30px]">
            <SideBar />
            <div className="flex flex-col w-full mx-[22px]">
              <Search fetchData={fetchData} />
              <div className="flex min-w-[46rem]">
                <div className="w-full">
                  <div className="flex px-11 py-9">
                    <div className="flex-grow">
                      <div className="mb-6">
                        <h2 className="text-4xl text-light-white font-semibold mb-1.5">
                          {data.city}
                        </h2>
                        <span className="text-sm text-dark-white font-normal tracking-wide">
                          Chance of rain: {data.current.rain}%
                        </span>
                      </div>
                      <div className="mb-2">
                        <span className="text-6xl text-light-white font-medium">
                          {data.current.temperature}°
                        </span>
                      </div>
                    </div>
                    <img
                      className="h-[194px]"
                      src={
                        data.current.is_day
                          ? images[data.current.weather_code].day
                          : images[data.current.weather_code].night
                      }
                      alt={images[data.current.weather_code].description}
                    />
                  </div>
                </div>
              </div>
              <div className="flex flex-grow min-w-[46rem] mb-4">
                <div className="flex w-full">
                  <div className="flex flex-col w-full p-7 bg-light-gray rounded-3xl">
                    <h1 className="text-[13px] leading-[18px] text-dark-white font-semibold mb-5">
                      TODAY'S FORECAST
                    </h1>
                    <HourlyForecast hourly={data.hourly} />
                  </div>
                </div>
              </div>
              <div className="flex min-w-[46rem]">
                <div className="w-full">
                  <div className="flex flex-col p-7 bg-light-gray rounded-3xl">
                    <h1 className="text-[13px] leading-[18px] text-dark-white font-semibold mb-5">
                      AIR CONDITIONS
                    </h1>
                    <div className="w-full grid grid-rows-2 grid-cols-2 gap-4">
                      <div className="flex">
                        <FaThermometerHalf className="text-dark-white text-2xl mr-3" />
                        <div className="flex flex-col">
                          <span className="text-dark-white text-lg font-light mb-2">
                            Real Feel
                          </span>
                          <span className="text-light-white text-3xl font-semibold">
                            {data.current.apparent_temperature}°
                          </span>
                        </div>
                      </div>
                      <div className="flex ml-4">
                        <FaWind className="text-dark-white text-2xl mr-3" />
                        <div className="flex flex-col">
                          <span className="text-dark-white text-lg font-light mb-2">
                            Wind
                          </span>
                          <span className="text-light-white text-3xl font-semibold">
                            {data.current.wind_speed} km/h
                          </span>
                        </div>
                      </div>
                      <div className="flex">
                        <IoWater className="text-dark-white text-2xl mr-3" />
                        <div className="flex flex-col">
                          <span className="text-dark-white text-lg font-light mb-2">
                            Chance of rain
                          </span>
                          <span className="text-light-white text-3xl font-semibold">
                            {data.current.rain}%
                          </span>
                        </div>
                      </div>
                      <div className="flex ml-4">
                        <TbUvIndex className="text-dark-white text-2xl mr-3" />
                        <div className="flex flex-col">
                          <span className="text-dark-white text-lg font-light mb-2">
                            UV index
                          </span>
                          <span className="text-light-white text-3xl font-semibold">
                            {data.daily.uv_index[0]}%
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="flex w-full mt-[68px]">
              <div className="flex flex-col w-full p-9 bg-light-gray rounded-3xl">
                <h1 className="text-[13px] leading-[18px] text-dark-white font-semibold mb-5">
                  7-DAY FORECAST
                </h1>
                <DailyForecast daily={data.daily} />
              </div>
            </div>
          </div>
        </main>
      )}
    </>
  );
}
