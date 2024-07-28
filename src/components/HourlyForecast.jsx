import React from "react";
import images from "../assets/images";

function Hour({ i, time, temp, wmo_code, is_day }) {
  return (
    <div className="flex">
      {i !== 0 ? (
        <div className="flex bg-slate-600 h-full w-[0.5px]"></div>
      ) : (
        ""
      )}
      <div className="flex flex-col items-center">
        <span className="text-sm text-dark-white font-semibold">{time}</span>
        <span className="px-6">
          <img
            src={is_day ? images[wmo_code].day : images[wmo_code].night}
            alt={images[wmo_code].description}
          />
        </span>
        <span className="text-2xl text-light-white">{temp}°</span>
      </div>
    </div>
  );
}

export default function HourlyForecast({ hourly }) {
  return (
    <div className="w-full grid grid-cols-6">
      {hourly.date.map((date, index) => (
        <Hour
          i={index}
          time={new Date(date).toLocaleString("en-US", {
            hour: "numeric",
            minute: "numeric",
            hour12: true,
          })}
          temp={hourly.temperature[index]}
          wmo_code={hourly.weather_code[index]}
          is_day={hourly.is_day[index]}
        />
      ))}
    </div>
  );
}
