import Joi from "joi";

// Flight Search Validation
export const flightSearchValidationSchema = Joi.object({
  departure_city: Joi.string().trim().required().messages({
    "string.empty": "Departure city is required",
    "any.required": "Departure city is required",
  }),
  arrival_city: Joi.string().trim().required().messages({
    "string.empty": "Arrival city is required",
    "any.required": "Arrival city is required",
  }),
  date: Joi.date().iso().required().messages({
    "date.base": "Invalid date format",
    "any.required": "Date is required",
  }),
});

// Flight Details Validation
export const flightDetailsValidationSchema = Joi.object({
  flight_id: Joi.number().integer().positive().required().messages({
    "number.base": "Flight ID must be a number",
    "number.integer": "Flight ID must be an integer",
    "number.positive": "Flight ID must be a positive number",
    "any.required": "Flight ID is required",
  }),
});

// Flight Selection Validation
export const flightSelectionValidationSchema = Joi.object({
  flight_id: Joi.number().integer().positive().required().messages({
    "number.base": "Flight ID must be a number",
    "number.integer": "Flight ID must be an integer",
    "number.positive": "Flight ID must be a positive number",
    "any.required": "Flight ID is required",
  }),
});

// Flight Filtering Validation (Optional Fields)
export const flightFilterValidationSchema = Joi.object({
  airline: Joi.string().trim().optional(),
  min_price: Joi.number().positive().optional(),
  max_price: Joi.number().positive().optional(),
  departure_time: Joi.string().optional(),
  arrival_time: Joi.string().optional(),
}).messages({
  "number.positive": "Price must be a positive number",
});
