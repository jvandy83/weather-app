import React, { useState } from 'react';
import { SearchForm } from './SearchForm';

import { useAppSelector, useAppDispatch } from '../redux/hooks';

import {
	setForecastType,
	fetchWeatherData,
	setFavoriteLocationSelected,
	setCurrentGeoLocation,
} from '../redux/features/weatherData';

import { renderBGColors, reverseGeocode } from '../utils';

import {
	getLocalStorageFavorites,
	createCurrentFavoriteLocation,
	deleteFavoriteLocation,
} from '../useLocalStorage';

export const Nav = () => {
	const [showDropdown, setShowDropdown] = useState(false);
	const { weatherData, forecastType } = useAppSelector(
		(state) => state.weatherData,
	);

	const dispatch = useAppDispatch();

	const handleShowDropdown = (e: React.MouseEvent) => {
		setShowDropdown((prev) => !prev);
	};

	const handleRemoveFavoriteLocation = (id: string) => {
		deleteFavoriteLocation(id);
	};

	const handleClickActiveNavButton = (
		e: React.MouseEvent<HTMLButtonElement>,
	) => {
		const forecastType = e.target['innerHTML'];
		dispatch(setForecastType(forecastType));
	};

	const handleFetchFavoriteLocation = async (coords) => {
		dispatch(setFavoriteLocationSelected(true));
		dispatch(fetchWeatherData({ ...coords, isExistingFavorite: true }));
		const { city, state } = await reverseGeocode(coords);
		dispatch(setCurrentGeoLocation({ city, state }));
		createCurrentFavoriteLocation({
			...weatherData?.current,
			city,
			state,
			...coords,
		});
	};

	const renderFavoriteLocations = () => {
		const currentFavoriteLocations = getLocalStorageFavorites();
		if (currentFavoriteLocations) {
			return currentFavoriteLocations?.map((location) => (
				<div className='relative flex w-full border-r last:border-r-0'>
					<button
						onClick={() =>
							handleFetchFavoriteLocation({
								lat: location.lat,
								lon: location.lon,
							})
						}
						key={Math.random()}
						className='px-4 py-1 flex flex-1 justify-center'
					>
						<span className='pr-2 flex'>
							<img
								className='w-6'
								src={`http://openweathermap.org/img/wn/${location.weather[0].icon}@2x.png`}
								alt=''
							/>
							{Math.round(location.temp)}°
						</span>
						<span>
							{location.city}, {location.state}
						</span>
					</button>
					<button onClick={handleShowDropdown} className='pr-2 group'>
						<span className='text-xl'>&#8942;</span>
						<div
							onClick={() => handleRemoveFavoriteLocation(location.id)}
							className='absolute hidden group-focus:block top-10 right-0 bg-white border rounded px-6 py-2 text-red-500 text-xs '
						>
							delete
						</div>
					</button>
				</div>
			));
		}
	};

	return (
		<>
			<nav className={`flex justify-center items-center h-24 w-full relative`}>
				<div className='absolute left-12 hidden lg:block'>
					<h1 className='text-3xl font-notoSerif'>Weather App</h1>
				</div>
				<SearchForm />
			</nav>
			<div
				className={`flex w-full ${renderBGColors(
					weatherData?.current.weather[0].main,
					'favNav',
				)}`}
			>
				{renderFavoriteLocations()}
			</div>
			<div
				className={`w-full justify-center flex py-1.5 ${renderBGColors(
					weatherData?.current.weather[0].main,
					'subnav',
				)}`}
			>
				<div className='w-full lg:w-2/3 xl:w-1/2 max-w-3xl flex justify-between px-8'>
					<button
						className={`${forecastType === 'Today' && 'border-b'}`}
						onClick={handleClickActiveNavButton}
					>
						Today
					</button>
					<button
						className={`${forecastType === 'Hourly' && 'border-b'}`}
						onClick={handleClickActiveNavButton}
					>
						Hourly
					</button>
					<button
						className={`${forecastType === 'Daily' && 'border-b'}`}
						onClick={handleClickActiveNavButton}
					>
						Daily
					</button>
				</div>
			</div>
		</>
	);
};
