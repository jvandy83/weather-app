import React from "react";

import { useAppSelector } from "../redux/hooks";

import { Card } from "./Card";
import { WeatherData } from "./typography/WeatherData";

import {
  formatHHMM,
  timeZone,
  getHour,
  capitalize,
  degToCompass,
} from "../utils";

import { windIcon, strongWindIcon } from "../assets";

export const HourlyWeather = () => {
  const { currentGeoLocation, weatherData } = useAppSelector(
    (state) => state.weatherData
  );
  return (
    <Card classNames="bg-white text-darkBlack my-12">
      <div className="flex flex-col p-6">
        <div className="flex items-center">
          <WeatherData size="text-3xl">Hourly Weather</WeatherData>
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
        {weatherData &&
          weatherData?.hourly.map((hourlyForecast, idx) => {
            const { nextHour, nextDay } = getHour(idx);
            let weekday, month, day;
            if (nextDay) {
              [weekday, month, day] = nextDay;
            }
            return (
              <li
                className="py-4 px-6 border-b last:border-b-0"
                key={Math.random()}
              >
                {nextDay && (
                  <p className="border-b pb-4 font-notoSans text-2xl">{`${weekday}, ${month} ${day}`}</p>
                )}
                <div
                  className={`${
                    nextDay && "pt-4"
                  } flex items-center justify-between`}
                >
                  <p className="flex-1">
                    <span className="pr-3">{nextHour}</span>
                    <WeatherData size="text-2xl">
                      <span>{Math.round(hourlyForecast.temp!)}°</span>
                    </WeatherData>
                  </p>
                  <p className="flex items-center flex-1">
                    <img
                      className="w-8"
                      src={`http://openweathermap.org/img/wn/${hourlyForecast.weather[0].icon}@2x.png`}
                      alt="cloud-icon"
                    />
                    <span className="pl-2">
                      {capitalize(hourlyForecast.weather[0].description)}
                    </span>
                  </p>
                  <p className="flex-1 flex items-center">
                    <img
                      className="w-8 pr-2"
                      src={
                        hourlyForecast.wind_speed! > 10
                          ? strongWindIcon
                          : windIcon
                      }
                      alt="wind-icon"
                    />
                    <span className="pr-2">
                      {degToCompass(hourlyForecast.wind_deg)}
                    </span>
                    <span>{Math.round(hourlyForecast.wind_speed!)} mph</span>
                  </p>
                </div>
              </li>
            );
          })}
      </ul>
    </Card>
  );
};
