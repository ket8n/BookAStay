import express from "express";
import {
  uploadPhotoByLink,
  uploadPhoto,
  uploadPhotoMiddleware,
} from "../controllers/uploadPhotoController.js";

const router = express.Router();

router.post("/upload-by-link", uploadPhotoByLink);
router.post("/", uploadPhotoMiddleware, uploadPhoto);

export default router;
