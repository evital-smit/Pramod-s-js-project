import pool from "../config/db.js";

// Fetch booking details by booking ID
export const getBookingById = async (booking_id) => {
  const result = await pool.query(
    `SELECT flight_id FROM Bookings WHERE booking_id = $1 AND booking_status = 'CONFIRMED'`,
    [booking_id]
  );
  return result.rows[0]; 
};

// Fetch available seats for a flight
export const getAvailableSeats = async (flight_id, seat_numbers) => {
  const result = await pool.query(
    `SELECT seat_id FROM Seats WHERE flight_id = $1 AND seat_number = ANY($2) AND status = 'AVAILABLE'`,
    [flight_id, seat_numbers]
  );
  return result.rows;
};

// Update seat status to 'AVAILABLE'
export const releaseSeats = async (flight_id, seat_numbers) => {
  await pool.query(
    `UPDATE Seats SET status = 'AVAILABLE', booking_id = NULL WHERE flight_id = $1 AND seat_number = ANY($2)`,
    [flight_id, seat_numbers]
  );
};

// Update seat status to 'BOOKED'
export const bookNewSeats = async (booking_id, flight_id, seat_numbers) => {
  await pool.query(
    `UPDATE Seats SET status = 'BOOKED', booking_id = $1 WHERE flight_id = $2 AND seat_number = ANY($3)`,
    [booking_id, flight_id, seat_numbers]
  );
};

// Fetch complete booking details
export const fetchBookingDetails = async (booking_id) => {
  const result = await pool.query(
    `SELECT b.booking_id, b.user_id, b.flight_id, f.departure_city, f.arrival_city, 
            f.departure_time, f.arrival_time, b.total_price, b.booking_status, p.payment_status
     FROM Bookings b
     JOIN Flights f ON b.flight_id = f.flight_id
     JOIN Payments p ON b.booking_id = p.booking_id
     WHERE b.booking_id = $1`,
    [booking_id]
  );
  return result.rows[0];
};

// Fetch booked seats for a given booking
export const getSeatsByBooking = async (booking_id) => {
  const result = await pool.query(
    `SELECT seat_number FROM Seats WHERE booking_id = $1`,
    [booking_id]
  );
  return result.rows.map(seat => seat.seat_number);
};

// Fetch all bookings for a user
export const getUserBookings = async (user_id) => {
  const result = await pool.query(
    `SELECT b.booking_id, f.flight_id, f.departure_city, f.arrival_city, 
            f.departure_time, f.arrival_time, b.total_price, b.booking_status
     FROM Bookings b
     JOIN Flights f ON b.flight_id = f.flight_id
     WHERE b.user_id = $1
     ORDER BY b.created_at DESC`,
    [user_id]
  );
  return result.rows;
};
