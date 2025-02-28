const pool = require("../config/database");

const Seats = {
    create: async (flight_id, seat_number, seat_class, is_booked = false) => {
        const result = await pool.query(
            "INSERT INTO Seats (flight_id, seat_number, seat_class, is_booked) VALUES ($1, $2, $3, $4) RETURNING *",
            [flight_id, seat_number, seat_class, is_booked]
        );
        return result.rows[0];
    },

    getAll: async () => {
        const result = await pool.query("SELECT * FROM Seats");
        return result.rows;
    },

    getByFlightId: async (flight_id) => {
        const result = await pool.query("SELECT * FROM Seats WHERE flight_id = $1", [flight_id]);
        return result.rows;
    },
    
    updateBookingStatus: async (seat_id, is_booked) => {
        const result = await pool.query(
            "UPDATE Seats SET is_booked = $1 WHERE seat_id = $2 RETURNING *",
            [is_booked, seat_id]
        );
        return result.rows[0];
    },

    delete: async (seat_id) => {
        const result = await pool.query("DELETE FROM Seats WHERE seat_id = $1 RETURNING *", [seat_id]);
        return result.rows[0];
    }
};

module.exports = Seats;
