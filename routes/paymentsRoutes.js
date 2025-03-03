const express = require('express');
const router = express.Router();
const authMiddleware = require('../middleware/authMiddleware');
const validateRequest = require('../middleware/validateRequest');
const paymentsController = require('../controllers/paymentsController');
const {
    createPaymentSchema,
    updatePaymentStatusSchema
} = require('../validations/paymentValidations');

router.use(authMiddleware);

router.post('/', validateRequest(createPaymentSchema), paymentsController.createPayment);
router.get('/:payment_id', paymentsController.getPaymentById);
router.get('/user/:user_id', paymentsController.getPaymentsByUser);
router.put('/:payment_id', validateRequest(updatePaymentStatusSchema), paymentsController.updatePaymentStatus);
router.delete('/:payment_id', paymentsController.deletePayment);

module.exports = router;
