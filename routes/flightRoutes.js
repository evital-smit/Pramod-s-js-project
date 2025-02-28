const express = require("express");
const router = express.Router();
const flightController = require("../controllers/flightController");

router.post("/flights", flightController.createFlight);
router.get("/flights", flightController.getFlights);
router.get("/flights/:id", flightController.getFlightById);
router.put("/flights/:id", flightController.updateFlight);
router.delete("/flights/:id", flightController.deleteFlight);
router.post("/flight-routes", flightController.createFlightRoute);
router.get("/flight-routes", flightController.getFlightRoutes);
router.get("/flight-routes/:id", flightController.getFlightRouteById);
router.put("/flight-routes/:id", flightController.updateFlightRoute);
router.delete("/flight-routes/:id", flightController.deleteFlightRoute);

module.exports = router;
