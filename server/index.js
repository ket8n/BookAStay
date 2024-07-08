import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import "dotenv/config";
import User from "./models/User.js";
import bcrypt from "bcryptjs";

const app = express();

mongoose.connect(process.env.MONGO_URL);
const bcryptSalt = bcrypt.genSaltSync(10);

app.use(express.json());
app.use(cors());

app.get("/test", (req, res) => {
  res.json("ok");
});

app.post("/register", async (req, res) => {
  const { name, email, password } = req.body;

  try {
    const user = await User.create({
      name,
      email,
      password: bcrypt.hashSync(password, bcryptSalt),
    });
    res.json(user);
  } catch (err) {
    res.status(422).json(err);
  }
});

app.listen(4000);
