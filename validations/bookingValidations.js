const Joi = require("joi");

const allowedBookingStatuses = ["CONFIRMED", "CANCELLED"];

const createBookingSchema = Joi.object({
    user_id: Joi.number().integer().required().messages({
        "any.required": "User ID is required.",
        "number.base": "User ID must be a number."
    }),
    flight_id: Joi.number().integer().required().messages({
        "any.required": "Flight ID is required.",
        "number.base": "Flight ID must be a number."
    }),
    booking_status: Joi.string()
        .valid(...allowedBookingStatuses)
        .required()
        .messages({
            "any.required": "Booking status is required.",
            "string.base": "Booking status must be a string.",
            "any.only": `Booking status must be one of ${allowedBookingStatuses.join(", ")}.`
        })
});

const updateBookingSchema = Joi.object({
    booking_status: Joi.string()
        .valid(...allowedBookingStatuses)
        .required()
        .messages({
            "any.required": "Booking status is required.",
            "string.base": "Booking status must be a string.",
            "any.only": `Booking status must be one of ${allowedBookingStatuses.join(", ")}.`
        })
});

module.exports = { createBookingSchema, updateBookingSchema };
