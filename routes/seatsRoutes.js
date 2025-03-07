import express from "express";
import {
  getAvailableSeats,
  getSeatCount,
  bookSeat,
  cancelSeatBooking,
  checkSeatAvailability
} from "../controllers/seatsController.js";

const router = express.Router();

router.get("/:flight_id/available-seats", getAvailableSeats);
router.get("/:flight_id/seat-count", getSeatCount);
router.post("/book", bookSeat);
router.post("/cancel", cancelSeatBooking);
router.get("/:flight_id/seat/:seat_number", checkSeatAvailability);

export default router;
