import express from "express";
import {
  registerUser,
  loginUser,
  getUserProfile,
  updateUserProfile,
  forgotPassword,
  resetPassword,
  logoutUser,
} from "../controllers/userController.js";
import { validateUserRegister, validateUserLogin, validateResetPassword } from "../validations/userValidation.js";
import authMiddleware from "../middlewares/authMiddleware.js";

const router = express.Router();

router.post("/register", validateUserRegister, registerUser);
router.post("/login", validateUserLogin, loginUser);
router.get("/profile", authMiddleware, getUserProfile);
router.put("/profile", authMiddleware, updateUserProfile);
router.post("/forgot-password", forgotPassword);
router.post("/reset-password", validateResetPassword, resetPassword);
router.post("/logout", logoutUser);

export default router;
