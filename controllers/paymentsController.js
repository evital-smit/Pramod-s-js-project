import { 
    createPayment, 
    updatePaymentStatus, 
    getPaymentDetails, 
    getUserPayments 
} from "../models/paymentsModel.js";

export const processPayment = async (req, res) => {
  const { booking_id, user_id, amount } = req.body;

  try {
    const newPayment = await createPayment(booking_id, user_id, amount, "PENDING");
    res.status(201).json({ message: "Payment initiated", payment: newPayment });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const updatePayment = async (req, res) => {
  const { payment_id } = req.params;
  const { payment_status } = req.body;

  try {
    const updatedPayment = await updatePaymentStatus(payment_id, payment_status);
    if (!updatedPayment) return res.status(404).json({ message: "Payment not found" });

    res.json({ message: "Payment status updated", payment: updatedPayment });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getPaymentInfo = async (req, res) => {
  const { payment_id } = req.params;

  try {
    const payment = await getPaymentDetails(payment_id);
    if (!payment) return res.status(404).json({ message: "Payment not found" });

    res.json({ payment });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getUserPaymentHistory = async (req, res) => {
  const { user_id } = req.params;

  try {
    const payments = await getUserPayments(user_id);
    res.json({ user_id, payments });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
