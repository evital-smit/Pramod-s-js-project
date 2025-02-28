const User = require('../models/userModel');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const sendEmail = require('../config/emailConfig'); 


exports.register = async (req, res) => {
    try {
        const { name, age, gender, email, password_hash, phone } = req.body;

        if (!password_hash || password_hash.trim() === "") {
            return res.status(400).json({ error: "Password is required" });
        }

        const existingUser = await User.findByEmail(email);
        if (existingUser) {
            return res.status(400).json({ error: "Email already exists" });
        }

        const hashedPassword = await bcrypt.hash(password_hash, 10);
        const newUser = await User.create(name, age, gender, email, hashedPassword, phone);

        const confirmLink = `${process.env.FRONTEND_URL}/confirm-email/${newUser.user_id}`;
        const emailText = `Hello ${name},\n\nPlease confirm your email by clicking the link below:\n\n${confirmLink}\n\nThank you!`;

        await sendEmail(email, "Confirm Your Email", emailText);

        res.status(201).json({ message: "Registration successful. Please check your email for confirmation." });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};


exports.forgotPassword = async (req, res) => {
    try {
        const { email } = req.body;
        const user = await User.findByEmail(email);
        if (!user) return res.status(404).json({ error: "User not found" });

        const token = jwt.sign({ user_id: user.user_id }, process.env.JWT_SECRET, { expiresIn: '15m' });

        const resetLink = `${process.env.FRONTEND_URL}/reset-password/${token}`;
        const emailText = `Hello,\n\nClick the link below to reset your password:\n\n${resetLink}\n\nThis link is valid for 15 minutes.\n\nThank you!`;

        await sendEmail(email, "Reset Your Password", emailText);

        res.json({ message: "Password reset link has been sent to your email." });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};


exports.resetPassword = async (req, res) => {
    try {
        const { token } = req.params;
        const { newPassword } = req.body;

        if (!newPassword || newPassword.trim() === "") {
            return res.status(400).json({ error: "New password is required" });
        }

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
};

exports.login = async (req, res) => {
    try{
        const { email, password_hash } = req.body;
        const user = await User.findByEmail(email);
        if(!user){
            return res.status(404).json({error: "User not Found"});
        }

        const isMatch = await bcrypt.compare(password_hash, user.password_hash);
        if(!isMatch){
            return res.status(400).json({error: "Invalid credentials"});
        }

        const token = jwt.sign({ user_id: user.user_id, email: user.email }, process.env.JWT_SECRET, { expiresIn: '1d' });
        res.json({ token, user: { user_id: user.user_id, name: user.name, email: user.email } });
    }catch(error){
        res.status(500).json({error: error.message});
    }
};

exports.getUser = async (req, res) => {
    try {
        const user = await User.findById(req.params.id);
        if (!user) return res.status(404).json({ error: "User not found" });

        res.json(user);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

exports.updateUser = async (req, res) => {
    try {
        const { name, age, gender, phone } = req.body;
        const updatedUser = await User.updateUser(req.params.id, name, age, gender, phone);
        res.json(updatedUser);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

exports.deleteUser = async (req, res) => {
    try {
        const deletedUser = await User.deleteUser(req.params.id);
        if (!deletedUser) return res.status(404).json({ error: "User not found" });

        res.json({ message: "User deleted successfully" });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};