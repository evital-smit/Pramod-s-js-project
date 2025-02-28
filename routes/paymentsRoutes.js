const express = require('express');
const router = express.Router();
const paymentsController = require('../controllers/paymentsController')

router.post('/', paymentsController.createPayment);
router.get('/:payment_id', paymentsController.getPaymentById);
router.get('/user/:user_id', paymentsController.getPaymentsByUser);
router.put('/:payment_id', paymentsController.updatePaymentStatus);
router.delete('/:payment_id', paymentsController.deletePayment);

module.exports = router;
