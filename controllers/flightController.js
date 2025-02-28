const Flight = require("../models/flightModel");
const FlightRoute = require("../models/flightroutesModel");

exports.createFlight = async (req, res) => {
    try {
        const { airline, flight_number, total_seats } = req.body;
        const newFlight = await Flight.create(airline, flight_number, total_seats);
        res.status(201).json(newFlight);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

exports.getFlights = async (req, res) => {
    try {
        const flights = await Flight.getAll();
        res.json(flights);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

exports.getFlightById = async (req, res) => {
    try {
        const flight = await Flight.getById(req.params.id);
        if (!flight) {
            return res.status(404).json({ error: "Flight not found" });
        }
        res.json(flight);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

exports.updateFlight = async (req, res) => {
    try {
        const { airline, flight_number, total_seats } = req.body;
        const updatedFlight = await Flight.update(req.params.id, airline, flight_number, total_seats);
        if (!updatedFlight) {
            return res.status(404).json({ error: "Flight not found" });
        }
        res.json(updatedFlight);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

exports.deleteFlight = async (req, res) => {
    try {
        const deletedFlight = await Flight.delete(req.params.id);
        if (!deletedFlight) {
            return res.status(404).json({ error: "Flight not found" });
        }
        res.json({ message: "Flight deleted successfully" });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

exports.createFlightRoute = async (req, res) => {
    try {
        const { flight_id, departure_city, arrival_city, departure_time, arrival_time, base_price, gst } = req.body;

        if (!flight_id || !departure_city || !arrival_city || !departure_time || !arrival_time || !base_price || !gst) {
            return res.status(400).json({ error: "All fields are required" });
        }

        const total_price = base_price + (base_price * gst / 100);

        const newRoute = await FlightRoute.create(flight_id, departure_city, arrival_city, departure_time, arrival_time, base_price, gst, total_price);
        res.status(201).json(newRoute);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

exports.getFlightRoutes = async (req, res) => {
    try {
        const routes = await FlightRoute.getAll();
        res.json(routes);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

exports.getFlightRouteById = async (req, res) => {
    try {
        const { id } = req.params;
        const route = await FlightRoute.getById(id);

        if (!route) {
            return res.status(404).json({ error: "Flight route not found" });
        }

        res.json(route);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

exports.updateFlightRoute = async (req, res) => {
    try {
        const { id } = req.params;
        const { flight_id, departure_city, arrival_city, departure_time, arrival_time, base_price, gst } = req.body;

        if (!flight_id || !departure_city || !arrival_city || !departure_time || !arrival_time || !base_price || !gst) {
            return res.status(400).json({ error: "All fields are required" });
        }

        const total_price = base_price + (base_price * gst / 100);

        const updatedRoute = await FlightRoute.update(id, flight_id, departure_city, arrival_city, departure_time, arrival_time, base_price, gst, total_price);

        if (!updatedRoute) {
            return res.status(404).json({ error: "Flight route not found" });
        }

        res.json(updatedRoute);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

exports.deleteFlightRoute = async (req, res) => {
    try {
        const { id } = req.params;
        const deletedRoute = await FlightRoute.delete(id);

        if (!deletedRoute) {
            return res.status(404).json({ error: "Flight route not found" });
        }

        res.json({ message: "Flight route deleted successfully" });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};
