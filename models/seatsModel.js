import pool from "../config/db";

export const getAvailableSeatsByFlight = async (flight_id) => {
    const result = await pool.query(
      "SELECT seat_number FROM Seats WHERE flight_id = $1 AND status = 'AVAILABLE'",
      [flight_id]
    );
    return result.rows.map(seat => seat.seat_number);
  };
  
  export const getSeatByNumber = async (flight_id, seat_number) => {
    const result = await pool.query(
      "SELECT status FROM Seats WHERE flight_id = $1 AND seat_number = $2",
      [flight_id, seat_number]
    );
    return result.rows.length ? result.rows[0] : null;
  };
  
  export const bookSelectedSeats = async (flight_id, booking_id, seat_numbers) => {
    return await pool.query(
      "UPDATE Seats SET status = 'BOOKED', booking_id = $1 WHERE flight_id = $2 AND seat_number = ANY($3)",
      [booking_id, flight_id, seat_numbers]
    );
  };
  
  export const cancelBookedSeats = async (booking_id, seat_numbers) => {
    return await pool.query(
      "UPDATE Seats SET status = 'AVAILABLE', booking_id = NULL WHERE booking_id = $1 AND seat_number = ANY($2)",
      [booking_id, seat_numbers]
    );
  };
  