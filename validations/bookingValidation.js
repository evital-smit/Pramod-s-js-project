import Joi from "joi";

// Book Seats Validation
export const bookSeatsValidationSchema = Joi.object({
  booking_id: Joi.number().integer().positive().required().messages({
    "number.base": "Booking ID must be a number",
    "number.integer": "Booking ID must be an integer",
    "number.positive": "Booking ID must be a positive number",
    "any.required": "Booking ID is required",
  }),
  passengers: Joi.array()
    .items(
      Joi.object({
        seat_id: Joi.number().integer().positive().required(),
        passenger_name: Joi.string().trim().required(),
        age: Joi.number().integer().min(1).required(),
        gender: Joi.string().valid("Male", "Female", "Other").required(),
        relation: Joi.string().trim().required(),
      })
    )
    .min(1)
    .required()
    .messages({
      "array.min": "At least one passenger is required",
      "any.required": "Passengers data is required",
    }),
});

// Get Booking Details Validation
export const getBookingDetailsValidationSchema = Joi.object({
  booking_id: Joi.number().integer().positive().required().messages({
    "number.base": "Booking ID must be a number",
    "number.integer": "Booking ID must be an integer",
    "number.positive": "Booking ID must be a positive number",
    "any.required": "Booking ID is required",
  }),
});

// Cancel Booking Validation
export const cancelBookingValidationSchema = Joi.object({
  booking_id: Joi.number().integer().positive().required().messages({
    "number.base": "Booking ID must be a number",
    "number.integer": "Booking ID must be an integer",
    "number.positive": "Booking ID must be a positive number",
    "any.required": "Booking ID is required",
  }),
});

// Cancel Specific Seats Validation
export const cancelSeatsValidationSchema = Joi.object({
  booking_id: Joi.number().integer().positive().required(),
  seat_ids: Joi.array().items(Joi.number().integer().positive().required()).min(1).required(),
}).messages({
  "array.min": "At least one seat ID is required",
  "any.required": "Seat IDs are required",
});

// Payment Processing Validation
export const processPaymentValidationSchema = Joi.object({
  booking_id: Joi.number().integer().positive().required(),
  user_id: Joi.number().integer().positive().required(),
  amount: Joi.number().positive().required(),
}).messages({
  "number.positive": "Amount must be a positive number",
});

// Modify Booking Validation
export const modifyBookingValidationSchema = Joi.object({
  booking_id: Joi.number().integer().positive().required(),
  old_seats: Joi.array().items(Joi.number().integer().positive().required()).min(1).required(),
  new_seats: Joi.array().items(Joi.number().integer().positive().required()).min(1).required(),
}).messages({
  "array.min": "At least one seat ID must be provided",
});

// Get User Bookings Validation
export const getUserBookingsValidationSchema = Joi.object({
  user_id: Joi.number().integer().positive().required().messages({
    "number.base": "User ID must be a number",
    "number.integer": "User ID must be an integer",
    "number.positive": "User ID must be a positive number",
    "any.required": "User ID is required",
  }),
});
