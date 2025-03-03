const Joi = require('joi');

const paymentSchema = Joi.object({
    booking_id: Joi.number().integer().required().messages({
        'number.base': 'Booking ID must be a number',
        'any.required': 'Booking ID is required',
    }),
    user_id: Joi.number().integer().required().messages({
        'number.base': 'User ID must be a number',
        'any.required': 'User ID is required',
    }),
    amount: Joi.number().positive().required().messages({
        'number.base': 'Amount must be a valid number',
        'number.positive': 'Amount must be greater than zero',
        'any.required': 'Amount is required',
    }),
    payment_status: Joi.string().valid('PENDING', 'COMPLETED', 'FAILED', 'REFUNDED').required().messages({
        'any.only': 'Invalid payment status. Choose from PENDING, COMPLETED, FAILED, REFUNDED',
        'any.required': 'Payment status is required',
    }),
});

const paymentStatusSchema = Joi.object({
    payment_status: Joi.string().valid('PENDING', 'COMPLETED', 'FAILED', 'REFUNDED').required().messages({
        'any.only': 'Invalid payment status. Choose from PENDING, COMPLETED, FAILED, REFUNDED',
        'any.required': 'Payment status is required',
    }),
});

module.exports = {
    validatePayment: paymentSchema,
    validatePaymentStatus: paymentStatusSchema
};
