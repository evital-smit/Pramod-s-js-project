const Seats = require("../models/seatsModel");
const authMiddleware = require("../middleware/authMiddleware");
const validateRequest = require("../middleware/validateRequest");
const seatSchemas = require("../validations/seatsValidations");

exports.createSeat = [
    authMiddleware,
    validateRequest(seatSchemas.createSeatSchema),
    async (req, res) => {
        try {
            const { flight_id, seat_number, seat_class, is_booked } = req.body;

            const validClasses = ["Economy", "Business", "First Class"];
            if (!validClasses.includes(seat_class)) {
                return res.status(400).json({ error: "Invalid seat class. Choose from Economy, Business, First Class" });
            }

            const newSeat = await Seats.create(flight_id, seat_number, seat_class, is_booked);
            res.status(201).json(newSeat);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }
];

exports.getSeats = [
    authMiddleware,
    async (req, res) => {
        try {
            const seats = await Seats.getAll();
            res.json(seats);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }
];

exports.getSeatsByFlightId = [
    authMiddleware,
    validateRequest(seatSchemas.getSeatsByFlightIdSchema),
    async (req, res) => {
        try {
            const { flight_id } = req.body;
            const seats = await Seats.getByFlightId(flight_id);
            if (!seats.length) {
                return res.status(404).json({ error: "No seats found for this flight" });
            }
            res.json(seats);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }
];

exports.updateSeatBookingStatus = [
    authMiddleware,
    validateRequest(seatSchemas.updateSeatBookingStatusSchema),
    async (req, res) => {
        try {
            const { seat_id, is_booked } = req.body;

            const seat = await Seats.getById(seat_id);
            if (!seat) {
                return res.status(404).json({ error: "Seat not found" });
            }

            if (seat.is_booked && is_booked) {
                return res.status(400).json({ error: "Seat is already booked" });
            }

            const updatedSeat = await Seats.updateBookingStatus(seat_id, is_booked);
            res.json(updatedSeat);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }
];

exports.deleteSeat = [
    authMiddleware,
    validateRequest(seatSchemas.deleteSeatSchema),
    async (req, res) => {
        try {
            const { seat_id } = req.body;
            const deletedSeat = await Seats.delete(seat_id);
            if (!deletedSeat) {
                return res.status(404).json({ error: "Seat not found" });
            }
            res.json({ message: "Seat deleted successfully" });
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }
];

exports.getAvailableSeats = [
    authMiddleware,
    validateRequest(seatSchemas.getSeatsByFlightIdSchema),
    async (req, res) => {
        try {
            const { flight_id } = req.body; 
            
            const availableSeats = await Seats.getAvailableSeats(flight_id);
            
            if (!availableSeats.length) {
                return res.status(404).json({ error: "No available seats for this flight" });
            }
            res.json(availableSeats);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }
];
