import React from "react";

import { Card } from "./Card";
import { WeatherData } from "./typography/WeatherData";
import { Row } from "./tableData/Row";

import { useAppSelector } from "../redux/hooks";

import {
  renderDirectionalArrows,
  convertPressure,
  degToCompass,
} from "../utils";

import {
  windIcon,
  humidityIcon,
  dewpointIcon,
  strongWindIcon,
  sunIcon,
  eyeIcon,
  gaugeIcon,
} from "../assets";

export const TodaysWeather = () => {
  const { weatherData, currentGeoLocation } = useAppSelector(
    (state) => state.weatherData
  );
  return (
    <Card classNames="mt-16 bg-white flex flex-col p-4">
      <div className="text-darkBlack text-2xl p-2 font-notoSans">
        Weather Today in {currentGeoLocation?.city}, {currentGeoLocation?.state}
      </div>
      <div>
        {" "}
        <div className="flex flex-col pt-4 text-black px-4">
          <WeatherData size="text-5xl">
            {Math.round(weatherData?.current.feels_like!)}°
          </WeatherData>
          <WeatherData classNames="pr-4" size="text-2xl">
            Feels Like
          </WeatherData>
        </div>
      </div>
      <div className="text-darkBlack py-4 grid grid-cols-2 grid-rows-3">
        <Row
          width="w-6"
          icon={humidityIcon}
          type="Humidity"
          data={`${weatherData?.current.humidity}%`}
          description="humidity-icon"
        />
        <Row
          width="w-4"
          icon={gaugeIcon}
          type="Pressure"
          data={convertPressure(weatherData?.current.pressure)}
          description="pressure-icon"
        />
        <Row
          width="w-6"
          icon={eyeIcon}
          type="Visibility"
          data={weatherData?.current.visibility}
          description="visibility-icon"
        />
        <Row
          width="w-8"
          type="Wind"
          arrow={renderDirectionalArrows(
            degToCompass(Math.round(weatherData?.current.wind_speed!))
          )}
          data={`${Math.round(weatherData?.current.wind_speed!)} mph`}
          icon={
            weatherData?.current.wind_speed &&
            weatherData.current.wind_speed > 9
              ? strongWindIcon
              : windIcon
          }
          description="windy-icon"
        />
        <Row
          width="w-6"
          icon={dewpointIcon}
          type="Dew Point"
          data={`${Math.round(weatherData?.current.dew_point!)}°`}
          description="dew-point"
        />
        <Row
          width="w-8"
          type="UV Index"
          icon={sunIcon}
          description="sun-icon"
          data={weatherData?.current.uvi}
        />
      </div>
    </Card>
  );
};
