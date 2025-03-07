import express from "express";
import { validate } from "../middlewares/validate.js";
import {
  processPayment,
  updatePayment,
  getPaymentInfo,
  getUserPaymentHistory,
} from "../controllers/paymentsController.js";
import {
  processPaymentValidationSchema,
  updatePaymentValidationSchema,
  getPaymentInfoValidationSchema,
  getUserPaymentHistoryValidationSchema,
} from "../validations/paymentValidation.js";

const router = express.Router();

router.post("/process", validate(processPaymentValidationSchema), processPayment);
router.patch("/:payment_id/update", validate(updatePaymentValidationSchema), updatePayment);
router.get("/:payment_id", validate(getPaymentInfoValidationSchema), getPaymentInfo);
router.get("/user/:user_id/history", validate(getUserPaymentHistoryValidationSchema), getUserPaymentHistory);

export default router;
