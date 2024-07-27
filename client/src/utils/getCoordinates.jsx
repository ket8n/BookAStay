import countries from "../data/countries.json";
import states from "../data/states.json";

const getCoordinates = (address, isState) => {
  if (isState) {
    const state = address.split(",").pop().trim();
    const stateData = states.find(
      (c) => c.label.toLowerCase() === state.toLowerCase()
    );
    if (stateData) {
      return { lat: stateData.latlng[0], lng: stateData.latlng[1] };
    }
  }
  const country = address.split(",").pop().trim();
  const countryData = countries.find(
    (c) => c.label.toLowerCase() === country.toLowerCase()
  );
  if (countryData) {
    return { lat: countryData.latlng[0], lng: countryData.latlng[1] };
  }
  return null;
};

export default getCoordinates;
