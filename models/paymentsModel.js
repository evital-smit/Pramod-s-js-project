import pool from "../config/db.js";

export const createPayment = async (booking_id, user_id, amount, payment_status) => {
  const result = await pool.query(
    `INSERT INTO Payment (booking_id, user_id, amount, payment_status, payment_date) 
     VALUES ($1, $2, $3, $4, NOW()) RETURNING *`,
    [booking_id, user_id, amount, payment_status]
  );
  return result.rows[0];
};

export const updatePaymentStatus = async (payment_id, payment_status) => {
  const result = await pool.query(
    `UPDATE Payment SET payment_status = $1 WHERE payment_id = $2 RETURNING *`,
    [payment_status, payment_id]
  );
  return result.rows[0];
};

export const getPaymentDetails = async (payment_id) => {
  const result = await pool.query(
    `SELECT * FROM Payment WHERE payment_id = $1`,
    [payment_id]
  );
  return result.rows[0];
};

export const getUserPayments = async (user_id) => {
  const result = await pool.query(
    `SELECT * FROM Payment WHERE user_id = $1 ORDER BY payment_date DESC`,
    [user_id]
  );
  return result.rows;
};
