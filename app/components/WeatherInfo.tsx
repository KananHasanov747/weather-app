import { FaThermometerHalf, FaWind } from "react-icons/fa";
import { IoWater } from "react-icons/io5";
import { TbUvIndex } from "react-icons/tb";
import images from "~/assets/images";

function CityInfo({ data }: { data: object }) {
  return (
    <div className="w-full">
      <div className="flex px-11 py-9">
        <div className="flex-grow">
          <div className="mb-6">
            <h2 className="text-4xl text-light-white font-semibold mb-1.5">
              {data.city}
            </h2>
            <h3 className="text-xl text-light-white font-semibold">
              {data.country}
            </h3>
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
  );
}

function AirConditions({ data }: { data: object }) {
  return (
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
  );
}

export { CityInfo, AirConditions };
