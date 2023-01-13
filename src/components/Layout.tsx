import React from "react";

import { useAppSelector } from "../redux/hooks";

import { renderBGColors } from "../utils";

export const Layout = ({ children }) => {
  const { weatherData } = useAppSelector((state) => state.weatherData);
  return (
    <div
      className={`${renderBGColors(
        weatherData?.current.weather[0].main,
        "page"
      )} bg-fixed text-white font-karla min-h-screen`}
    >
      {children}
    </div>
  );
};
