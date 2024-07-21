import React, { useState, useEffect } from "react";
import axios from "axios";
import SideBar from "../components/SideBar";
import HourlyForecast from "../components/HourlyForecast";
import DailyForecast from "../components/DailyForecast";
import icons from "../assets/icons";
import { FaThermometerHalf, FaWind } from "react-icons/fa";
import { IoWater } from "react-icons/io5";

export default function Home() {
  const [data, setData] = useState(null);
  const [city, setCity] = useState("Tokyo");

  const fetchData = async (city) => {
    if (city) {
      try {
        const response = await axios.get(`/api/weather/?city=${city}`);
        setData(response.data);
      } catch (error) {
        console.error("Error fetching weather data:", error);
      }
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") fetchData(city);
  };

  useEffect(() => {
    fetchData(city); // Call fetchData with initial city on mount
  }, []);

  return (
    <>
      {data && (
        <main className="flex h-screen bg-dark-gray">
          <div className="flex flex-grow relative my-9 mx-[30px]">
            <SideBar />
            <div className="w-full mx-[22px]">
              <input
                type="text"
                name="search"
                onChange={(e) => setCity(e.target.value)}
                onKeyDown={handleKeyDown}
                placeholder="Search for cities"
                className="w-full max-w-[46rem] py-[14px] px-2 rounded-[.6rem] bg-light-gray text-[13px] leading-[18px] text-light-white text-light-text outline-none placeholder:text-light-white"
              />
              <div className="flex min-w-[46rem]">
                <div className="w-full">
                  <div className="flex px-11 py-9">
                    <div className="flex-grow">
                      <div className="mb-6">
                        <h2 className="text-4xl text-light-white font-semibold mb-1.5">
                          {data.city}
                        </h2>
                        <span className="text-sm text-dark-white font-normal tracking-wide">
                          Chance of rain: {data.hourly.chance_of_rain[0]}%
                        </span>
                      </div>
                      <div className="mb-2">
                        <span className="text-6xl text-light-white font-medium">
                          {Math.round(data.current.temp)}°
                        </span>
                      </div>
                    </div>
                    <img
                      className="h-[194px]"
                      src={icons[data.hourly.icon[0]]}
                      alt=""
                    />
                  </div>
                </div>
              </div>
              <div className="flex min-w-[46rem] mb-4">
                <div className="w-full">
                  <div className="p-7 bg-light-gray rounded-3xl">
                    <h1 className="text-[13px] leading-[18px] text-dark-white font-semibold mb-5">
                      TODAY'S FORECAST
                    </h1>
                    <div className="w-full grid grid-cols-6">
                      <HourlyForecast hourly={data.hourly} />
                    </div>
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
                            {data.hourly.feels_like[0]}°
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
                            {data.hourly.wind_speed[0]} km/h
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
                            {data.hourly.chance_of_rain[0]}%
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
                  5-DAY FORECAST
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
