import User from "../models/User.js";
import Place from "../models/Place.js";
import Booking from "../models/Booking.js";

export const users = async (req, res) => {
  try {
    const usersData = await User.find();
    res.json(usersData);
  } catch (error) {
    console.error("Error fetching users:", error);
    res.status(500).json({ error: "An error occurred while fetching users." });
  }
};

export const properties = async (req, res) => {
  try {
    const placesData = await Place.find().populate("owner");
    res.json(placesData);
  } catch (error) {
    console.error("Error fetching properties:", error);
    res
      .status(500)
      .json({ error: "An error occurred while fetching properties." });
  }
};

export const bookings = async (req, res) => {
  try {
    const bookingsData = await Booking.find()
      .populate("user")
      .populate("place");
    res.json(bookingsData);
  } catch (error) {
    console.error("Error fetching bookings:", error);
    res
      .status(500)
      .json({ error: "An error occurred while fetching bookings." });
  }
};
