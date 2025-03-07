import express from "express";
import { validate } from "../middlewares/validate.js";
import { 
  modifyBooking, 
  getBookingDetails, 
  getAllUserBookings 
} from "../controllers/bookingController.js";
import { 
  modifyBookingValidationSchema, 
  getBookingDetailsValidationSchema, 
  getUserBookingsValidationSchema 
} from "../validations/bookingValidation.js";

const router = express.Router();

router.put("/modify", validate(modifyBookingValidationSchema), modifyBooking);
router.get("/:booking_id", validate(getBookingDetailsValidationSchema), getBookingDetails);
router.get("/user/:user_id", validate(getUserBookingsValidationSchema), getAllUserBookings);

export default router;
