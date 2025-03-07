import pool from "../config/db.js";

// Get all available seats for a specific flight
export const getAvailableSeats = async (req, res) => {
  const { flight_id } = req.params;

  try {
    const seats = await pool.query(
      `SELECT seat_id, seat_number FROM Seats 
       WHERE flight_id = $1 AND status = 'AVAILABLE'`,
      [flight_id]
    );

    if (seats.rows.length === 0) return res.status(404).json({ message: "No available seats" });

    res.json({ flight_id, available_seats: seats.rows });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Get the total count of available seats for a flight
export const getSeatCount = async (req, res) => {
  const { flight_id } = req.params;

  try {
    const result = await pool.query(
      `SELECT COUNT(*) AS available_seats FROM Seats 
       WHERE flight_id = $1 AND status = 'AVAILABLE'`,
      [flight_id]
    );

    res.json({ flight_id, available_seats: result.rows[0].available_seats });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Book selected seats
export const bookSeats = async (req, res) => {
  const { flight_id, user_id, seat_numbers } = req.body;

  try {
    // Check if the requested seats are available
    const seatQuery = await pool.query(
      `SELECT seat_id FROM Seats 
       WHERE flight_id = $1 AND seat_number = ANY($2) AND status = 'AVAILABLE'`,
      [flight_id, seat_numbers]
    );

    if (seatQuery.rows.length !== seat_numbers.length) {
      return res.status(400).json({ message: "Some seats are already booked" });
    }

    // Insert booking details
    const booking = await pool.query(
      `INSERT INTO Bookings (user_id, flight_id, booking_status) 
       VALUES ($1, $2, 'CONFIRMED') RETURNING booking_id`,
      [user_id, flight_id]
    );

    const booking_id = booking.rows[0].booking_id;

    // Update seat status to 'BOOKED'
    await pool.query(
      `UPDATE Seats SET status = 'BOOKED', booking_id = $1 
       WHERE flight_id = $2 AND seat_number = ANY($3)`,
      [booking_id, flight_id, seat_numbers]
    );

    res.json({ message: "Seats booked successfully", booking_id });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Cancel seat booking
export const cancelSeatBooking = async (req, res) => {
  const { booking_id, seat_numbers } = req.body;

  try {
    // Update seat status back to 'AVAILABLE'
    await pool.query(
      `UPDATE Seats SET status = 'AVAILABLE', booking_id = NULL 
       WHERE booking_id = $1 AND seat_number = ANY($2)`,
      [booking_id, seat_numbers]
    );

    res.json({ message: "Seat booking canceled", seat_numbers });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Check if a specific seat is available
export const checkSeatAvailability = async (req, res) => {
  const { flight_id, seat_number } = req.params;

  try {
    const seat = await pool.query(
      `SELECT status FROM Seats 
       WHERE flight_id = $1 AND seat_number = $2`,
      [flight_id, seat_number]
    );

    if (seat.rows.length === 0) return res.status(404).json({ message: "Seat not found" });

    res.json({ seat_number, status: seat.rows[0].status });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
