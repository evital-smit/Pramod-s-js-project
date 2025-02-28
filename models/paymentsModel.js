const pool = require('../config/database');

const Payment = {
    create: async (booking_id, user_id, amount, payment_status) => {
        const result = await pool.query(
            "INSERT INTO Payments (booking_id, user_id, amount, payment_status, payment_date) VALUES ($1, $2, $3, $4, NOW()) RETURNING *",
            [booking_id, user_id, amount, payment_status]
        );
        return result.rows[0];
    },

    findById: async (payment_id) => {
        const result = await pool.query("SELECT * FROM Payments WHERE payment_id = $1", [payment_id]);
        return result.rows[0];
    },

    findByUserId: async (user_id) => {
        const result = await pool.query("SELECT * FROM Payments WHERE user_id = $1", [user_id]);
        return result.rows;
    },

    updateStatus: async (payment_id, payment_status) => {
        const result = await pool.query(
            "UPDATE Payments SET payment_status = $1 WHERE payment_id = $2 RETURNING *",
            [payment_status, payment_id]
        );
        return result.rows[0];
    },

    delete: async (payment_id) => {
        const result = await pool.query("DELETE FROM Payments WHERE payment_id = $1 RETURNING *", [payment_id]);
        return result.rows[0];
    }
};

module.exports = Payment;
