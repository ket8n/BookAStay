import React, { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import axios from "axios";
import BookingTable from "../components/BookingTable";

const BookingsPage = () => {
  const [bookings, setBookings] = useState([]);

  useEffect(() => {
    axios
      .post("/admin/bookings")
      .then((response) => setBookings(response.data))
      .catch((err) => console.log(err));
  }, []);

  return (
    <>
      <Navbar />
      <div>BookingsPage</div>
      <div>
        <BookingTable bookings={bookings} />
      </div>
    </>
  );
};

export default BookingsPage;
