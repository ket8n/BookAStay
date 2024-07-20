import express from "express";
import {
  createPlace,
  getUserPlaces,
  getPlaceById,
  updatePlace,
  getAllPlaces,
} from "../controllers/placeController.js";

const router = express.Router();

router.post("/", createPlace);
router.get("/user-places", getUserPlaces);
router.get("/:id", getPlaceById);
router.put("/", updatePlace);
router.get("/", getAllPlaces);

export default router;
