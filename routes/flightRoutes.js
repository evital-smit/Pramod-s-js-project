const express = require("express");
const router = express.Router();
const authMiddleware = require("../middleware/authMiddleware");
const validateRequest = require("../middleware/validateRequest");
const flightController = require("../controllers/flightController");
const {
    createFlightSchema,
    updateFlightSchema
} = require("../validations/flightValidations");
const {
    createFlightRouteSchema,
    updateFlightRouteSchema
} = require("../validations/flightRoutesValidations");

router.use(authMiddleware);

router.post("/", validateRequest(createFlightSchema), flightController.createFlight);
router.get("/", flightController.getFlights);
router.get("/:id", flightController.getFlightById);
router.put("/:id", validateRequest(updateFlightSchema), flightController.updateFlight);
router.delete("/:id", flightController.deleteFlight);
router.get("/search", flightController.searchFlightsByClass);

router.post("/flight-routes", validateRequest(createFlightRouteSchema), flightController.createFlightRoute);
router.get("/flight-routes", flightController.getFlightRoutes);
router.get("/flight-routes/:id", flightController.getFlightRouteById);
router.put("/flight-routes/:id", validateRequest(updateFlightRouteSchema), flightController.updateFlightRoute);
router.delete("/flight-routes/:id", flightController.deleteFlightRoute);


module.exports = router;
