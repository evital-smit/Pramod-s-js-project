const Joi = require("joi");

const validSeatClasses = ["Economy", "Business", "First Class"];

exports.createSeatSchema = Joi.object({
    flight_id: Joi.string().required().messages({
        "any.required": "Flight ID is required.",
        "string.empty": "Flight ID cannot be empty."
    }),
    seat_number: Joi.string().required().messages({
        "any.required": "Seat number is required.",
        "string.empty": "Seat number cannot be empty."
    }),
    seat_class: Joi.string()
        .valid(...validSeatClasses)
        .required()
        .messages({
            "any.required": "Seat class is required.",
            "any.only": `Seat class must be one of ${validSeatClasses.join(", ")}.`
        }),
    is_booked: Joi.boolean().default(false)
});

exports.getSeatsByFlightIdSchema = Joi.object({
    flight_id: Joi.string().required().messages({
        "any.required": "Flight ID is required.",
        "string.empty": "Flight ID cannot be empty."
    })
});

exports.updateSeatBookingStatusSchema = Joi.object({
    seat_id: Joi.string().required().messages({
        "any.required": "Seat ID is required.",
        "string.empty": "Seat ID cannot be empty."
    }),
    is_booked: Joi.boolean().required().messages({
        "any.required": "Booking status (true/false) is required."
    })
});

exports.deleteSeatSchema = Joi.object({
    seat_id: Joi.string().required().messages({
        "any.required": "Seat ID is required.",
        "string.empty": "Seat ID cannot be empty."
    })
});
