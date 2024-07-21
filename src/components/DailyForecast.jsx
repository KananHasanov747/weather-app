import React from "react";
import icons from "../assets/icons";

function Day({ i, day_of_week, temp_max, temp_min, icon }) {
  return (
    <div className="w-full">
      {i !== 0 ? <div className="flex bg-gray-600 w-full h-[.5px]"></div> : ""}
      <div className="grid grid-cols-3 items-center w-full">
        <span className="text-base text-dark-white font-light">
          {i === 0 ? "Today" : day_of_week}
        </span>
        <div className="px-3">
          <img src={icons[icon]} alt="" />
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
  const list = [];
  Object.values(daily).map((data, i) => {
    list.push(
      <Day
        i={i}
        day_of_week={data.day_of_week}
        temp_max={data.temp_max}
        temp_min={data.temp_min}
        icon={data.icon}
      />,
    );
  });
  return (
    <div className={`h-ful grid grid-rows-${daily.length} gap-9`}>{list}</div>
  );
}
