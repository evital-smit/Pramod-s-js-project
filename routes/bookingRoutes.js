const express = require("express");
const router = express.Router();
const bookingController = require("../controllers/bookingController");


router.post("/", bookingController.createBooking);
router.get("/", bookingController.getAllBookings);
router.get("/:id", bookingController.getBookingById);
router.put("/:id", bookingController.updateBooking);
router.delete("/:id", bookingController.deleteBooking);
router.post("/details", bookingController.createBookingDetail);
router.get("/details", bookingController.getBookingDetails);
router.get("/details/:booking_id", bookingController.getBookingDetailsByBookingId);
router.put("/details/:booking_detail_id", bookingController.updateBookingStatus);
router.delete("/details/:booking_detail_id", bookingController.deleteBookingDetail);

module.exports = router;
