import User from "../models/User.js";
import Place from "../models/Place.js";
import Booking from "../models/Booking.js";

export const users = async (req, res) => {
  const usersData = await User.find();
  res.json(usersData);
};

export const properties = async (req, res) => {
  const placesData = await Place.find();
  res.json(placesData);
};

export const bookings = async (req, res) => {
  const bookingsData = await Booking.find();
  res.json(bookingsData);
};
