import React from "react";
import images from "../assets/images";

function Day({ i, day_of_week, temp_max, temp_min, wmo_code }) {
  return (
    <div className="w-full">
      {i !== 0 ? <div className="flex bg-gray-600 w-full h-[.5px]"></div> : ""}
      <div className="grid grid-cols-3 items-center w-full">
        <span className="text-base text-dark-white font-light">
          {i === 0 ? "Today" : day_of_week}
        </span>
        <div className="px-3">
          <img src={images[wmo_code].day} alt={images[wmo_code].description} />
        </div>
        <div className="text-right text-base text-dark-white">
          <span className="text-light-white font-semibold">{temp_max}°</span>/
          <span className="text-dark-white font-light">{temp_min}°</span>
        </div>
      </div>
    </div>
  );
}

export default function DailyForecast({ daily }) {
  return (
    <div className={`h-full grid grid-rows-7 gap-auto`}>
      {daily.date.map((_, index) => (
        <Day
          i={index}
          day_of_week={daily.day_of_week[index]}
          temp_max={daily.temperature_max[index]}
          temp_min={daily.temperature_min[index]}
          wmo_code={daily.weather_code[index]}
        />
      ))}
    </div>
  );
}
