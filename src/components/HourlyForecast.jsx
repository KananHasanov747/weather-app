import React from "react";
import icons from "../assets/icons";

function Hour({ i, time, temp, icon }) {
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
          <img src={icons[icon]} alt="" />
        </span>
        <span className="text-2xl text-light-white">{temp}°</span>
      </div>
    </div>
  );
}

export default function HourlyForecast({ hourly }) {
  const list = [];
  for (let i = 0; i < hourly.temp.length; i++)
    list.push(
      <Hour
        i={i}
        time={hourly.time[i]}
        temp={hourly.temp[i]}
        icon={hourly.icon[i]}
      />,
    );
  return list;
}
