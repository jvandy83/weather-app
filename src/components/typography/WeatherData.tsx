import React from "react";

interface IProps {
  children: React.ReactNode;
  size: string;
  classNames?: string;
}

export const WeatherData = ({ children, size, classNames }: IProps) => {
  return <span className={`font-kanit ${size} ${classNames}`}>{children}</span>;
};
