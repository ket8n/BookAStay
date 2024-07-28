import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import BookingWidget from "../components/BookingWidget";
import PlaceGallery from "../components/PlaceGallery";
import AddressLink from "../components/AddressLink";
import ShowPerks from "../components/ShowPerks";
import Map from "../components/Map";
import getCoordinates from "../utils/getCoordinates";
import { MapOla } from "../components/MapOla";

const PlacePage = () => {
  const { id } = useParams();
  const [place, setPlace] = useState(null);
  const [showAllPhotos, setShowAllPhotos] = useState(false);

  useEffect(() => {
    if (!id) return;

    axios.get(`/places/${id}`).then((response) => {
      setPlace(response.data);
    });
  }, [id]);

  if (!place) return "";

  const coordinates = getCoordinates(place.address, true);

  return (
    <div className="mt-8 bg-gray-100 px-8 pt-8">
      <h1 className="text-3xl">{place.title}</h1>

      <AddressLink>{place.address}</AddressLink>

      <PlaceGallery place={place} setShowAllPhotos={setShowAllPhotos} />

      {!showAllPhotos && (
        <div className="mt-8 mb-8 grid gap-8 grid-cols-1 md:grid-cols-[2fr_1fr]">
          <div>
            <div className="my-4">
              <h2 className="font-semibold text-2xl">Description</h2>
              {place.description}
            </div>
            <h2 className="font-semibold text-2xl mb-1">Perks</h2>
            <ShowPerks perks={place.perks} />
            {coordinates && <Map lat={coordinates.lat} lng={coordinates.lng} />}
            <p className="mt-4 text-xl">
              Max number of guests:{" "}
              <span className="text-red-600">{place.maxGuests}</span>
            </p>
          </div>
          <div className="sticky top-8 self-start">
            <BookingWidget place={place} />
          </div>
        </div>
      )}

      {!showAllPhotos && (
        <div className="bg-white -mx-8 px-8 py-8 border-t">
          <div>
            <h2 className="font-semibold text-2xl">Extra Info</h2>
          </div>
          <div className="mb-4 mt-2 text-sm text-gray-700 leading-5">
            {place.extraInfo}
          </div>
        </div>
      )}
    </div>
  );
};

export default PlacePage;
