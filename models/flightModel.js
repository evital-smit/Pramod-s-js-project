import pool from "../config/db.js";

// Search flights by departure city, arrival city, and date
export const searchFlights = async (departureCity, arrivalCity, date) => {
  const query = `
    SELECT f.flight_id, f.airline, f.flight_number, f.total_seats,
           fr.route_id, fr.departure_city, fr.arrival_city, 
           fr.departure_time, fr.arrival_time, fr.base_price, fr.gst, fr.total_price
    FROM Flights f
    JOIN FlightRoutes fr ON f.flight_id = fr.flight_id
    WHERE fr.departure_city = $1 
      AND fr.arrival_city = $2 
      AND DATE(fr.departure_time) = $3;
  `;

  const values = [departureCity, arrivalCity, date];
  const result = await pool.query(query, values);
  return result.rows;
};

// Get flight details by flight ID
export const getFlightDetails = async (flightId) => {
  const query = `
    SELECT f.flight_id, f.airline, f.flight_number, f.total_seats,
           fr.route_id, fr.departure_city, fr.arrival_city, 
           fr.departure_time, fr.arrival_time, fr.base_price, fr.gst, fr.total_price
    FROM Flights f
    JOIN FlightRoutes fr ON f.flight_id = fr.flight_id
    WHERE f.flight_id = $1;
  `;
  const result = await pool.query(query, [flightId]);
  return result.rows.length > 0 ? result.rows[0] : null;
};

// Select a flight (Airline)
export const getFlightById = async (flightId) => {
  const result = await pool.query("SELECT * FROM Flights WHERE flight_id = $1", [flightId]);
  return result.rows.length > 0 ? result.rows[0] : null;
};

// Filter Flights (by price range, airline, departure time)
export const filterFlights = async ({ departureCity, arrivalCity, date, minPrice, maxPrice, airline, departureTime }) => {
  let query = `
    SELECT f.flight_id, f.airline, fr.departure_city, fr.arrival_city, 
           fr.departure_time, fr.arrival_time, fr.total_price
    FROM Flights f 
    JOIN FlightRoutes fr ON f.flight_id = fr.flight_id 
    WHERE fr.departure_city = $1 AND fr.arrival_city = $2 AND DATE(fr.departure_time) = $3
  `;
  let params = [departureCity, arrivalCity, date];

  if (minPrice) {
    query += " AND fr.total_price >= $" + (params.length + 1);
    params.push(minPrice);
  }
  if (maxPrice) {
    query += " AND fr.total_price <= $" + (params.length + 1);
    params.push(maxPrice);
  }
  if (airline) {
    query += " AND f.airline = $" + (params.length + 1);
    params.push(airline);
  }
  if (departureTime) {
    query += " AND TIME(fr.departure_time) >= $" + (params.length + 1);
    params.push(departureTime);
  }

  const result = await pool.query(query, params);
  return result.rows;
};

