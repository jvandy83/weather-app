import React from 'react';

import { useAppSelector } from '../redux/hooks';

import { Card } from './Card';
import { WeatherData } from './typography/WeatherData';

import { formatHHMM, timeZone, capitalize, timeOfDay } from '../utils';

import {
	cloudsIcon,
	drizzleIcon,
	thunderstormIcon,
	rainIcon,
	fogIcon,
	hazeIcon,
	sunnyIcon,
	snowIcon,
	mistIcon,
	moonIcon,
} from '../assets';

export const WeatherSummary = () => {
	const { currentGeoLocation, weatherData } = useAppSelector(
		(state) => state.weatherData,
	);

	const weatherIcons = {
		thunderstorm: (
			<img className='w-32' src={thunderstormIcon} alt='thunderstorm-icon' />
		),
		drizzle: <img src={drizzleIcon} alt='drizzle-icon' />,
		rain: <img className='w-32' src={rainIcon} alt='rain-icon' />,
		snow: <img className='w-32' src={snowIcon} alt='snow-icon' />,
		mist: <img className='w-32' src={mistIcon} alt='mist-icon' />,
		haze: <img className='w-32' src={hazeIcon} alt='haze-icon' />,
		fog: <img className='w-32' src={fogIcon} alt='fog-icon' />,
		sun: <img className='w-32' src={sunnyIcon} alt='sunny-icon' />,
		moon: <img className='w-32' src={moonIcon} alt='moon-icon' />,
		clouds: <img className='w-32' src={cloudsIcon} alt='clouds-icon' />,
	};

	const renderIcon = () => {
		if (weatherData?.current.weather) {
			const condition = weatherData.current.weather[0].main.toLowerCase();
			if (condition.includes('clear')) {
				if (timeOfDay() === 'day') {
					return weatherIcons['sun'];
				} else {
					return weatherIcons['moon'];
				}
			} else {
				return weatherIcons[condition];
			}
			// if (condition.includes("thunderstorm"))
			//   return weatherIcons["thunderstorm"];
			// if (condition.includes("drizzle")) return weatherIcons["drizzle"];
			// if (condition.includes("rain")) return weatherIcons["rain"];
			// if (condition.includes("snow")) return weatherIcons["snow"];
			// if (condition.includes("mist")) return weatherIcons["mist"];
			// if (condition.includes("haze")) return weatherIcons["haze"];
			// if (condition.includes("fog")) return weatherIcons["fog"];
			// if (condition.includes("clouds")) return weatherIcons["clouds"];
		}
	};

	const renderBGImage = () => {
		const tod = timeOfDay();
		switch (tod) {
			case 'day':
				if (weatherData?.current.weather[0].main === 'Clear') {
					return 'bg-sunnyDay';
				} else {
					return 'bg-lightPurpleClouds';
				}
			case 'night':
				if (weatherData?.current.weather[0].main === 'Clear') {
					return 'bg-staryNight';
				} else {
					return 'bg-purpleClouds';
				}
		}
	};

	return (
		<Card
			classNames={`${renderBGImage()} bg-no-repeat bg-cover bg-center pb-6`}
		>
			<div className='bg-faded  px-4 py-3 flex items-center rounded-t-xl'>
				<WeatherData size='text-3xl'>
					<h1>
						{currentGeoLocation?.city}, {currentGeoLocation?.state}
					</h1>
				</WeatherData>
				<span className='text-2xl pl-2'>
					As of {formatHHMM()} {timeZone()}
				</span>
			</div>
			<main className='px-8 py-8 flex justify-between items-center'>
				<div className='flex flex-col'>
					<div className='flex flex-col'>
						<WeatherData size='text-8xl'>
							{Math.round(weatherData?.current.temp!)}°
						</WeatherData>
						<WeatherData size='text-3xl'>
							{capitalize(weatherData?.current.weather[0].description)}
						</WeatherData>
					</div>
					<div className='flex items-center'>
						<WeatherData size='text-3xl'>
							<span className='pr-2'>Day</span>
							<span className='pr-2'>
								{Math.round(weatherData?.daily[0].temp.day)}°
							</span>
						</WeatherData>
						<span className='text-4xl'>&#8226;</span>
						<WeatherData size='text-3xl'>
							<span className='px-2'>Night</span>
							<span>{Math.round(weatherData?.daily[0].temp.night)}°</span>
						</WeatherData>
					</div>
				</div>
				<div className='pr-12'>{renderIcon()}</div>
			</main>
		</Card>
	);
};
