import express from "express";
import {
  register,
  login,
  profile,
  logout,
  googleLogin,
} from "../controllers/authController.js";

const router = express.Router();

router.post("/register", register);
router.post("/login", login);
router.get("/profile", profile);
router.post("/logout", logout);
router.post("/google-login", googleLogin);

export default router;
