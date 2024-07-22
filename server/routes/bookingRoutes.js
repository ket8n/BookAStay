import express from "express";
import {
  createBooking,
  getBookings,
  validateBooking,
  addBooking,
} from "../controllers/bookingController.js";

const router = express.Router();

router.post("/", createBooking);
router.get("/", getBookings);
router.post("/validate", validateBooking);
router.post("/create", addBooking);

export default router;
