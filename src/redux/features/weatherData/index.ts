import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

import {
	WeatherData,
	ForecastType,
	WeatherDataResponse,
} from '../../../types/WeatherData';

import { reverseGeocode } from '../../../utils';

import axios from 'axios';
import { saveFavoriteLocation } from '../../../useLocalStorage';

interface Response {
	data: WeatherDataResponse;
}

const initialWeatherDataState: WeatherData = {
	favoriteLocationSelected: false,
	weatherDataIsPresent: false,
	submitting: false,
	loading: false,
	weatherData: {
		daily: [],
		hourly: [
			{
				temp: null,
				weather: [{ description: '', main: '', icon: '' }],
				wind_deg: null,
				wind_speed: null,
			},
		],
		lat: '',
		lon: '',
		timezone: '',
		timezone_offset: null,
		current: {
			temp: null,
			feels_like: null,
			weather: [{ description: '', main: '', icon: '' }],
			humidity: '',
			pressure: '',
			visibility: '',
			wind_speed: null,
			dew_point: null,
			uvi: null,
			sunrise: null,
			sunset: null,
		},
	},
	forecastType: ForecastType.Today,
	currentGeoLocation: { city: '', state: '' },
	currentCoordinates: {
		lat: '',
		lon: '',
	},
};

type Metadata = {
	lat: string;
	lon: string;
	isExistingFavorite?: boolean;
};

export const fetchWeatherData = createAsyncThunk(
	'weatherData/fetchWeatherData',
	async (values: Metadata, { dispatch }) => {
		const { lat, lon, isExistingFavorite } = values;
		try {
			const res = await axios.get<any>(
				`https://api.openweathermap.org/data/3.0/onecall?lat=${lat}&lon=${lon}&&appid=38241639fbe56d2db69c48b225d3a7f7
&units=imperial`,
			);
			const location = await reverseGeocode({ lat, lon });
			if (!isExistingFavorite) {
				saveFavoriteLocation({
					...res.data.current,
					city: location.city,
					state: location.state,
					lat,
					lon,
				});
			}
			return res.data;
		} catch (error) {
			console.log(error.response.data);
		}
	},
);

export const weatherDataSlice = createSlice({
	name: 'weatherData',
	initialState: initialWeatherDataState,
	reducers: {
		setCurrentGeoLocation: (state, { payload }) => {
			return {
				...state,
				currentGeoLocation: payload,
			};
		},
		setCurrentCoordinates: (state, { payload }) => {
			return {
				...state,
				currentCoordinates: payload,
			};
		},
		setForecastType: (state, { payload }) => {
			return {
				...state,
				forecastType: payload,
			};
		},
		setSubmitting: (state, { payload }) => {
			return {
				...state,
				submitting: payload,
			};
		},
		setWeatherDataIsPresent: (state, { payload }) => {
			return {
				...state,
				weatherDataIsPresent: payload,
			};
		},
		setFavoriteLocationSelected: (state, { payload }) => {
			return {
				...state,
				favoriteLocationSelected: payload,
			};
		},
	},
	extraReducers: (builder) => {
		builder.addCase(fetchWeatherData.pending, (state) => {
			return {
				...state,
				loading: true,
			};
		});
		builder.addCase(fetchWeatherData.fulfilled, (state, { payload }) => {
			return {
				...state,
				weatherData: payload,
				loading: false,
				weatherDataIsPresent: true,
				favoriteLocationSelected: false,
			};
		});
		builder.addCase(fetchWeatherData.rejected, (state) => {
			return {
				...state,
				loading: false,
				weatherDataIsPresent: false,
			};
		});
	},
});

export const {
	setCurrentGeoLocation,
	setCurrentCoordinates,
	setForecastType,
	setSubmitting,
	setWeatherDataIsPresent,
	setFavoriteLocationSelected,
} = weatherDataSlice.actions;

export default weatherDataSlice.reducer;
