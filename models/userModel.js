import pool from "../config/db.js";
import bcrypt from "bcryptjs";

export const createUser = async (name, age, gender, email, password_hash, phone) => {
  const hashed_password = await bcrypt.hash(password_hash, 10);
  const result = await pool.query(
    `INSERT INTO Users (name, age, gender, email, password_hash, phone) VALUES ($1, $2, $3, $4, $5, $6) RETURNING user_id, name, email, phone`,
    [name, age, gender, email, hashed_password, phone]
  );
  return result.rows[0];
}; 

export const findUserByEmail = async (email) => {
  const result = await pool.query("SELECT * FROM Users WHERE email = $1", [email]);
  return result.rows.length > 0 ? result.rows[0] : null;
};

export const getUserById = async (userId) => {
  const result = await pool.query("SELECT user_id, name, email, phone FROM Users WHERE user_id = $1", [userId]);
  return result.rows.length > 0 ? result.rows[0] : null;
};

export const updateUser = async (userId, name, phone, password_hash) => {
  const hashed_password = password_hash ? await bcrypt.hash(password_hash, 10) : null;
  const result = await pool.query(
    `UPDATE Users SET name = COALESCE($1, name), phone = COALESCE($2, phone), password_hash = COALESCE($3, password_hash) WHERE user_id = $4 RETURNING user_id, name, email, phone`,
    [name, phone, hashed_password, userId]
  );
  return result.rows[0];
};

export const setResetToken = async (email, token, expiry) => {
  await pool.query("UPDATE Users SET reset_token = $1, reset_token_expiry = $2 WHERE email = $3", [token, expiry, email]);
};

export const getResetToken = async (email) => {
  const result = await pool.query("SELECT reset_token, reset_token_expiry FROM Users WHERE email = $1", [email]);
  return result.rows.length > 0 ? result.rows[0] : null;
};

export const resetUserPassword = async (email, new_password_hash) => {
  const hashed_password = await bcrypt.hash(new_password_hash, 10);
  await pool.query(
    "UPDATE Users SET password_hash = $1, reset_token = NULL, reset_token_expiry = NULL WHERE email = $2",
    [hashed_password, email]
  );
};
