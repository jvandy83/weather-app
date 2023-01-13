import Geocode from "react-geocode";

Geocode.setApiKey(process.env.GOOGLE_API_KEY);
// ROOFTOP returns most accurate results
Geocode.setLocationType("ROOFTOP");

export const reverseGeocode = (currentCoordinates) =>
  Geocode.fromLatLng(currentCoordinates?.lat, currentCoordinates?.lon)
    .then((response) => {
      let city, state;
      for (let i = 0; i < response.results[0].address_components.length; i++) {
        for (
          let j = 0;
          j < response.results[0].address_components[i].types.length;
          j++
        ) {
          switch (response.results[0].address_components[i].types[j]) {
            case "locality":
              city = response.results[0].address_components[i].long_name;
              break;
            case "administrative_area_level_1":
              state = response.results[0].address_components[i].short_name;
              break;
          }
        }
      }
      return { city, state };
    })
    .catch((err) => console.error(err));
