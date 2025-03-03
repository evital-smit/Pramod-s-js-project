const Joi = require('joi');

const flightSchema = Joi.object({
    airline: Joi.string().min(2).max(50).required().messages({
        "string.base": "Airline must be a string.",
        "string.min": "Airline must have at least 2 characters.",
        "string.max": "Airline can have at most 50 characters.",
        "any.required": "Airline is required."
    }),
    flight_number: Joi.string().alphanum().min(3).max(10).required().messages({
        "string.alphanum": "Flight number must be alphanumeric.",
        "string.min": "Flight number must have at least 3 characters.",
        "string.max": "Flight number can have at most 10 characters.",
        "any.required": "Flight number is required."
    }),
    total_seats: Joi.number().integer().min(10).max(500).required().messages({
        "number.base": "Total seats must be a number.",
        "number.integer": "Total seats must be an integer.",
        "number.min": "Total seats must be at least 10.",
        "number.max": "Total seats cannot exceed 500.",
        "any.required": "Total seats are required."
    })
});

module.exports = {
    createFlightSchema: flightSchema,
    updateFlightSchema: flightSchema
};
