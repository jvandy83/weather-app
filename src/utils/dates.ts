import { parse } from "path";

export const timeOfDay = () => {
  const now = new Date();

  const hour = now.getHours();

  if (hour >= 4 && hour <= 18) {
    return "day";
  }
  if (hour >= 17 || hour <= 3) {
    return "night";
  }
};

// Format time as hh:mm AM/PM
export const formatHHMM = () => {
  const date = new Date();
  // remove seconds
  return `${date
    .toLocaleTimeString()
    .replace(/(.*)\D\d+/, "$1")}`.toLowerCase();
};

export const timeZone = () => {
  return new Date()
    .toLocaleTimeString("en-us", { timeZoneName: "short" })
    .split(" ")[2];
};

export const getHour = (idx) => {
  const hourInMilli = 1000 * 60 * 60;
  const nextHourInMinutes = idx * hourInMilli;
  const nextHourInMilliSinceEpoch = nextHourInMinutes + Date.now();
  const date = new Date(nextHourInMilliSinceEpoch);
  const roundedToHourFloor = new Date(
    Math.floor(date.getTime() / hourInMilli) * hourInMilli
  );
  // remove seconds with regex
  const finalTime = roundedToHourFloor
    .toLocaleTimeString()
    .replace(/(.*)\D\d+/, "$1")
    .toLowerCase();
  const nextDay =
    parseInt(finalTime, 10) === 12 &&
    finalTime.includes("am") &&
    new Date(hourInMilli + nextHourInMilliSinceEpoch).toDateString().split(" ");

  return {
    nextHour: finalTime,
    nextDay,
  };
};

export const getDayOfWeek = (idx) => {
  const dayInMilli = 1000 * 60 * 60 * 24;
  const nextDayInMilli = idx * dayInMilli;
  const nextDayInMilliSinceEpoch = Date.now() + nextDayInMilli;
  const date = new Date(nextDayInMilliSinceEpoch);
  const [weekday, month, day, year] = date.toDateString().split(" ");
  return `${weekday} ${day}`;
};
