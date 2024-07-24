import React, { useEffect, useState } from "react";
import AccountNav from "../components/AccountNav";
import axios from "axios";
import PlaceImg from "../components/PlaceImg";
import { Link, Navigate } from "react-router-dom";
import BookingDates from "../components/BookingDates";

const BookingsPage = () => {
  const [bookings, setBookings] = useState([]);
  const [redirect, setRedirect] = useState(false);

  useEffect(() => {
    axios.get("/bookings").then((response) => {
      setBookings(response.data);
    });
  }, []);

  // if (bookings?.length == 0) {
  //   return (
  //     <div>
  //       <AccountNav />
  //       <div className="text-center mt-20 ">
  //         <h1 className="text-3xl mb-4">Looks like you haven't booked yet.</h1>
  //         <button
  //           className="bg-red-500 text-white p-2 rounded-lg"
  //           onClick={() => setRedirect(true)}
  //         >
  //           Explore Amazing Places NOW!
  //         </button>
  //       </div>
  //     </div>
  //   );
  // }

  if (redirect) {
    return <Navigate to={"/"} />;
  }

  return (
    <div>
      <AccountNav />
      <div>
        <h1 className="text-2xl font-bold mb-4 text-center">
          Your previous Trips
        </h1>
        {bookings?.length == 0 && (
          <div className="text-center mt-4">
            <h1 className="text-2xl mb-4">
              Looks like you haven't booked yet.
            </h1>
            <button
              className="bg-red-500 text-white p-2 rounded-lg"
              onClick={() => setRedirect(true)}
            >
              Explore Amazing Places NOW!
            </button>
          </div>
        )}
        {bookings?.length > 0 &&
          bookings.map((booking) => (
            <Link
              to={`/account/bookings/${booking._id}`}
              key={booking._id}
              className="flex gap-4 mb-2 bg-gray-200 rounded-xl overflow-hidden"
            >
              <div className="w-48">
                <PlaceImg place={booking.place} />
              </div>
              <div className="py-3 pr-3 grow">
                <h2 className="text-xl">{booking.place.title}</h2>

                <div className="text-xl">
                  <BookingDates
                    booking={booking}
                    className={"mb-2 mt-2 text-gray-500"}
                  />

                  <div className="flex gap-1">
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
                        d="M2.25 8.25h19.5M2.25 9h19.5m-16.5 5.25h6m-6 2.25h3m-3.75 3h15a2.25 2.25 0 0 0 2.25-2.25V6.75A2.25 2.25 0 0 0 19.5 4.5h-15a2.25 2.25 0 0 0-2.25 2.25v10.5A2.25 2.25 0 0 0 4.5 19.5Z"
                      />
                    </svg>
                    <span className="text-2xl">
                      Total Price: ₹{booking.price}
                    </span>
                  </div>
                </div>
              </div>
            </Link>
          ))}
      </div>
    </div>
  );
};

export default BookingsPage;
