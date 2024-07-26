import express from "express";
import {
  createBooking,
  getBookings,
  validateBooking,
  addBooking,
  sendConfirmation,
} from "../controllers/bookingController.js";

const router = express.Router();

router.post("/", createBooking);
router.get("/", getBookings);
router.post("/validate", validateBooking);
router.post("/create", addBooking);
router.post("/send-confirmation", sendConfirmation);

export default router;
