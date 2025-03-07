import pool from "../config/db.js";

// Store booking details for each passenger
export const storeBookingDetails = async (booking_id, passengers) => {
  const queryText = `
    INSERT INTO BookingDetails (booking_id, seat_id, passenger_name, age, gender, relation, status) 
    VALUES ($1, $2, $3, $4, $5, $6, 'CONFIRMED') RETURNING *`;
  
  const insertedDetails = [];
  
  for (const passenger of passengers) {
    const result = await pool.query(queryText, [
      booking_id,
      passenger.seat_id,
      passenger.passenger_name,
      passenger.age,
      passenger.gender,
      passenger.relation
    ]);
    insertedDetails.push(result.rows[0]);
  }
  return insertedDetails;
};

// Get user booking details including passenger info
export const getUserBookings = async (user_id) => {
  const result = await pool.query(
    `SELECT b.booking_id, f.flight_id, f.departure_city, f.arrival_city, 
            f.departure_time, f.arrival_time, b.total_price, b.booking_status, p.payment_status
     FROM Bookings b
     JOIN Flights f ON b.flight_id = f.flight_id
     LEFT JOIN Payments p ON b.booking_id = p.booking_id
     WHERE b.user_id = $1
     ORDER BY b.created_at DESC`,
    [user_id]
  );
  return result.rows;
};

// Get booking details including seats and passengers
export const getBookingDetailsById = async (booking_id) => {
  const bookingResult = await pool.query(
    `SELECT b.booking_id, b.user_id, f.flight_id, f.departure_city, f.arrival_city, 
            f.departure_time, f.arrival_time, b.total_price, b.booking_status, p.payment_status
     FROM Bookings b
     JOIN Flights f ON b.flight_id = f.flight_id
     LEFT JOIN Payments p ON b.booking_id = p.booking_id
     WHERE b.booking_id = $1`,
    [booking_id]
  );

  if (bookingResult.rows.length === 0) return null;

  const passengersResult = await pool.query(
    `SELECT bd.seat_id, s.seat_number, bd.passenger_name, bd.age, bd.gender, bd.relation, bd.status
     FROM BookingDetails bd
     JOIN Seats s ON bd.seat_id = s.seat_id
     WHERE bd.booking_id = $1`,
    [booking_id]
  );

  return { booking: bookingResult.rows[0], passengers: passengersResult.rows };
};

// Cancel entire booking
export const cancelBooking = async (booking_id) => {
  await pool.query(`UPDATE BookingDetails SET status = 'CANCELLED' WHERE booking_id = $1`, [booking_id]);
  await pool.query(`UPDATE Seats SET status = 'AVAILABLE', booking_id = NULL WHERE booking_id = $1`, [booking_id]);
  await pool.query(`UPDATE Bookings SET booking_status = 'CANCELLED' WHERE booking_id = $1`, [booking_id]);
};

// Cancel specific seats in a booking
export const cancelSeats = async (booking_id, seat_ids) => {
  await pool.query(`UPDATE BookingDetails SET status = 'CANCELLED' WHERE booking_id = $1 AND seat_id = ANY($2)`, [booking_id, seat_ids]);
  await pool.query(`UPDATE Seats SET status = 'AVAILABLE', booking_id = NULL WHERE seat_id = ANY($1)`, [seat_ids]);
};

// Make payment for a booking
export const makePayment = async (booking_id, user_id, amount) => {
  const result = await pool.query(
    `INSERT INTO Payments (booking_id, user_id, amount, payment_status, payment_date) 
     VALUES ($1, $2, $3, 'COMPLETED', NOW()) RETURNING *`,
    [booking_id, user_id, amount]
  );
  
  await pool.query(`UPDATE Bookings SET booking_status = 'CONFIRMED' WHERE booking_id = $1`, [booking_id]);

  return result.rows[0];
};
