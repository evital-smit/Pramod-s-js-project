const pool = require("../config/database");

const Flight = {
    create: async (airline, flight_number, total_seats) => {
        const result = await pool.query(
            "INSERT INTO Flights (airline, flight_number, total_seats) VALUES ($1, $2, $3) RETURNING *",
            [airline, flight_number, total_seats]
        );
        return result.rows[0];
    },

    getAll: async () => {
        const result = await pool.query("SELECT * FROM Flights");
        return result.rows;
    },

    getById: async (flight_id) => {
        const result = await pool.query("SELECT * FROM Flights WHERE flight_id = $1", [flight_id]);
        return result.rows[0];
    },

    update: async (flight_id, airline, flight_number, total_seats) => {
        const result = await pool.query(
            "UPDATE Flights SET airline = $1, flight_number = $2, total_seats = $3 WHERE flight_id = $4 RETURNING *",
            [airline, flight_number, total_seats, flight_id]
        );
        return result.rows[0];
    },

    delete: async (flight_id) => {
        const result = await pool.query("DELETE FROM Flights WHERE flight_id = $1 RETURNING *", [flight_id]);
        return result.rows[0];
    }
};

module.exports = Flight;
