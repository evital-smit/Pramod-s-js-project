import * as flightModel from "../models/flightModel.js";

// Search flights
export const searchFlights = async (req, res) => {
  try {
    const { departure_city, arrival_city, date } = req.query;
    const flights = await flightModel.searchFlights(departure_city, arrival_city, date);

    if (flights.length === 0) return res.status(404).json({ message: "No flights available" });
    res.json(flights);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};


// Get flight details
export const getFlightDetails = async (req, res) => {
  try {
    const flight = await flightModel.getFlightDetails(req.params.flight_id);
    if (!flight) return res.status(404).json({ message: "Flight not found" });
    res.json(flight);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Select a Flight
export const selectFlight = async (req, res) => {
  try {
    const flight = await flightModel.getFlightById(req.body.flight_id);
    if (!flight) return res.status(404).json({ message: "Flight not found" });
    res.json({ message: "Flight selected successfully", flight });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Filter flights
export const filterFlights = async (req, res) => {
  try {
    const flights = await flightModel.filterFlights(req.query);
    res.json(flights);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};


