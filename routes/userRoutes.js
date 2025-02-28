const express = require("express");
const router = express.Router();
const authMiddleware = require('../middleware/authMiddleware');
const userController = require('../controllers/userController');

router.post('/register', userController.register);
router.post('/forgot-password',userController.forgotPassword);
router.post('/reset-password/:token',userController.resetPassword);
router.post('/login', userController.login);
router.get('/:id', authMiddleware, userController.getUser);
router.put('/:id', authMiddleware, userController.updateUser);
router.delete('/:id', authMiddleware, userController.deleteUser);


module.exports = router;