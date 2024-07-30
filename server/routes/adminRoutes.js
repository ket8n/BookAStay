import express from "express";
import { bookings, properties, users } from "../controllers/adminController.js";
const router = express.Router();

router.post("/users", users);
router.post("/properties", properties);
router.post("/bookings", bookings);

export default router;
