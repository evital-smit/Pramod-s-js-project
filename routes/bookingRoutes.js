const express = require("express");
const router = express.Router();
const authMiddleware = require("../middleware/authMiddleware");
const validateRequest = require("../middleware/validateRequest");
const bookingController = require("../controllers/bookingController");

const {
    createBookingSchema,
    updateBookingSchema,
    createBookingDetailSchema,
    updateBookingStatusSchema
} = require("../validations/bookingValidations");

router.use(authMiddleware);

router.post("/", validateRequest(createBookingSchema), bookingController.createBooking);
router.get("/", bookingController.getAllBookings);
router.get("/:id", bookingController.getBookingById);
router.put("/:id", validateRequest(updateBookingSchema), bookingController.updateBooking);
router.delete("/:id", bookingController.deleteBooking);

router.post("/details", validateRequest(createBookingDetailSchema), bookingController.createBookingDetail);
router.get("/details", bookingController.getBookingDetails);
router.get("/details/:booking_id", bookingController.getBookingDetailsByBookingId);
router.put("/details/:booking_detail_id", validateRequest(updateBookingStatusSchema), bookingController.updateBookingStatus);
router.delete("/details/:booking_detail_id", bookingController.deleteBookingDetail);

module.exports = router;
