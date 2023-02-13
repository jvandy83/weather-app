import { WeatherData } from './types/WeatherData';
import { v4 as uuidv4 } from 'uuid';

let num = 0;

export const saveFavoriteLocation = (location) => {
	const currentFavorites = JSON.parse(localStorage.getItem('favorites')!);
	const id = uuidv4();

	if (!currentFavorites) {
		let newListOfFavorites: WeatherData[] = [];

		newListOfFavorites.push({ ...location, id });

		localStorage.setItem('favorites', JSON.stringify(newListOfFavorites));
	} else if (currentFavorites.length < 5) {
		const existingLocation = currentFavorites.find((fav) => {
			return fav.city === location.city;
		});
		if (existingLocation) {
			return;
		} else {
			currentFavorites.push({ ...location, id });
		}

		localStorage.setItem('favorites', JSON.stringify(currentFavorites));
	} else {
		currentFavorites.shift();

		currentFavorites.push({ ...location, id });

		localStorage.setItem('favorites', JSON.stringify(currentFavorites));
	}
};

export const createCurrentFavoriteLocation = (location) => {
	localStorage.setItem('currentFavoriteLocation', JSON.stringify(location));
};

export const getCurrentFavoriteLocation = () => {
	return JSON.parse(localStorage.getItem('currentFavoriteLocation')!);
};

export const getLocalStorageFavorites = () => {
	return JSON.parse(localStorage.getItem('favorites')!) || [];
};

export const findLocalStorageFavorite = (location) => {
	const currentFavorites = JSON.parse(localStorage.getItem('favorites')!);
	const found = currentFavorites.find((fav) => fav.city === location.city);
	return found;
};

export const deleteFavoriteLocation = (id) => {
	console.log(id);
	const currentFavorites = JSON.parse(localStorage.getItem('favorites')!);
	if (currentFavorites.length === 1) {
		localStorage.clear();
		return;
	}
	const updatedFavorites = currentFavorites.filter(
		(favorites) => favorites.id !== id,
	);
	console.log(updatedFavorites);
	localStorage.setItem('favorites', updatedFavorites);
};
