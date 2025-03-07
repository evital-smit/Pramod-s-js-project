import express from "express";
import { validate } from "../middlewares/validate.js";
import {
  bookSeats,
  getAllUserBookings,
  getBookingDetails,
  cancelUserBooking,
  cancelSpecificSeats,
  processPayment,
} from "../controllers/bookingDetailController.js";
import {
  bookSeatsValidationSchema,
  getUserBookingsValidationSchema,
  getBookingDetailsValidationSchema,
  cancelBookingValidationSchema,
  cancelSeatsValidationSchema,
  processPaymentValidationSchema,
} from "../validations/bookingValidation.js";

const router = express.Router();

router.post("/book-seats", validate(bookSeatsValidationSchema), bookSeats);
router.get("/user/:user_id/bookings", validate(getUserBookingsValidationSchema), getAllUserBookings);
router.get("/booking/:booking_id/details", validate(getBookingDetailsValidationSchema), getBookingDetails);
router.patch("/booking/:booking_id/cancel", validate(cancelBookingValidationSchema), cancelUserBooking);
router.patch("/booking/cancel-seats", validate(cancelSeatsValidationSchema), cancelSpecificSeats);
router.post("/payment", validate(processPaymentValidationSchema), processPayment);

export default router;
