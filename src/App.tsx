import React, { useEffect, useState } from "react";

import {
  fetchWeatherData,
  setCurrentCoordinates,
  setCurrentGeoLocation,
  setWeatherDataIsPresent,
} from "./redux/features/weatherData";

import { useAppDispatch, useAppSelector } from "./redux/hooks";

import { Layout } from "./components/Layout";

import { Spinner } from "./components/Loading";

import { MainWeatherData } from "./components/MainWeatherData";

import { Nav } from "./components/Nav";

import { reverseGeocode } from "./utils/reverseGeocode";

import {
  getCurrentFavoriteLocation,
  getLocalStorageFavorites,
} from "./useLocalStorage";

export const App = () => {
  const [geolocationAllowed, setGeolocationAllowed] = useState(false);

  const { currentCoordinates, loading, favoriteLocationSelected } =
    useAppSelector((state) => state.weatherData);

  const dispatch = useAppDispatch();

  const successCallback = (position) => {
    const { latitude, longitude } = position.coords;
    dispatch(setCurrentCoordinates({ lat: latitude, lon: longitude }));
    setGeolocationAllowed(true);
  };

  const errorCallback = (error) => {
    console.error(error);
  };

  useEffect(() => {
    // display the last viewed
    // location stored in localStorage
    const favoriteLocations = getLocalStorageFavorites();
    const currentFavoriteLocation = getCurrentFavoriteLocation();

    if (currentFavoriteLocation) {
      const { lat, lon } = currentFavoriteLocation;
      dispatch(fetchWeatherData({ lat, lon, isExistingFavorite: true }));

      reverseGeocode({ lat, lon })
        .then((res) => {
          dispatch(setCurrentGeoLocation(res));
        })
        .catch((err) => console.log(err));
      return;
    }

    if (favoriteLocations && !favoriteLocationSelected) {
      console.log("calling api with last location");
      const lastLocation = favoriteLocations[favoriteLocations.length - 1];
      const { lat, lon } = lastLocation;

      dispatch(fetchWeatherData({ lat, lon, isExistingFavorite: true }));

      reverseGeocode({ lat, lon })
        .then((res) => {
          dispatch(setCurrentGeoLocation(res));
        })
        .catch((err) => console.log(err));
    } else if (navigator.geolocation) {
      // if user allows access to location
      // use built-in navigator api
      // to make initial request to weathermap api
      navigator.geolocation.getCurrentPosition(successCallback, errorCallback);
    } else {
      setWeatherDataIsPresent(false);
      console.log("No saved weather data, geolocation is disabled");
      return;
    }
  }, []);

  useEffect(() => {
    dispatch(fetchWeatherData(currentCoordinates));
    reverseGeocode(currentCoordinates).then((res) => {
      // res === { city, state }
      dispatch(setCurrentGeoLocation(res));
    });

    return () => {
      setGeolocationAllowed(false);
    };
  }, [geolocationAllowed]);

  return (
    <div>
      <Layout>
        <Nav />
        {!loading ? (
          <div className="p-12 pt-24">
            <MainWeatherData />
          </div>
        ) : (
          <Spinner />
        )}
      </Layout>
    </div>
  );
};
