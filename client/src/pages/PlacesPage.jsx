import React, { useState } from "react";
import { Link, useParams } from "react-router-dom";
import Perks from "../Perks";
import axios from "axios";

const PlacesPage = () => {
  const { action } = useParams();
  const [title, setTitle] = useState("");
  const [address, setAddress] = useState("");
  const [addedPhotos, setAddedPhotos] = useState([]);
  const [photoLink, setPhotoLink] = useState("");
  const [description, setDescription] = useState("");
  const [perks, setPerks] = useState([]);
  const [extraInfo, setExtraInfo] = useState("");
  const [checkIn, setCheckIn] = useState("");
  const [checkOut, setCheckOut] = useState("");
  const [maxGuests, setMaxGuests] = useState(1);

  const inputHeader = (text) => {
    return <h2 className="text-2xl mt-4">{text}</h2>;
  };

  const inputDescription = (text) => {
    return <p className="text-gray-500 text-sm">{text}</p>;
  };

  const preInput = (header, description) => {
    return (
      <>
        {inputHeader(header)}
        {inputDescription(description)}
      </>
    );
  };

  const addPhotoByLink = (e) => {
    e.preventDefault();
    axios
      .post("/upload-by-link", { link: photoLink })
      .then((res) => {
        // alert("added photo by link")
        setAddedPhotos((prev) => {
          return [...prev, res.data];
        });
      })
      .catch((err) => alert("error uploading photo"));

    setPhotoLink("");
  };

  const uploadPhoto = (e) => {
    const files = e.target.files;
    const data = new FormData();
    for (let i = 0; i < files.length; i++) {
      data.append("photos", files[i]);
    }
    axios
      .post("/upload", data, {
        headers: { "Content-Type": "multipart/form-data" },
      })
      .then((res) => {
        const { data: filenames } = res;
        setAddedPhotos((prev) => {
          return [...prev, ...filenames];
        });
      });
  };

  return (
    <div>
      {action !== "new" && (
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
        </div>
      )}
      {action === "new" && (
        <div>
          <form>
            {preInput("Title", "Title for you Place.")}
            <input
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="w-full border my-1 py-2 px-3 rounded-2xl"
              type="text"
              placeholder="title, for example: My lovely home"
            ></input>
            {preInput("Address", "Address for this Place.")}
            <input
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              placeholder="address"
              className="w-full border my-1 py-2 px-3 rounded-2xl"
            ></input>

            {preInput("Photos", "Add Photos for this Place.")}
            <div className="flex gap-2">
              <input
                value={photoLink}
                onChange={(e) => setPhotoLink(e.target.value)}
                placeholder="Add using a link.... jpg"
                className="w-full border my-1 py-2 px-3 rounded-2xl"
              ></input>

              <button
                onClick={addPhotoByLink}
                className="bg-gray-200 rounded-2xl px-6"
              >
                Add&nbsp;photo
              </button>
            </div>
            <div className="grid grid-cols-3 gap-2 md:grid-cols-4 lg:grid-cols-6">
              {addedPhotos.length > 0 &&
                addedPhotos.map((link) => (
                  <div key={link} className="h-32 flex">
                    <img
                      className="rounded-lg w-full object-cover"
                      src={"http://localhost:4000/uploads/" + link}
                      alt="img"
                    />
                  </div>
                ))}
              <label className="flex h-32 justify-center cursor-pointer gap-1 border bg-transparent rounded-2xl p-2 items-center text-2xl">
                <input
                  multiple
                  type="file"
                  className="hidden"
                  onChange={uploadPhoto}
                ></input>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="size-8"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M3 16.5v2.25A2.25 2.25 0 0 0 5.25 21h13.5A2.25 2.25 0 0 0 21 18.75V16.5m-13.5-9L12 3m0 0 4.5 4.5M12 3v13.5"
                  />
                </svg>
                Upload
              </label>
            </div>

            {preInput("Description", "Description for this Place.")}
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="w-full border my-1 py-6 px-3 rounded-2xl"
            ></textarea>

            {preInput("Perks", "Select all the perks for this Place.")}
            <div>
              <Perks selected={perks} onChange={setPerks} />
            </div>

            {preInput("Extra Info", "House rules, etc.")}
            <textarea
              value={extraInfo}
              onChange={(e) => setExtraInfo(e.target.value)}
              className="w-full border my-1 py-6 px-3 rounded-2xl"
            ></textarea>

            {preInput(
              "Check In & Check out times",
              "Add check in and check out time."
            )}
            <div className="grid gap-2 sm:grid-cols-3">
              <div>
                <h3 className="mt-2 -mb-1">Check In time</h3>
                <input
                  className="w-full border my-1 py-2 px-3 rounded-2xl"
                  type="text"
                  placeholder="14"
                  value={checkIn}
                  onChange={(e) => setCheckIn(e.target.value)}
                ></input>
              </div>
              <div>
                <h3 className="mt-2 -mb-1">Check Out time</h3>
                <input
                  className="w-full border my-1 py-2 px-3 rounded-2xl"
                  type="text"
                  placeholder="11"
                  value={checkOut}
                  onChange={(e) => setCheckOut(e.target.value)}
                ></input>
              </div>
              <div>
                <h3 className="mt-2 -mb-1">Max number of guests</h3>
                <input
                  className="w-full border my-1 py-2 px-3 rounded-2xl"
                  type="number"
                  value={maxGuests}
                  onChange={(e) => setMaxGuests(e.target.value)}
                ></input>
              </div>
            </div>
            <div>
              <button className="bg-red-500 text-white my-4 py-2 w-full text-center rounded-full">
                Save
              </button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
};

export default PlacesPage;
