const express = require("express");
const router = express.Router();
const seatsController = require('../controllers/seatsController');


router.post("/", seatsController.createSeat);
router.get("/get", seatsController.getSeats);
router.get("/:id", seatsController.getSeatsByFlightId);
router.put("/:id", seatsController.updateSeatBookingStatus);
router.delete("/:id", seatsController.deleteSeat);

module.exports = router;
