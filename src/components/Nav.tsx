import React, { useEffect } from "react";
import { SearchForm } from "./SearchForm";

import { useAppSelector, useAppDispatch } from "../redux/hooks";

import {
  setForecastType,
  fetchWeatherData,
  setFavoriteLocationSelected,
  setCurrentGeoLocation,
} from "../redux/features/weatherData";

import { renderBGColors, reverseGeocode } from "../utils";

import {
  getLocalStorageFavorites,
  createCurrentFavoriteLocation,
} from "../useLocalStorage";

export const Nav = () => {
  const { weatherData, forecastType } = useAppSelector(
    (state) => state.weatherData
  );

  const dispatch = useAppDispatch();

  const handleClickActiveNavButton = (
    e: React.MouseEvent<HTMLButtonElement>
  ) => {
    const forecastType = e.target["innerHTML"];
    dispatch(setForecastType(forecastType));
  };

  const handleFetchFavoriteLocation = async (coords) => {
    console.log(coords);
    dispatch(setFavoriteLocationSelected(true));
    dispatch(fetchWeatherData({ ...coords, isExistingFavorite: true }));
    const { city, state } = await reverseGeocode(coords);
    dispatch(setCurrentGeoLocation({ city, state }));
    createCurrentFavoriteLocation({
      ...weatherData.current,
      city,
      state,
      ...coords,
    });
  };

  const renderFavoriteLocations = () => {
    const currentFavoriteLocations = getLocalStorageFavorites();
    if (currentFavoriteLocations) {
      return currentFavoriteLocations?.map((location) => (
        <button
          onClick={() =>
            handleFetchFavoriteLocation({
              lat: location.lat,
              lon: location.lon,
            })
          }
          key={Math.random()}
          className="border-r px-4 py-1 flex flex-1 justify-center"
        >
          <span className="pr-2 flex">
            <img
              className="w-6"
              src={`http://openweathermap.org/img/wn/${location?.weather[0].icon}@2x.png`}
              alt=""
            />
            {Math.round(location.temp)}°
          </span>
          <span>
            {location.city}, {location.state}
          </span>
        </button>
      ));
    }
  };

  return (
    <>
      <nav className={`flex justify-center items-center h-24 w-full relative`}>
        <div className="absolute left-12 hidden lg:block">
          <h1 className="text-3xl font-notoSerif">Weather App</h1>
        </div>
        <SearchForm />
      </nav>
      <div
        className={`flex w-full ${renderBGColors(
          weatherData?.current.weather[0].main,
          "favNav"
        )}`}
      >
        {renderFavoriteLocations()}
      </div>
      <div
        className={`w-full justify-center flex py-1.5 ${renderBGColors(
          weatherData?.current.weather[0].main,
          "subnav"
        )}`}
      >
        <div className="w-full lg:w-2/3 xl:w-1/2 max-w-3xl flex justify-between px-8">
          <button
            className={`${forecastType === "Today" && "border-b"}`}
            onClick={handleClickActiveNavButton}
          >
            Today
          </button>
          <button
            className={`${forecastType === "Hourly" && "border-b"}`}
            onClick={handleClickActiveNavButton}
          >
            Hourly
          </button>
          <button
            className={`${forecastType === "Daily" && "border-b"}`}
            onClick={handleClickActiveNavButton}
          >
            Daily
          </button>
        </div>
      </div>
    </>
  );
};
