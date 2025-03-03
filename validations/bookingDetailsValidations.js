const Joi = require("joi");

const validGenders = ["Male", "Female", "Other"];
const validDetailStatuses = ["CONFIRMED", "CANCELLED"];

const createBookingDetailSchema = Joi.object({
    booking_id: Joi.number().integer().required().messages({
        "any.required": "Booking ID is required.",
        "number.base": "Booking ID must be a number."
    }),
    seat_id: Joi.number().integer().required().messages({
        "any.required": "Seat ID is required.",
        "number.base": "Seat ID must be a number."
    }),
    passenger_name: Joi.string().min(2).max(50).required().messages({
        "any.required": "Passenger name is required.",
        "string.base": "Passenger name must be a string.",
        "string.min": "Passenger name must have at least 2 characters.",
        "string.max": "Passenger name cannot exceed 50 characters."
    }),
    age: Joi.number().integer().min(0).max(120).required().messages({
        "any.required": "Age is required.",
        "number.base": "Age must be a number.",
        "number.min": "Age cannot be negative.",
        "number.max": "Age cannot exceed 120."
    }),
    gender: Joi.string().valid(...validGenders).required().messages({
        "any.required": "Gender is required.",
        "string.base": "Gender must be a string.",
        "any.only": `Gender must be one of ${validGenders.join(", ")}.`
    }),
    relation: Joi.string().max(50).allow("").messages({
        "string.base": "Relation must be a string.",
        "string.max": "Relation cannot exceed 50 characters."
    }),
    status: Joi.string().valid(...validDetailStatuses).optional().messages({
        "string.base": "Status must be a string.",
        "any.only": `Status must be one of ${validDetailStatuses.join(", ")}.`
    })
});

const updateBookingDetailSchema = Joi.object({
    status: Joi.string().valid(...validDetailStatuses).required().messages({
        "any.required": "Status is required.",
        "string.base": "Status must be a string.",
        "any.only": `Status must be one of ${validDetailStatuses.join(", ")}.`
    })
});

module.exports = { createBookingDetailSchema, updateBookingDetailSchema };
