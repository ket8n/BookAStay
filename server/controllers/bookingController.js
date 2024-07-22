import Booking from "../models/Booking.js";
import { getUserDataFromToken } from "../utils/authUtils.js";
import crypto from "crypto";
import Razorpay from "razorpay";

// creates orderId for booking
export const createBooking = async (req, res) => {
  const { amount, currency } = req.body;

  const razorpay = new Razorpay({
    key_id: process.env.RAZORPAY_KEY_ID,
    key_secret: process.env.RAZORPAY_KEY_SECRET,
  });

  const options = {
    amount: parseInt(amount) * 100,
    currency,
  };

  razorpay.orders
    .create(options)
    .then((response) => {
      if (!response) {
        return res.status(500).send("Error");
      }
      res.json(response);
    })
    .catch((err) => {
      console.log(err);
      res.status(500).send("Error");
    });
};

export const getBookings = async (req, res) => {
  const userData = await getUserDataFromToken(req);
  res.json(await Booking.find({ user: userData.id }).populate("place"));
};

export const validateBooking = async (req, res) => {
  const { razorpay_order_id, razorpay_payment_id, razorpay_signature } =
    req.body;

  const sha = crypto.createHmac("sha256", process.env.RAZORPAY_KEY_SECRET);
  sha.update(`${razorpay_order_id}|${razorpay_payment_id}`);
  const digest = sha.digest("hex");
  if (digest !== razorpay_signature) {
    return res.status(400).json({ msg: "Failure" });
  }

  res.json({
    msg: "Success",
    orderId: razorpay_order_id,
    paymentId: razorpay_payment_id,
  });
};

// if the order is valid razorpay order, then only add booking
export const addBooking = async (req, res) => {
  const userData = await getUserDataFromToken(req);
  const {
    name,
    phone,
    place,
    amount: price,
    checkIn,
    checkOut,
    numberOfGuests,
    paymentId,
    orderId,
    paymentStatus,
    paymentTimestamp,
  } = req.body;

  Booking.create({
    user: userData.id,
    place,
    checkIn,
    checkOut,
    numberOfGuests,
    name,
    phone,
    price,
    paymentId,
    orderId,
    paymentStatus,
    paymentTimestamp,
  }).then((response) => {
    res.json(response);
  });
};
