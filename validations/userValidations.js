const Joi = require("joi");

const registerSchema = Joi.object({
    name: Joi.string().min(3).max(50).required(),
    age: Joi.number().integer().min(1).max(150).required(),
    gender: Joi.string().valid("Male", "Female", "Other").required(),
    email: Joi.string().email().required(),
    password_hash: Joi.string().min(6).required(),
    phone: Joi.string().pattern(/^[0-9]{10}$/).required()
});

const loginSchema = Joi.object({
    email: Joi.string().email().required(),
    password_hash: Joi.string().required()
});

const forgotPasswordSchema = Joi.object({
    email: Joi.string().email().required()
});

const resetPasswordSchema = Joi.object({
    token: Joi.string().required(),
    newPassword: Joi.string().min(6).required()
});

const updateUserSchema = Joi.object({
    name: Joi.string().min(3).max(50),
    age: Joi.number().integer().min(1).max(150),
    gender: Joi.string().valid("Male", "Female", "Other"),
    phone: Joi.string().pattern(/^[0-9]{10}$/)
});

const deleteUserSchema = Joi.object({
    user_id: Joi.number().required()
});

module.exports = {
    registerSchema,
    loginSchema,
    forgotPasswordSchema,
    resetPasswordSchema,
    updateUserSchema,
    deleteUserSchema
};
