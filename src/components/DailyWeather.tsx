import React from "react";

import { useAppSelector } from "../redux/hooks";

import { Card } from "./Card";
import { WeatherData } from "./typography/WeatherData";

import {
  formatHHMM,
  timeZone,
  capitalize,
  degToCompass,
  getDayOfWeek,
} from "../utils";

import { windIcon, strongWindIcon } from "../assets";

export const DailyWeather = () => {
  const { currentGeoLocation, weatherData } = useAppSelector(
    (state) => state.weatherData
  );
  return (
    <Card classNames="bg-white text-darkBlack my-12">
      <div className="flex flex-col p-6">
        <div className="flex items-center">
          <WeatherData size="text-3xl">Daily Weather</WeatherData>
          <h1 className="translate-y-0.5 font-notoSans py-2 text-xl">
            <span>-</span> {currentGeoLocation?.city},{" "}
            {currentGeoLocation?.state}
          </h1>
        </div>
        <div className="mt-4">
          <span className="text-xl">
            As of {formatHHMM()} {timeZone()}
          </span>
        </div>
      </div>
      <ul>
        {weatherData?.daily.map((dailyForecast, idx) => {
          return (
            <li
              className="py-4 px-6 border-b last:border-b-0"
              key={Math.random()}
            >
              <div className="flex items-center justify-between">
                <p className="flex-1 flex items-center">
                  <span className="pr-3">{getDayOfWeek(idx)}</span>
                  <WeatherData size="text-2xl">
                    <span>{Math.round(dailyForecast.temp.day!)}°/</span>
                  </WeatherData>
                  <WeatherData size="text-xl">
                    <span className="font-sans">
                      {Math.round(dailyForecast.temp.eve!)}°
                    </span>
                  </WeatherData>
                </p>
                <p className="flex items-center flex-1">
                  <img
                    className="w-8"
                    src={`http://openweathermap.org/img/wn/${dailyForecast.weather[0].icon}@2x.png`}
                    alt="cloud-icon"
                  />
                  <span className="pl-2">
                    {capitalize(dailyForecast.weather[0].description)}
                  </span>
                </p>
                <p className="flex-1 flex items-center">
                  <img
                    className="w-8 pr-2"
                    src={
                      dailyForecast.wind_speed! > 9 ? strongWindIcon : windIcon
                    }
                    alt="wind-icon"
                  />
                  <span className="pr-2">
                    {degToCompass(dailyForecast.wind_deg)}
                  </span>
                  <span>{Math.round(dailyForecast.wind_speed!)} mph</span>
                </p>
              </div>
            </li>
          );
        })}
      </ul>
    </Card>
  );
};
