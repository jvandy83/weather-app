type Weather = {
  description: string;
  main: string;
  icon: string;
};

type Coords = {
  city: string;
  state: string;
}

type WeatherList = [Weather];

type HourlyForecast = {
  temp: number | null;
  weather: WeatherList;
  wind_deg: number | null;
  wind_speed: number | null;
};
type DailyForecast = {
  temp: { day: number; eve: number; night: number };
  weather: WeatherList;
  wind_deg: number | null;
  wind_speed: number | null;
};

type HourlyForecastList = HourlyForecast[];
type DailyForecastList = DailyForecast[];

export enum ForecastType {
  Today = "Today",
  Hourly = "Hourly",
  Daily = "Daily",
}

export interface WeatherDataResponse {
  weatherData: {
    daily: DailyForecastList;
    hourly: HourlyForecastList;
    lat: string;
    lon: string;
    timezone_offset: number | null;
    timezone: string;
    current: {
      temp: number | null;
      weather: WeatherList;
      feels_like: number | null;
      humidity: string;
      pressure: string;
      visibility: string;
      wind_speed: number | null;
      dew_point: number | null;
      uvi: number | null;
      sunrise: number | null;
      sunset: number | null;
    };
  };
}

export interface WeatherData {
  favoriteLocationSelected: boolean;
  weatherDataIsPresent: boolean;
  submitting: boolean;
  loading: boolean;
  forecastType: ForecastType;
  currentGeoLocation: { city: string; state: string };
  currentCoordinates: { lat: string; lon: string };
  weatherData: {
    daily: DailyForecastList;
    hourly: HourlyForecastList;
    lat: string;
    lon: string;
    timezone_offset: number | null;
    timezone: string;
    current: {
      temp: number | null;
      weather: WeatherList;
      feels_like: number | null;
      humidity: string;
      pressure: string;
      visibility: string;
      wind_speed: number | null;
      dew_point: number | null;
      uvi: number | null;
      sunrise: number | null;
      sunset: number | null;
    };
  };
}
