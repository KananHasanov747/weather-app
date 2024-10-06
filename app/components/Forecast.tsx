import images from "../assets/images";

function Day({
  i,
  day_of_week,
  temp_max,
  temp_min,
  wmo_code,
}: {
  i: number;
  day_of_week: string;
  temp_max: number;
  temp_min: number;
  wmo_code: keyof typeof images;
}) {
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

function Hour({
  i,
  time,
  temp,
  wmo_code,
  is_day,
}: {
  i: number;
  time: string;
  temp: number;
  wmo_code: keyof typeof images;
  is_day: boolean;
}) {
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

function DailyForecast({
  daily,
}: {
  daily: {
    date: string[];
    day_of_week: string[];
    weather_code: any[];
    temperature_max: number[];
    temperature_min: number[];
  };
}) {
  return (
    <div className="flex flex-col w-full p-9 bg-light-gray rounded-3xl">
      <h1 className="text-[13px] leading-[18px] text-dark-white font-semibold mb-5">
        7-DAY FORECAST
      </h1>
      <div className={`h-full grid grid-rows-7 gap-auto`}>
        {daily?.date.map((_: any, index: number) => (
          <Day
            key={index}
            i={index}
            day_of_week={daily.day_of_week[index]}
            temp_max={daily.temperature_max[index]}
            temp_min={daily.temperature_min[index]}
            wmo_code={daily.weather_code[index]}
          />
        ))}
      </div>
    </div>
  );
}

function HourlyForecast({
  hourly,
}: {
  hourly: {
    date: string[];
    is_day: boolean[];
    temperature: number[];
    weather_code: any[];
  };
}) {
  return (
    <div className="flex w-full">
      <div className="flex flex-col w-full p-7 bg-light-gray rounded-3xl">
        <h1 className="text-[13px] leading-[18px] text-dark-white font-semibold mb-5">
          TODAY'S FORECAST
        </h1>
        <div className="w-full grid grid-cols-6">
          {hourly.date.map((date: any, index: number) => (
            <Hour
              key={index}
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
      </div>
    </div>
  );
}

export { HourlyForecast, DailyForecast };
