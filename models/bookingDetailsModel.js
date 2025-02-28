const pool = require("../config/database");

const BookingDetails = {
    create: async (booking_id, seat_id, passenger_name, age, gender, relation, status = "CONFIRMED") => {
        const result = await pool.query(
            "INSERT INTO BookingDetails (booking_id, seat_id, passenger_name, age, gender, relation, status) VALUES ($1, $2, $3, $4, $5, $6, $7) RETURNING *",
            [booking_id, seat_id, passenger_name, age, gender, relation, status]
        );
        return result.rows[0];
    },

    getAll: async () => {
        const result = await pool.query("SELECT * FROM BookingDetails");
        return result.rows;
    },

    getByBookingId: async (booking_id) => {
        const result = await pool.query("SELECT * FROM BookingDetails WHERE booking_id = $1", [booking_id]);
        return result.rows;
    },

    updateStatus: async (booking_detail_id, status) => {
        const result = await pool.query(
            "UPDATE BookingDetails SET status = $1 WHERE booking_detail_id = $2 RETURNING *",
            [status, booking_detail_id]
        );
        return result.rows[0];
    },

    delete: async (booking_detail_id) => {
        const result = await pool.query("DELETE FROM BookingDetails WHERE booking_detail_id = $1 RETURNING *", [booking_detail_id]);
        return result.rows[0];
    }
};

module.exports = BookingDetails;
