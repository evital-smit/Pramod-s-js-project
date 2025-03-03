const User = require('../models/userModel');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const sendEmail = require('../config/emailConfig');
const validateRequest = require('../middleware/validateRequest');
const userSchemas = require('../validations/userValidations');

exports.register = [
    validateRequest(userSchemas.registerSchema),
    async (req, res) => {
        try {
            const { name, age, gender, email, password_hash, phone } = req.body;

            const existingUser = await User.findByEmail(email);
            if (existingUser) {
                return res.status(400).json({ error: "Email already exists" });
            }

            const hashedPassword = await bcrypt.hash(password_hash, 10);
            const newUser = await User.create(name, age, gender, email, hashedPassword, phone);

            const token = jwt.sign({ user_id: newUser.user_id, email: newUser.email }, process.env.JWT_SECRET, { expiresIn: '1d' });

            const confirmLink = `${process.env.FRONTEND_URL}/confirm-email/${newUser.user_id}`;
            const emailText = `Hello ${name},\n\nPlease confirm your email by clicking the link below:\n\n${confirmLink}\n\nThank you!`;

            await sendEmail(email, "Confirm Your Email", emailText);

            res.status(201).json({
                message: "Registration successful. Please check your email for confirmation.",
                token,
                user: { user_id: newUser.user_id, name: newUser.name, email: newUser.email }
            });
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }
];

exports.login = [
    validateRequest(userSchemas.loginSchema),
    async (req, res) => {
        try {
            const { email, password_hash } = req.body;
            const user = await User.findByEmail(email);
            if (!user) {
                return res.status(404).json({ error: "User not found" });
            }

            const isMatch = await bcrypt.compare(password_hash, user.password_hash);
            if (!isMatch) {
                return res.status(400).json({ error: "Invalid credentials" });
            }

            const token = jwt.sign({ user_id: user.user_id, email: user.email }, process.env.JWT_SECRET, { expiresIn: '1d' });
            res.json({ token, user: { user_id: user.user_id, name: user.name, email: user.email } });
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }
];

exports.forgotPassword = [
    validateRequest(userSchemas.forgotPasswordSchema),
    async (req, res) => {
        try {
            const { email } = req.body;
            const user = await User.findByEmail(email);
            if (!user) return res.status(404).json({ error: "User not found" });

            const token = jwt.sign({ email }, process.env.JWT_SECRET, { expiresIn: '15m' });

            const resetLink = `${process.env.FRONTEND_URL}/reset-password/${token}`;
            const emailText = `Hello,\n\nClick the link below to reset your password:\n\n${resetLink}\n\nThis link is valid for 15 minutes.\n\nThank you!`;

            await sendEmail(email, "Reset Your Password", emailText);

            res.json({ message: "Password reset link has been sent to your email." });
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }
];

exports.resetPassword = [
    validateRequest(userSchemas.resetPasswordSchema),
    async (req, res) => {
        try {
            const { token, newPassword } = req.body;

            let decoded;
            try {
                decoded = jwt.verify(token, process.env.JWT_SECRET);
            } catch (error) {
                return res.status(400).json({ error: "Invalid or expired token" });
            }

            const hashedPassword = await bcrypt.hash(newPassword, 10);
            await User.updatePassword(decoded.user_id, hashedPassword);

            res.json({ message: "Password reset successful. You can now log in with your new password." });
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }
];

exports.getUser = [
    validateRequest(userSchemas.getUserSchema),
    async (req, res) => {
        try {
            const { user_id } = req.body;  
            const user = await User.findById(user_id);
            if (!user) return res.status(404).json({ error: "User not found" });

            res.json(user);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }
];

exports.updateUser = [
    validateRequest(userSchemas.updateUserSchema),
    async (req, res) => {
        try {
            const { user_id, name, age, gender, phone } = req.body;
            const updatedUser = await User.updateUser(user_id, name, age, gender, phone);
            res.json(updatedUser);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }
];

exports.deleteUser = [
    validateRequest(userSchemas.deleteUserSchema),
    async (req, res) => {
        try {
            const { user_id } = req.body;
            const deletedUser = await User.deleteUser(user_id);
            if (!deletedUser) return res.status(404).json({ error: "User not found" });

            res.json({ message: "User deleted successfully" });
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }
];
