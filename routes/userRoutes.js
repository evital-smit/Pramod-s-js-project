const express = require("express");
const router = express.Router();
const authMiddleware = require("../middleware/authMiddleware");
const validateRequest = require("../middleware/validateRequest");
const userController = require("../controllers/userController");
const {
    registerSchema,
    loginSchema,
    forgotPasswordSchema,
    resetPasswordSchema,
    updateUserSchema,
    deleteUserSchema
} = require("../validations/userValidations");

router.post("/register", validateRequest(registerSchema), userController.register);
router.post("/login", validateRequest(loginSchema), userController.login);
router.post("/forgot-password", validateRequest(forgotPasswordSchema), userController.forgotPassword);
router.post("/reset-password", validateRequest(resetPasswordSchema), userController.resetPassword);

router.use(authMiddleware);

router.get("/:id", userController.getUser);
router.put("/", validateRequest(updateUserSchema), userController.updateUser);
router.delete("/", validateRequest(deleteUserSchema), userController.deleteUser);

module.exports = router;
