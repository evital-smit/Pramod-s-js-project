import Joi from "joi";

// Process Payment Validation
export const processPaymentValidationSchema = Joi.object({
  booking_id: Joi.number().integer().positive().required(),
  user_id: Joi.number().integer().positive().required(),
  amount: Joi.number().positive().required(),
}).messages({
  "any.required": "All fields (booking_id, user_id, amount) are required",
  "number.positive": "Amount must be a positive value",
});

// Update Payment Status Validation
export const updatePaymentValidationSchema = Joi.object({
  payment_status: Joi.string().valid("PENDING", "COMPLETED", "FAILED", "REFUNDED").required(),
}).messages({
  "any.required": "Payment status is required",
  "any.only": "Payment status must be one of PENDING, COMPLETED, FAILED, or REFUNDED",
});

// Get Payment Info Validation
export const getPaymentInfoValidationSchema = Joi.object({
  payment_id: Joi.number().integer().positive().required(),
}).messages({
  "any.required": "Payment ID is required",
});

// Get User Payment History Validation
export const getUserPaymentHistoryValidationSchema = Joi.object({
  user_id: Joi.number().integer().positive().required(),
}).messages({
  "any.required": "User ID is required",
});
