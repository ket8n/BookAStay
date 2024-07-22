import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import User from "../models/User.js";

const bcryptSalt = bcrypt.genSaltSync(10);
const jwtSecret = process.env.JWT_SECRET;

export const register = async (req, res) => {
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
};

export const login = async (req, res) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email });

  if (user) {
    const passOk = bcrypt.compareSync(password, user.password);
    if (passOk) {
      const token = jwt.sign(
        { email: user.email, id: user._id },
        jwtSecret,
        {}
      );
      res.cookie("token", token).json(user);
    } else {
      res.status(422).json("Password not correct");
    }
  } else {
    res.status(422).json("Email not found.");
  }
};

export const profile = (req, res) => {
  const { token } = req.cookies;

  if (token) {
    jwt.verify(token, jwtSecret, {}, async (err, userData) => {
      if (err) throw err;
      const { name, email, _id } = await User.findById(userData.id);
      res.json({ name, email, _id });
    });
  } else {
    res.json(null);
  }
};

export const logout = (req, res) => {
  res.cookie("token", "").json(true);
};