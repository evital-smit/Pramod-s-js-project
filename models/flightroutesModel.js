const pool = require("../config/database");

const FlightRoute = {
    create: async (flight_id, departure_city, arrival_city, departure_time, arrival_time, base_price, gst, total_price) => {
        const result = await pool.query(
            "INSERT INTO FlightRoutes(flight_id, departure_city, arrival_city, departure_time, arrival_time, base_price, gst)VALUES ($1, $2, $3, $4, $5, $6, $7) RETURNING *",
            [flight_id, departure_city, arrival_city, departure_time, arrival_time, base_price, gst]  
        );
        
        return result.rows[0];
    },

    getAll: async () => {
        const result = await pool.query("SELECT * FROM FlightRoutes");
        return result.rows;
    },

    getById: async (route_id) => {
        const result = await pool.query("SELECT * FROM FlightRoutes WHERE route_id = $1", [route_id]);
        return result.rows[0];
    },

    update: async (route_id, flight_id, departure_city, arrival_city, departure_time, arrival_time, base_price, gst, total_price) => {
        const result = await pool.query(
            "UPDATE FlightRoutes SET departure_city = $1, arrival_city = $2, base_price = $3, gst = $4 WHERE route_id = $5 RETURNING *",
            [departure_city, arrival_city, base_price, gst, route_id]  
        );        
        return result.rows[0];
    },

    delete: async (route_id) => {
        const result = await pool.query("DELETE FROM FlightRoutes WHERE route_id = $1 RETURNING *", [route_id]);
        return result.rows[0];
    }
};

module.exports = FlightRoute;
