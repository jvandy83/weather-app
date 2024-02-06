import axios from "axios";

const fetchWeatherData = (coords) => {
  const { lat, lon } = coords;

  axios.get<Response>(
    `https://api.openweathermap.org/data/3.0/onecall?lat=${lat}&lon=${lon}&exclude={part}&appid=${process.env.WEATHER_API_KEY}&units=imperial`
  );
};

export const weatherDataApi = {
  fetchWeatherData,
};
