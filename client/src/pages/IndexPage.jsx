import React, { useEffect, useState } from "react";
import axios from "axios";
import AccountNav from "../components/AccountNav";
import { Link } from "react-router-dom";
import Shimmer from "../components/Shimmer";
import Header from "../components/Header";

const IndexPage = () => {
  const [places, setPlaces] = useState([]);
  const [filteredPlaces, setFilteredPlaces] = useState([]);
  const [searchText, setSearchText] = useState("");

  useEffect(() => {
    axios.get("/places").then((response) => {
      setPlaces(response.data);
      setFilteredPlaces(response.data);
    });
  }, []);

  return (
    <>
      {/* <AccountNav /> */}
      <Header
        searchText={searchText}
        setSearchText={setSearchText}
        setFilteredPlaces={setFilteredPlaces}
        filteredPlaces={filteredPlaces}
        places={places}
      />
      {places.length === 0 && <Shimmer />}
      {filteredPlaces.length === 0 && (
        <h1>No result for place: {searchText}</h1>
      )}

      <div className="mt-8 grid gap-x-6 gap-y-8 grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
        {filteredPlaces.length > 0 &&
          filteredPlaces.map((place) => (
            <Link key={place._id} to={"/place/" + place._id}>
              <div className="bg-gray-500 mb-2 rounded-2xl flex">
                {place.photos?.[0] && (
                  <img
                    className="rounded-2xl object-cover aspect-square"
                    src={"http://localhost:4000/uploads/" + place.photos?.[0]}
                    alt=""
                  />
                )}
              </div>
              <h2 className="font-bold">{place.address}</h2>
              <h3 className="text-sm text-gray-500">{place.title}</h3>
              <div className="mt-1">
                <span className="font-bold">₹{place.price}</span> per night
              </div>
            </Link>
          ))}
      </div>
    </>
  );
};

export default IndexPage;
