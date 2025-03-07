import express from "express";
import {
  getAvailableSeats,
  getSeatCount,
  bookSeats,
  cancelSeatBooking,
  checkSeatAvailability
} from "../controllers/seatsController.js";

const router = express.Router();

router.get("/:flight_id/available-seats", getAvailableSeats);
router.get("/:flight_id/seat-count", getSeatCount);
router.post("/book", bookSeats);
router.post("/cancel", cancelSeatBooking);
router.get("/:flight_id/seat/:seat_number", checkSeatAvailability);

export default router;
