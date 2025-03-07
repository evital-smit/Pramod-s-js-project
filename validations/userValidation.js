import Joi from "joi";

// User Registration Validation
export const validateUserRegister = (data) => {
  const schema = Joi.object({
    name: Joi.string().min(2).max(50).required(),
    age: Joi.number().integer().min(1).max(120).required(),
    gender: Joi.string().valid("Male", "Female", "Other").required(),
    email: Joi.string().email().required(),
    password_hash: Joi.string().min(6).required(),
    phone: Joi.string().pattern(/^[0-9]{10}$/).required(),
  });

  return schema.validate(data, { abortEarly: false });
};

// User Login Validation
export const validateUserLogin = (data) => {
  const schema = Joi.object({
    email: Joi.string().email().required(),
    password_hash: Joi.string().min(6).required(), 
  });

  return schema.validate(data, { abortEarly: false });
};

// Reset Password Validation
export const validateResetPassword = (data) => {
  const schema = Joi.object({
    email: Joi.string().email().required(),
    otp: Joi.string().length(6).pattern(/^\d{6}$/).required(), 
    new_Password_hash: Joi.string().min(6).required(),
  });

  return schema.validate(data, { abortEarly: false });
};
