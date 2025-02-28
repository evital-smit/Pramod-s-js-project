const Payment = require('../models/paymentsModel');

exports.createPayment = async (req, res) => {
    try {
        const { booking_id, user_id, amount, payment_status } = req.body;

        const validStatuses = ["PENDING", "COMPLETED", "FAILED", "REFUNDED"];
        if (!validStatuses.includes(payment_status)) {
            return res.status(400).json({ error: "Invalid payment status. Choose from PENDING, COMPLETED, FAILED, REFUNDED" });
        }

        const newPayment = await Payment.create(booking_id, user_id, amount, payment_status);
        res.status(201).json(newPayment);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

exports.getPaymentById = async (req, res) => {
    try {
        const { payment_id } = req.params;
        const payment = await Payment.findById(payment_id);
        if (!payment) {
            return res.status(404).json({ error: "Payment not found" });
        }
        res.json(payment);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

exports.getPaymentsByUser = async (req, res) => {
    try {
        const { user_id } = req.params;
        const payments = await Payment.findByUserId(user_id);
        res.json(payments);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

exports.updatePaymentStatus = async (req, res) => {
    try {
        const { payment_id } = req.params;
        const { payment_status } = req.body;

        const validStatuses = ["PENDING", "COMPLETED", "FAILED", "REFUNDED"];
        if (!validStatuses.includes(payment_status)) {
            return res.status(400).json({ error: "Invalid payment status. Choose from PENDING, COMPLETED, FAILED, REFUNDED" });
        }

        const updatedPayment = await Payment.updateStatus(payment_id, payment_status);
        if (!updatedPayment) {
            return res.status(404).json({ error: "Payment not found" });
        }

        res.json(updatedPayment);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

exports.deletePayment = async (req, res) => {
    try {
        const { payment_id } = req.params;
        const deletedPayment = await Payment.delete(payment_id);
        if (!deletedPayment) {
            return res.status(404).json({ error: "Payment not found" });
        }
        res.json({ message: "Payment deleted successfully" });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};
