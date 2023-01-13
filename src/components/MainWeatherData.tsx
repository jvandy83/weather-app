import React, { useEffect } from "react";

import { useAppSelector, useAppDispatch } from "../redux/hooks";

import { setSubmitting } from "../redux/features/weatherData";

import { TodaysWeather } from "./TodaysWeather";

import { HourlyWeather } from "./HourlyWeather";

import { WeatherSummary } from "./WeatherSummary";

import { DailyWeather } from "./DailyWeather";

import { saveFavoriteLocation } from "../useLocalStorage";

export const MainWeatherData = () => {
  const dispatch = useAppDispatch();
  const {
    forecastType,
    submitting,
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

  // if (submitting && currentGeoLocation?.city) {
  //   setLocalStorageFavorites({
  //     ...weatherData.current,
  //     city: currentGeoLocation?.city,
  //     state: currentGeoLocation?.state,
  //     lat: weatherData.lat,
  //     lon: weatherData.lon,
  //   });
  // }

  return (
    <>
      <WeatherSummary />
      {renderForecastType()}
    </>
  );
};
