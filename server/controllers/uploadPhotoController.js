import imageDownloader from "image-downloader";
import fs from "fs";
import multer from "multer";
import path from "path";
import { __filename, __dirname } from "../index.js";

const photosMiddleware = multer({ dest: "uploads/" });

export const uploadPhoto = (req, res) => {
  const uploadedFiles = [];
  for (let i = 0; i < req.files.length; i++) {
    const { path, originalname } = req.files[i];
    const parts = originalname.split(".");
    const ext = parts[parts.length - 1];
    const newPath = path + "." + ext;
    fs.renameSync(path, newPath);
    uploadedFiles.push(newPath.replace("uploads\\", ""));
  }

  res.json(uploadedFiles);
};

export const uploadPhotoMiddleware = photosMiddleware.array("photos", 100);

export const uploadPhotoByLink = (req, res) => {
  const { link } = req.body;
  const newName = "photo" + Date.now() + ".jpg";

  imageDownloader
    .image({
      url: link,
      dest: path.join(__dirname, "/uploads", newName),
    })
    .then(() => {
      res.json(newName);
    })
    .catch((err) => {
      res.status(422).json("failed to save image.");
    });
};
