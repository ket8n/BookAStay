import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import AccountNav from "../components/AccountNav";
import axios from "axios";
import PlaceImg from "../components/PlaceImg";
import Header from "../components/Header";

const PlacesPage = () => {
  const [places, setPlaces] = useState([]);

  useEffect(() => {
    axios.get("/places/user-places").then(({ data }) => {
      setPlaces(data);
    });
  }, []);
  return (
    <>
      <Header />
      <div>
        <AccountNav />
        <div className="text-center">
          <Link
            className="inline-flex gap-1 bg-red-500 text-white rounded-full px-6 py-2"
            to={"/account/places/new"}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="size-6"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M12 4.5v15m7.5-7.5h-15"
              />
            </svg>
            Add New Place
          </Link>
          <h1 className="text-2xl font-bold mt-2">My Listings</h1>
        </div>
        <div className="mt-4">
          {places.length > 0 ? (
            places.map((place) => (
              <Link
                to={"/account/places/" + place._id}
                key={place._id}
                className="flex gap-4 cursor-pointer bg-gray-200 rounded-2xl p-4 mb-2 relative"
              >
                <div className="w-32 h-32 flex bg-gray-300 grow shrink-0">
                  {place.photos.length > 0 && <PlaceImg place={place} />}
                </div>
                <div className="grow-0 shrink">
                  <h2 className="text-xl">{place.title}</h2>
                  <p className="text-sm mt-2">{place.description}</p>
                </div>
              </Link>
            ))
          ) : (
            <h1 className="text-2xl text-center -mt-2">
              Looks like you have not listed any place.
            </h1>
          )}
        </div>
      </div>
    </>
  );
};

export default PlacesPage;
