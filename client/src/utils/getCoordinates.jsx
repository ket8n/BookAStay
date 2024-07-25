import countries from "../data/countries.json";

const getCoordinates = (address) => {
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
