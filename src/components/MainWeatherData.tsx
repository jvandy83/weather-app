import React from "react";

import { useAppSelector, useAppDispatch } from "../redux/hooks";

import { TodaysWeather } from "./TodaysWeather";

import { HourlyWeather } from "./HourlyWeather";

import { WeatherSummary } from "./WeatherSummary";

import { DailyWeather } from "./DailyWeather";

export const MainWeatherData = () => {
  const {
    forecastType,
    weatherData,
    currentGeoLocation,
    weatherDataIsPresent,
  } = useAppSelector((state) => {
    console.log(state.weatherData);
    return state.weatherData;
  });

  const renderForecastType = () => {
    switch (forecastType) {
      case "Today":
        return <TodaysWeather />;
      case "Hourly":
        return <HourlyWeather />;
      case "Daily":
        return <DailyWeather />;
    }
  };

  if (
    !weatherDataIsPresent ||
    !currentGeoLocation?.city ||
    !weatherData?.current.temp
  ) {
    return (
      <div className="flex justify-center translate-y-48 text-3xl">
        Please enter a city to see your forecast
      </div>
    );
  }

  return (
    <>
      <WeatherSummary />
      {renderForecastType()}
    </>
  );
};
