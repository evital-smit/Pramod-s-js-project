const Seats = require("../models/seatsModel");

exports.createSeat = async (req, res) => {
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
};

exports.getSeats = async (req, res) => {
    try {
        const seats = await Seats.getAll();
        res.json(seats);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

exports.getSeatsByFlightId = async (req, res) => {
    try {
        const { flight_id } = req.params;
        const seats = await Seats.getByFlightId(flight_id);
        if (!seats.length) {
            return res.status(404).json({ error: "No seats found for this flight" });
        }
        res.json(seats);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};


exports.updateSeatBookingStatus = async (req, res) => {
    try {
        const { seat_id } = req.params;
        const { is_booked } = req.body;

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
};


exports.deleteSeat = async (req, res) => {
    try {
        const { seat_id } = req.params;
        const deletedSeat = await Seats.delete(seat_id);
        if (!deletedSeat) {
            return res.status(404).json({ error: "Seat not found" });
        }
        res.json({ message: "Seat deleted successfully" });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};


