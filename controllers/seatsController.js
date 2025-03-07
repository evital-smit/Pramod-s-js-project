import { 
  getAvailableSeatsByFlight, 
  getSeatByNumber, 
  bookSelectedSeats, 
  cancelBookedSeats 
} from "../models/seatsModel.js";

export const getAvailableSeats = async (req, res) => {
const { flight_id } = req.params;

try {
  const availableSeats = await getAvailableSeatsByFlight(flight_id);
  if (availableSeats.length === 0) return res.status(404).json({ message: "No available seats found" });

  res.json({ flight_id, availableSeats });
} catch (error) {
  res.status(500).json({ message: error.message });
}
};

export const getSeatCount = async (req, res) => {
const { flight_id } = req.params;

try {
  const availableSeats = await getAvailableSeatsByFlight(flight_id);
  res.json({ flight_id, availableSeatsCount: availableSeats.length });
} catch (error) {
  res.status(500).json({ message: error.message });
}
};

export const bookSeat = async (req, res) => {
const { flight_id, booking_id, seat_numbers } = req.body;

try {
  const result = await bookSelectedSeats(flight_id, booking_id, seat_numbers);
  if (result.rowCount === 0) return res.status(400).json({ message: "Seats could not be booked" });

  res.json({ message: "Seats booked successfully", flight_id, bookedSeats: seat_numbers });
} catch (error) {
  res.status(500).json({ message: error.message });
}
};

export const cancelSeatBooking = async (req, res) => {
const { booking_id, seat_numbers } = req.body;

try {
  const result = await cancelBookedSeats(booking_id, seat_numbers);
  if (result.rowCount === 0) return res.status(400).json({ message: "Seats could not be canceled" });

  res.json({ message: "Seats canceled successfully", booking_id, canceledSeats: seat_numbers });
} catch (error) {
  res.status(500).json({ message: error.message });
}
};

export const checkSeatAvailability = async (req, res) => {
const { flight_id, seat_number } = req.params;

try {
  const seat = await getSeatByNumber(flight_id, seat_number);
  if (!seat) return res.status(404).json({ message: "Seat not found" });

  res.json({ flight_id, seat_number, status: seat.status });
} catch (error) {
  res.status(500).json({ message: error.message });
}
};
