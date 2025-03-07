import {
    storeBookingDetails,
    getUserBookings,
    getBookingDetailsById,
    cancelBooking,
    cancelSeats,
    makePayment
  } from "../models/bookingDetailsModel.js";
  
  // Book seats and store passenger details
  export const bookSeats = async (req, res) => {
    const { booking_id, passengers } = req.body;
  
    try {
      const bookingDetails = await storeBookingDetails(booking_id, passengers);
      res.json({ message: "Booking details stored successfully", bookingDetails });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  };
  
  // View all bookings for a user
  export const getAllUserBookings = async (req, res) => {
    const { user_id } = req.params;
  
    try {
      const bookings = await getUserBookings(user_id);
      res.json({ user_id, bookings });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  };
  
  // Get booking details including passengers
  export const getBookingDetails = async (req, res) => {
    const { booking_id } = req.params;
  
    try {
      const bookingDetails = await getBookingDetailsById(booking_id);
      if (!bookingDetails) return res.status(404).json({ message: "Booking not found" });
  
      res.json(bookingDetails);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  };
  
  // Cancel entire booking
  export const cancelUserBooking = async (req, res) => {
    const { booking_id } = req.params;
  
    try {
      await cancelBooking(booking_id);
      res.json({ message: "Booking cancelled successfully", booking_id });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  };
  
  // Cancel specific seats in a booking
  export const cancelSpecificSeats = async (req, res) => {
    const { booking_id, seat_ids } = req.body;
  
    try {
      await cancelSeats(booking_id, seat_ids);
      res.json({ message: "Selected seats cancelled successfully", booking_id, seat_ids });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  };
  
  // Make payment for a booking
  export const processPayment = async (req, res) => {
    const { booking_id, user_id, amount } = req.body;
  
    try {
      const payment = await makePayment(booking_id, user_id, amount);
      res.json({ message: "Payment successful", payment });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  };
  