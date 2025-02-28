const Booking = require("../models/bookingModel");
const BookingDetails = require("../models/bookingDetailsModel");

const allowedBookingStatuses = ["CONFIRMED", "CANCELLED"];
const validGenders = ["Male", "Female", "Other"];
const validDetailStatuses = ["CONFIRMED", "CANCELLED"];


exports.createBooking = async (req, res) => {
    try {
        const { user_id, flight_id, booking_status } = req.body;

        if (!allowedBookingStatuses.includes(booking_status)) {
            return res.status(400).json({ error: "Invalid booking_status. Allowed values: CONFIRMED, CANCELLED" });
        }

        const newBooking = await Booking.create(user_id, flight_id, booking_status);
        res.status(201).json(newBooking);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

exports.getAllBookings = async (req, res) => {
    try {
        const bookings = await Booking.getAll();
        res.status(200).json(bookings);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

exports.getBookingById = async (req, res) => {
    try {
        const booking = await Booking.getById(req.params.id);
        if (!booking) {
            return res.status(404).json({ error: "Booking not found" });
        }
        res.status(200).json(booking);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

exports.updateBooking = async (req, res) => {
    try {
        const { booking_status } = req.body;

        if (!allowedBookingStatuses.includes(booking_status)) {
            return res.status(400).json({ error: "Invalid booking_status. Allowed values: CONFIRMED, CANCELLED" });
        }

        const updatedBooking = await Booking.update(req.params.id, booking_status);
        if (!updatedBooking) {
            return res.status(404).json({ error: "Booking not found" });
        }
        res.status(200).json(updatedBooking);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

exports.deleteBooking = async (req, res) => {
    try {
        const deletedBooking = await Booking.delete(req.params.id);
        if (!deletedBooking) {
            return res.status(404).json({ error: "Booking not found" });
        }
        res.status(200).json({ message: "Booking deleted successfully" });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

exports.createBookingDetail = async (req, res) => {
    try {
        const { booking_id, seat_id, passenger_name, age, gender, relation, status } = req.body;

        if (!validGenders.includes(gender)) {
            return res.status(400).json({ error: "Invalid gender. Choose from Male, Female, Other." });
        }

        if (status && !validDetailStatuses.includes(status)) {
            return res.status(400).json({ error: "Invalid status. Choose from CONFIRMED, CANCELLED." });
        }

        const newBookingDetail = await BookingDetails.create(booking_id, seat_id, passenger_name, age, gender, relation, status);
        res.status(201).json(newBookingDetail);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

exports.getBookingDetails = async (req, res) => {
    try {
        const bookingDetails = await BookingDetails.getAll();
        res.json(bookingDetails);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

exports.getBookingDetailsByBookingId = async (req, res) => {
    try {
        const { booking_id } = req.params;
        const bookingDetails = await BookingDetails.getByBookingId(booking_id);
        if (!bookingDetails.length) {
            return res.status(404).json({ error: "No booking details found for this booking ID" });
        }
        res.json(bookingDetails);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

exports.updateBookingStatus = async (req, res) => {
    try {
        const { booking_detail_id } = req.params;
        const { status } = req.body;

        if (!validDetailStatuses.includes(status)) {
            return res.status(400).json({ error: "Invalid status. Choose from CONFIRMED, CANCELLED." });
        }

        const updatedBookingDetail = await BookingDetails.updateStatus(booking_detail_id, status);
        if (!updatedBookingDetail) {
            return res.status(404).json({ error: "Booking detail not found" });
        }

        res.json(updatedBookingDetail);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

exports.deleteBookingDetail = async (req, res) => {
    try {
        const { booking_detail_id } = req.params;
        const deletedBookingDetail = await BookingDetails.delete(booking_detail_id);
        if (!deletedBookingDetail) {
            return res.status(404).json({ error: "Booking detail not found" });
        }
        res.json({ message: "Booking detail deleted successfully" });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};
