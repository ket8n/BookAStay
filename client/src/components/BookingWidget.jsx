import React, { useContext, useEffect, useState } from "react";
import { differenceInCalendarDays } from "date-fns";
import axios from "axios";
import { Navigate } from "react-router-dom";
import { UserContext } from "../contexts/UserContext";
import razorpay_logo from "../assets/razorpay_logo.jpg";

const BookingWidget = ({ place }) => {
  const [checkIn, setCheckIn] = useState("");
  const [checkOut, setCheckOut] = useState("");
  const [numberOfGuests, setNumberOfGuests] = useState(1);

  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [redirect, setRedirect] = useState("");

  const { user } = useContext(UserContext);

  useEffect(() => {
    if (user) {
      setName(user.name);
    }
  }, [user.name]);

  let numberOfNights = 0;
  if (checkIn && checkOut) {
    numberOfNights = differenceInCalendarDays(
      new Date(checkOut),
      new Date(checkIn)
    );
  }

  const bookThisPlace = async (e) => {
    if (!user) {
      alert("Please login to book");
      setRedirect("/login");
      return;
    }

    if (!checkIn || !checkOut || !name || !phone) {
      alert("Enter all fields");
      return;
    }

    const data = {
      checkIn,
      checkOut,
      numberOfGuests,
      name,
      phone,
      amount: numberOfNights * place.price,
      currency: "INR",
      place: place._id,
    };

    try {
      const response = await axios.post("/bookings", data, {
        headers: {
          "Content-Type": "application/json",
        },
      });

      const { data: order } = response;

      const options = {
        key: import.meta.env.VITE_RAZORPAY_KEY_ID,
        amount: data.amount * 100,
        currency: data.currency,
        name: "BookAStay Corp",
        description: "Test Transaction",
        image: razorpay_logo,
        order_id: order.id,
        handler: async function (response) {
          const body = { ...response };
          try {
            const validateRes = await axios.post("/bookings/validate", body, {
              headers: {
                "Content-Type": "application/json",
              },
            });
            // console.log(validateRes);
            // return;
            if (validateRes.data.msg === "Success") {
              const details = {
                ...data,
                paymentId: validateRes.data.paymentId,
                orderId: validateRes.data.orderId,
                paymentStatus: "Success",
                paymentTimestamp: new Date(),
              };
              axios.post("/bookings/create", details).then((response) => {
                const bookingId = response.data._id;
                setRedirect(`/account/bookings/${bookingId}`);
              });
            } else {
              alert("Failed to pay");
              setRedirect("/");
            }
          } catch (err) {
            console.error(err);
          }
        },
        prefill: {
          name: user?.name || "Your Name",
          email: user?.email || "your-email@example.com",
          contact: phone || "0000000000",
        },
        notes: {
          address: "Razorpay Corporate Office",
        },
        theme: {
          color: "#3399cc",
        },
      };
      const rzp1 = new window.Razorpay(options);
      rzp1.on("payment.failed", function (response) {
        alert("Payment Failed: " + response.error.description);
        console.error(response);
        setRedirect("/");
      });
      rzp1.open();
    } catch (err) {
      alert("error occured, check console");
      console.error(err);
    }
  };

  if (redirect) {
    return <Navigate to={redirect} />;
  }

  return (
    <div>
      <div className="bg-white shadow p-4 rounded-2xl flex flex-col items-center">
        <div className="text-2xl text-center">
          Price: ₹{place.price} / per night
        </div>
        <div className="border rounded-2xl mt-4">
          <div className="flex">
            <div className="py-3 px-4">
              <label>Check In: </label>
              <input
                type="date"
                value={checkIn}
                onChange={(e) => setCheckIn(e.target.value)}
              ></input>
            </div>
            <div className="py-3 px-4 border-l">
              <label>Check Out: </label>
              <input
                type="date"
                value={checkOut}
                onChange={(e) => setCheckOut(e.target.value)}
              ></input>
            </div>
          </div>
          <div className="py-3 px-4 border-t">
            <label>Number of Guests: </label>
            <br />
            <input
              value={numberOfGuests}
              onChange={(e) => setNumberOfGuests(e.target.value)}
              className="border rounded-xl p-2 w-full"
              type="number"
            ></input>
          </div>
          {numberOfNights > 0 && (
            <div className="py-3 px-4 border-t">
              <label>Your full name: </label>
              <br />
              <input
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="border rounded-xl p-2 w-full"
                type="text"
              ></input>
              <label>Phone number: </label>
              <br />
              <input
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                className="border rounded-xl p-2 w-full"
                type="tel"
              ></input>
            </div>
          )}
        </div>
        <button
          onClick={bookThisPlace}
          className="bg-red-400 w-full p-2 mt-4 text-white rounded-xl"
        >
          Book This Place
          {numberOfNights > 0 && <span> ₹{numberOfNights * place.price}</span>}
        </button>
      </div>
    </div>
  );
};

export default BookingWidget;
