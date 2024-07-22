import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import AddressLink from "../components/AddressLink";
import PlaceGallery from "../components/PlaceGallery";
import BookingDates from "../components/BookingDates";
import { format } from "date-fns";

const BookingPage = () => {
  const { id } = useParams();
  const [booking, setBooking] = useState(null);

  useEffect(() => {
    if (id) {
      axios.get("/bookings").then((response) => {
        const currentBooking = response.data.find(({ _id }) => _id === id);
        if (currentBooking) {
          setBooking(currentBooking);
        }
      });
    }
  }, [id]);

  if (!booking) {
    return "";
  }

  return (
    <div className="my-8">
      <h1 className="text-3xl">{booking.place.title}</h1>
      <AddressLink className="my-2 block">{booking.place.address}</AddressLink>
      <div className="bg-gray-200 p-4 my-6 rounded-2xl flex items-center justify-between">
        <div>
          <h2 className="text-2xl mb-4">Your Booking Information</h2>
          <BookingDates booking={booking} />
          <div className="items-center mt-2 flex gap-2">
            Status:{" "}
            <p className="items-center text-white bg-green-500 px-1 rounded-lg">
              {booking.paymentStatus}{" "}
            </p>{" "}
            |<p className="items-center">Payment Id: {booking.paymentId}</p>
          </div>
          <div className="flex items-center mt-1 gap-1">
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
                d="M12 6v6h4.5m4.5 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
              />
            </svg>

            <p>
              {format(
                new Date(booking.paymentTimestamp),
                "dd-MM-yyyy : HH:mm:ss"
              )}
            </p>
          </div>
        </div>
        <div className="bg-red-500 p-4 text-white rounded-xl">
          <div>Total Price</div>
          <div className="text-3xl">₹{booking.price}</div>
        </div>
      </div>
      <PlaceGallery place={booking.place} classNameParam=" mx-8" />
    </div>
  );
};

export default BookingPage;
