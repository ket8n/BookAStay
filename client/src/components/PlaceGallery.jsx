import React, { useState } from "react";

const PlaceGallery = ({ place, setShowAllPhotos, classNameParam = "" }) => {
  const [localShowAllPhotos, setLocalShowAllPhotos] = useState(false);

  if (localShowAllPhotos) {
    return (
      <div className="absolute inset-0 bg-black text-white min-h-screen">
        <div className="p-8 bg-black grid gap-4">
          <div>
            <h2 className="text-3xl mr-48">Photos of {place.title}</h2>
            <button
              onClick={() => {
                setLocalShowAllPhotos(false);
                setShowAllPhotos(false);
              }}
              className="fixed right-32 top-8 bg-white text-black flex gap-1 py-2 px-4 rounded-2xl shadow shadow-black"
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
                  d="M6 18 18 6M6 6l12 12"
                />
              </svg>
            </button>
          </div>
          {place?.photos?.length > 0 &&
            place.photos.map((photo) => (
              <div key={photo}>
                <img src={"http://localhost:4000/uploads/" + photo} alt="" />
              </div>
            ))}
        </div>
      </div>
    );
  }

  return (
    <div className={`relative  + ${classNameParam}`}>
      <div className="grid gap-2 grid-cols-[2fr_1fr] rounded-3xl overflow-hidden">
        <div>
          {place.photos?.[0] && (
            <div className="w-[60vw] h-[70vh]">
              <img
                onClick={() => {
                  setLocalShowAllPhotos(true);
                  setShowAllPhotos(true);
                }}
                className="aspect-square cursor-pointer object-cover w-full h-full"
                src={"http://localhost:4000/uploads/" + place.photos[0]}
                alt=""
              />
            </div>
          )}
        </div>
        <div className="grid  place-items-center">
          {place.photos?.[1] && (
            <img
              onClick={() => {
                setLocalShowAllPhotos(true);
                setShowAllPhotos(true);
              }}
              className="aspect-square cursor-pointer object-cover h-[35vh] w-[35vw]"
              src={"http://localhost:4000/uploads/" + place.photos[1]}
              alt=""
            />
          )}
          {place.photos?.[2] && (
            <div className="overflow-hidden">
              <img
                onClick={() => {
                  setLocalShowAllPhotos(true);
                  setShowAllPhotos(true);
                }}
                className="aspect-square cursor-pointer object-cover relative top-2 h-[35vh] w-[35vw]"
                src={"http://localhost:4000/uploads/" + place.photos[2]}
                alt=""
              />
            </div>
          )}
        </div>
      </div>
      <button
        onClick={() => {
          setLocalShowAllPhotos(true);
          setShowAllPhotos(true);
        }}
        className="absolute flex gap-1 bottom-2 right-2 py-2 px-4 bg-white rounded-xl shadow-md shadow-gray-500"
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
            d="M3.75 5.25h16.5m-16.5 4.5h16.5m-16.5 4.5h16.5m-16.5 4.5h16.5"
          />
        </svg>
        Show More
      </button>
    </div>
  );
};

export default PlaceGallery;
