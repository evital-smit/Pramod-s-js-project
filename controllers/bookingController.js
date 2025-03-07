import * as bookingModel from "../models/bookingModel.js";
  
  // Modify Booking: Change Seat(s)
  export const modifyBooking = async (req, res) => {
    const { booking_id, old_seats, new_seats } = req.body;
  
    try {
      const booking = await bookingModel.getBookingById(booking_id);
      if (!booking) return res.status(404).json({ message: "Booking not found or not confirmed" });
  
      const flight_id = booking.flight_id;
  
      const availableSeats = await bookingModel.getAvailableSeats(flight_id, new_seats);
      if (availableSeats.length !== new_seats.length) {
        return res.status(400).json({ message: "Some new seats are already booked" });
      }
  
      await releaseSeats(flight_id, old_seats);
      await bookNewSeats(booking_id, flight_id, new_seats);
  
      res.json({ message: "Booking updated successfully", booking_id, new_seats });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  };
  
  // View Booking Details (Including Payment & Seats)
  export const getBookingDetails = async (req, res) => {
    const { booking_id } = req.params;
  
    try {
      const booking = await bookingModel.fetchBookingDetails(booking_id);
      if (!booking) return res.status(404).json({ message: "Booking not found" });
  
      const seats = await bookingModel.getSeatsByBooking(booking_id);
  
      res.json({ booking, seats });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  };
  
  // List All Flights Booked by a User
  export const getAllUserBookings = async (req, res) => {
    const { user_id } = req.params;
  
    try {
      const bookings = await bookingModel.getUserBookings(user_id);
      res.json({ user_id, bookings });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  };
  