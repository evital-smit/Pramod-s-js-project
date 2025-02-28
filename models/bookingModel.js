const pool = require("../config/database");

const Booking = {
    create: async (user_id, flight_id, booking_status) => {
        const result = await pool.query(
            "INSERT INTO Bookings (user_id, flight_id, booking_status) VALUES ($1, $2, $3) RETURNING *",
            [user_id, flight_id, booking_status]
        );
        return result.rows[0];
    },

    getAll: async () => {
        const result = await pool.query("SELECT * FROM Bookings");
        return result.rows;
    },

    getById: async (booking_id) => {
        const result = await pool.query("SELECT * FROM Bookings WHERE booking_id = $1", [booking_id]);
        return result.rows[0];
    },

    update: async (booking_id, booking_status) => {
        const result = await pool.query(
            "UPDATE Bookings SET booking_status = $1 WHERE booking_id = $2 RETURNING *",
            [booking_status, booking_id]
        );
        return result.rows[0];
    },

    delete: async (booking_id) => {
        const result = await pool.query("DELETE FROM Bookings WHERE booking_id = $1 RETURNING *", [booking_id]);
        return result.rows[0];
    }
};

module.exports = Booking;
