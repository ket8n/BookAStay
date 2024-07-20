import express from "express";
import cors from "cors";
import connectDB from "./config/db.js";
import "dotenv/config";
import cookieParser from "cookie-parser";
import authRoutes from "./routes/authRoutes.js";
import placeRoutes from "./routes/placeRoutes.js";
import bookingRoutes from "./routes/bookingRoutes.js";
import uploadPhotoRoutes from "./routes/uploadPhotoRoutes.js";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

connectDB();

const app = express();

app.use(express.json());
app.use(cookieParser());
app.use("/uploads", express.static(__dirname + "/uploads"));
app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  })
);
// app.use(cors());

app.get("/test", (req, res) => {
  res.json("ok");
});

app.use("/auth", authRoutes);
app.use("/upload", uploadPhotoRoutes);
app.use("/places", placeRoutes);
app.use("/bookings", bookingRoutes);

export { __filename, __dirname };

const PORT = process.env.PORT || 4000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
