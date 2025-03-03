const Joi = require('joi');

const flightRouteSchema = Joi.object({
    flight_id: Joi.number().integer().required().messages({
        "number.base": "Flight ID must be a number.",
        "number.integer": "Flight ID must be an integer.",
        "any.required": "Flight ID is required."
    }),
    departure_city: Joi.string().min(2).max(50).required().messages({
        "string.base": "Departure city must be a string.",
        "string.min": "Departure city must have at least 2 characters.",
        "string.max": "Departure city can have at most 50 characters.",
        "any.required": "Departure city is required."
    }),
    arrival_city: Joi.string().min(2).max(50).required().messages({
        "string.base": "Arrival city must be a string.",
        "string.min": "Arrival city must have at least 2 characters.",
        "string.max": "Arrival city can have at most 50 characters.",
        "any.required": "Arrival city is required."
    }),
    departure_time: Joi.date().iso().required().messages({
        "date.base": "Departure time must be a valid date.",
        "date.iso": "Departure time must be in ISO format.",
        "any.required": "Departure time is required."
    }),
    arrival_time: Joi.date().iso().greater(Joi.ref('departure_time')).required().messages({
        "date.base": "Arrival time must be a valid date.",
        "date.iso": "Arrival time must be in ISO format.",
        "date.greater": "Arrival time must be after departure time.",
        "any.required": "Arrival time is required."
    }),
    base_price: Joi.number().min(1).required().messages({
        "number.base": "Base price must be a number.",
        "number.min": "Base price must be at least 1.",
        "any.required": "Base price is required."
    }),
    gst: Joi.number().min(0).max(100).required().messages({
        "number.base": "GST must be a number.",
        "number.min": "GST must be at least 0.",
        "number.max": "GST cannot exceed 100.",
        "any.required": "GST is required."
    })
});

module.exports = {
    createFlightRouteSchema: flightRouteSchema,
    updateFlightRouteSchema: flightRouteSchema
};
