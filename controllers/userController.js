import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import crypto from "crypto";
import pool from "../config/db.js";
import { sendEmail } from "../utils/emailService.js";
import { 
  createUser, 
  findUserByEmail, 
  getUserById, 
  updateUser, 
  setResetToken, 
  getResetToken, 
  resetUserPassword 
} from "../models/userModel.js";

dotenv.config();

const generateToken = (userId) => {
  return jwt.sign({ userId }, process.env.JWT_SECRET, { expiresIn: "1h" });
};

export const registerUser = async (req, res) => {
  const { name, age, gender, email, password_hash, phone } = req.body;
  try {
    const existingUser = await findUserByEmail(email);
    if (existingUser) return res.status(400).json({ message: "Email already registered" });

    const user = await createUser(name, age, gender, email, password_hash, phone);
    res.status(201).json({ message: "User registered successfully", user });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const loginUser = async (req, res) => {
  const { email, password_hash } = req.body;
  try {
    const user = await findUserByEmail(email);
    if (!user) return res.status(400).json({ message: "Invalid email or password" });

    const isMatch = await bcrypt.compare(password_hash, user.password_hash);
    if (!isMatch) return res.status(400).json({ message: "Invalid email or password" });

    const token = generateToken(user.user_id);
    res.json({ message: "Login successful", token });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const getUserProfile = async (req, res) => {
  try {
    const user = await getUserById(req.user.userId);
    if (!user) return res.status(404).json({ message: "User not found" });
    res.json(user);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const updateUserProfile = async (req, res) => {
  const { name, phone, password_hash } = req.body;
  try {
    const updatedUser = await updateUser(req.user.userId, name, phone, password_hash);
    res.json({ message: "Profile updated successfully", user: updatedUser });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const forgotPassword = async (req, res) => {
  const { email } = req.body;
  try {
    const user = await findUserByEmail(email);
    if (!user) return res.status(404).json({ message: "User not found" });

    const otp = crypto.randomInt(100000, 999999).toString();
    const expiry = new Date(Date.now() + 10 * 60 * 1000);

    await setResetToken(email, otp, expiry);
    await sendEmail(email, "Password Reset OTP", `Your OTP is ${otp}`);

    res.json({ message: "OTP sent to your email" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const resetPassword = async (req, res) => {
  const { email, otp, new_password_hash } = req.body;
  try {
    const tokenData = await getResetToken(email);
    if (!tokenData) return res.status(400).json({ message: "Invalid OTP or expired" });

    if (otp !== tokenData.reset_token) return res.status(400).json({ message: "Invalid OTP" });

    if (new Date() > tokenData.reset_token_expiry) return res.status(400).json({ message: "OTP expired" });

    await resetUserPassword(email, new_password_hash);
    res.json({ message: "Password reset successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const logoutUser = (req, res) => {
  res.json({ message: "Logout successful. Please remove token from client storage." });
};
