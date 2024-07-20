import Booking from "../models/Booking.js";
import { getUserDataFromToken } from "../utils/authUtils.js";

export const createBooking = async (req, res) => {
  const userData = await getUserDataFromToken(req);
  const { name, phone, place, price, checkIn, checkOut, numberOfGuests } =
    req.body;

  Booking.create({
    user: userData.id,
    place,
    checkIn,
    checkOut,
    numberOfGuests,
    name,
    phone,
    price,
  }).then((response) => {
    res.json(response);
  });
};

export const getBookings = async (req, res) => {
  const userData = await getUserDataFromToken(req);
  res.json(await Booking.find({ user: userData.id }).populate("place"));
};
