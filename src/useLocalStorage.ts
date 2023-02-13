import { WeatherData } from './types/WeatherData';

let num = 0;

export const saveFavoriteLocation = (location) => {
	const currentFavorites = JSON.parse(localStorage.getItem('favorites')!);

	if (!currentFavorites) {
		let newListOfFavorites: WeatherData[] = [];

		newListOfFavorites.push(location);

		localStorage.setItem('favorites', JSON.stringify(newListOfFavorites));
	} else if (currentFavorites.length < 5) {
		const existingLocation = currentFavorites.find((fav) => {
			return fav.city === location.city;
		});
		console.log(existingLocation);
		if (existingLocation) {
			return;
		} else {
			currentFavorites.push(location);
		}

		localStorage.setItem('favorites', JSON.stringify(currentFavorites));
	} else {
		currentFavorites.shift();

		currentFavorites.push(location);

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
	return JSON.parse(localStorage.getItem('favorites')!);
};

export const findLocalStorageFavorite = (location) => {
	const currentFavorites = JSON.parse(localStorage.getItem('favorites')!);
	const found = currentFavorites.find((fav) => fav.city === location.city);
	return found;
};

export const deleteFavorites = (id) => {
	const currentFavorites = JSON.parse(localStorage.getItem('favorites')!);
	const updatedFavorites = currentFavorites.filter(
		(favorites) => favorites.id === id,
	);
	localStorage.setItem('favorites', updatedFavorites);
};
