import { WEATHER_DATA_BASE_URL } from "./client";

import axios from "axios";

import { WeatherData } from "../types/WeatherData";

const fetchWeatherData = (coords) => {
  const { lat, lon } = coords;

  axios.get<Response>(
    `https://api.openweathermap.org/data/3.0/onecall?lat=${lat}&lon=${lon}&exclude={part}&appid=38241639fbe56d2db69c48b225d3a7f7
&units=imperial`
  );
};

export const weatherDataApi = {
  fetchWeatherData,
};
