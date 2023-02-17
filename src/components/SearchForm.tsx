import React, { useState, useRef } from 'react';

import { setSubmitting } from '../redux/features/weatherData';

import { useAppDispatch, useAppSelector } from '../redux/hooks';

import { renderBGColors } from '../utils';

import AutoComplete from 'react-google-autocomplete';

import FA from 'react-fontawesome';
import {
	fetchWeatherData,
	setCurrentGeoLocation,
} from '../redux/features/weatherData';

import { createCurrentFavoriteLocation } from '../useLocalStorage';

export const SearchForm = () => {
	const inputRef = useRef<HTMLInputElement>(null);

	const [placeHolderText, setPlaceHolderText] = useState('Enter a City');
	const [coordinates, setCoordinates] = useState({ lat: '', lon: '' });

	const [location, setLocation] = useState({ city: '', state: '' });

	const { weatherData } = useAppSelector((state) => state.weatherData);

	const dispatch = useAppDispatch();

	const handleInputFocus = (e: React.FocusEvent<HTMLInputElement>) => {
		setPlaceHolderText('');
	};

	const handleInputBlur = (e: React.FocusEvent<HTMLInputElement>) => {
		setPlaceHolderText('Enter a City');
	};

	const handleOnPlaceSelected = (place) => {
		const { geometry, formatted_address } = place;

		const [city, state] = formatted_address.split(',');

		setLocation({ city, state });

		setCoordinates({
			lat: geometry.location.lat(),
			lon: geometry.location.lng(),
		});
	};

	const handleSubmitGeocodeCoordinates = (e: React.FormEvent) => {
		e && e.preventDefault();
		dispatch(setSubmitting(true));
		dispatch(fetchWeatherData(coordinates));
		dispatch(setCurrentGeoLocation(location));
		createCurrentFavoriteLocation({
			...location,
			...coordinates,
			...weatherData?.current,
		});
		if (inputRef.current) {
			inputRef.current.value = '';
		}
	};

	return (
		<form>
			<div className='relative'>
				<label htmlFor='city'></label>
				<AutoComplete
					ref={inputRef}
					onFocus={handleInputFocus}
					onBlur={handleInputBlur}
					placeholder={placeHolderText}
					className={`px-4 py-1 rounded-2xl ${renderBGColors(
						weatherData?.current.weather[0].main,
						'input',
					)} transition-all ease-in-out duration-1000 text-lg outline-transparent text-center placeholder-white`}
					apiKey={process.env.GOOGLE_API_KEY}
					onPlaceSelected={handleOnPlaceSelected}
				/>
				<button
					onClick={handleSubmitGeocodeCoordinates}
					className='absolute right-2.5 top-1.5'
				>
					<FA name='search' className='text-white' />
				</button>
			</div>
		</form>
	);
};
