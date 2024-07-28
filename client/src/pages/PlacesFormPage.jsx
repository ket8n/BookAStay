import React, { useEffect, useState } from "react";
import Perks from "../components/Perks";
import PhotosUploader from "../components/PhotosUploader";
import axios from "axios";
import AccountNav from "../components/AccountNav";
import { Navigate, useParams } from "react-router-dom";
import { useSnackbar } from "notistack";

const PlacesFormPage = () => {
  const { id } = useParams();
  const [title, setTitle] = useState("");
  const [address, setAddress] = useState("");
  const [addedPhotos, setAddedPhotos] = useState([]);
  const [description, setDescription] = useState("");
  const [perks, setPerks] = useState([]);
  const [extraInfo, setExtraInfo] = useState("");
  const [checkIn, setCheckIn] = useState("");
  const [checkOut, setCheckOut] = useState("");
  const [maxGuests, setMaxGuests] = useState(1);
  const [redirect, setRedirect] = useState(false);
  const [price, setPrice] = useState(1000);
  const { enqueueSnackbar } = useSnackbar();

  useEffect(() => {
    if (!id) return;

    axios.get("/places/" + id).then((res) => {
      const { data } = res;
      setTitle(data.title);
      setAddress(data.address);
      setAddedPhotos(data.photos);
      setDescription(data.description);
      setPerks(data.perks);
      setExtraInfo(data.extraInfo);
      setCheckIn(data.checkIn);
      setCheckOut(data.checkOut);
      setMaxGuests(data.maxGuests);
      setPrice(data.price);
    });
  }, [id]);

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

  const handleSubmitClick = (e) => {
    e.preventDefault();

    const placeData = {
      title,
      address,
      description,
      addedPhotos,
      perks,
      extraInfo,
      checkIn,
      checkOut,
      maxGuests,
      price,
    };

    if (id) {
      // update place
      axios
        .put("/places", { id, ...placeData })
        .then(() => {
          enqueueSnackbar("Placed Updated Successfully.", {
            variant: "success",
          });
          setRedirect(true);
        })
        .catch((err) => {
          enqueueSnackbar("Error Updating Place.", {
            variant: "error",
          });
        });
    } else {
      // add new place
      axios
        .post("/places", placeData)
        .then(() => {
          enqueueSnackbar("New Placed Added Successfully.", {
            variant: "success",
          });
          setRedirect(true);
        })
        .catch((err) => {
          enqueueSnackbar("Error Adding New Place.", {
            variant: "error",
          });
        });
    }
  };

  if (redirect) {
    return <Navigate to={"/account/places"} />;
  }

  return (
    <div>
      <AccountNav />
      <form onSubmit={handleSubmitClick}>
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
        <PhotosUploader
          addedPhotos={addedPhotos}
          setAddedPhotos={setAddedPhotos}
        />

        {preInput("Description", "Description for this Place.")}
        <textarea
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          className="w-full h-48 border my-1 py-6 px-3 rounded-2xl"
        ></textarea>

        {preInput("Perks", "Select all the perks for this Place.")}
        <div>
          <Perks selected={perks} onChange={setPerks} />
        </div>

        {preInput("Extra Info", "House rules, etc.")}
        <textarea
          value={extraInfo}
          onChange={(e) => setExtraInfo(e.target.value)}
          className="w-full h-48 border my-1 py-6 px-3 rounded-2xl"
        ></textarea>

        {preInput(
          "Check In & Check out times",
          "Add check in and check out time."
        )}
        <div className="grid gap-2 grid-cols-2 md:grid-cols-4">
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
          <div>
            <h3 className="mt-2 -mb-1">Price per night</h3>
            <input
              className="w-full border my-1 py-2 px-3 rounded-2xl"
              type="number"
              value={price}
              onChange={(e) => setPrice(e.target.value)}
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
  );
};

export default PlacesFormPage;
