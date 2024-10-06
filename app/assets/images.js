import clear_sky from "../assets/clear_sky.png";
import clear_sky_night from "../assets/clear_sky_night.png";
import few_clouds from "../assets/few_clouds.png";
import few_clouds_night from "../assets/few_clouds_night.png";
import scattered_clouds from "../assets/scattered_clouds.png";
import broken_clouds from "../assets/broken_clouds.png";
import shower_rain from "../assets/shower_rain.png";
import rain from "../assets/rain.png";
import thunderstorm from "../assets/thunderstorm.png";
import snow from "../assets/snow.png";
import mist from "../assets/mist.png";

const images = {
  0: {
    description: "Sunny",
    day: clear_sky,
    night: clear_sky_night,
  },
  1: {
    description: "Mainly Sunny",
    day: clear_sky,
    night: clear_sky_night,
  },
  2: {
    description: "Partly Cloudy",
    day: few_clouds,
    night: few_clouds_night,
  },
  3: {
    description: "Cloudy",
    day: scattered_clouds,
    night: scattered_clouds,
  },
  4: {
    description: "Broken Cloudy",
    day: broken_clouds,
    night: broken_clouds,
  },
  45: {
    description: "Foggy",
    day: mist,
    night: mist,
  },
  48: {
    description: "Rime Fog",
    day: mist,
    night: mist,
  },
  51: {
    description: "Light Drizzle",
    day: shower_rain,
    night: shower_rain,
  },
  53: {
    description: "Drizzle",
    day: shower_rain,
    night: shower_rain,
  },
  55: {
    description: "Heavy Drizzle",
    day: shower_rain,
    night: shower_rain,
  },
  56: {
    description: "Light Freezing Drizzle",
    day: shower_rain,
    night: shower_rain,
  },
  57: {
    description: "Freezing Drizzle",
    day: shower_rain,
    night: shower_rain,
  },
  61: {
    description: "Light Rain",
    day: rain,
    night: rain,
  },
  63: {
    description: "Rain",
    day: rain,
    night: rain,
  },
  65: {
    description: "Heavy Rain",
    day: rain,
    night: rain,
  },
  66: {
    description: "Light Freezing Rain",
    day: rain,
    night: rain,
  },
  67: {
    description: "Freezing Rain",
    day: rain,
    night: rain,
  },
  71: {
    description: "Light Snow",
    day: snow,
    night: snow,
  },
  73: {
    description: "Snow",
    day: snow,
    night: snow,
  },
  75: {
    description: "Heavy Snow",
    day: snow,
    night: snow,
  },
  77: {
    description: "Snow Grains",
    day: snow,
    night: snow,
  },
  80: {
    description: "Light Showers",
    day: shower_rain,
    night: shower_rain,
  },
  81: {
    description: "Showers",
    day: shower_rain,
    night: shower_rain,
  },
  82: {
    description: "Heavy Showers",
    day: shower_rain,
    night: shower_rain,
  },
  85: {
    description: "Light Snow Showers",
    day: snow,
    night: snow,
  },
  86: {
    description: "Snow Showers",
    day: snow,
    night: snow,
  },
  95: {
    description: "Thunderstorm",
    day: thunderstorm,
    night: thunderstorm,
  },
  96: {
    description: "Light Thunderstorms With Hail",
    day: thunderstorm,
    night: thunderstorm,
  },
  99: {
    description: "Thunderstorm With Hail",
    day: thunderstorm,
    night: thunderstorm,
  },
};

//const icons = {
//  "01d": clear_sky,
//  "01n": clear_sky_night,
//  "02d": few_clouds,
//  "02n": few_clouds_night,
//  "03d": scattered_clouds,
//  "03n": scattered_clouds,
//  "04d": broken_clouds,
//  "04n": broken_clouds,
//  "09d": shower_rain,
//  "09n": shower_rain,
//  "10d": rain,
//  "10n": rain,
//  "11d": thunderstorm,
//  "11n": thunderstorm,
//  "13d": snow,
//  "13n": snow,
//  "50d": mist,
//  "50n": mist,
//};

export default images;
