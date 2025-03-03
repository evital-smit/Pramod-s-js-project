const express = require("express");
const router = express.Router();
const authMiddleware = require("../middleware/authMiddleware");
const validateRequest = require("../middleware/validateRequest");
const seatsController = require("../controllers/seatsController");
const {
    createSeatSchema,
    getSeatsByFlightIdSchema,
    updateSeatBookingStatusSchema,
    deleteSeatSchema
} = require("../validations/seatsValidations");

router.use(authMiddleware);

router.post("/", validateRequest(createSeatSchema), seatsController.createSeat);
router.get("/", seatsController.getSeats);
router.get("/available-seats", seatsController.getAvailableSeats);
router.get("/flight/:flight_id", validateRequest(getSeatsByFlightIdSchema), seatsController.getSeatsByFlightId);
router.put("/:seat_id", validateRequest(updateSeatBookingStatusSchema), seatsController.updateSeatBookingStatus);
router.delete("/:seat_id", validateRequest(deleteSeatSchema), seatsController.deleteSeat);

module.exports = router;
