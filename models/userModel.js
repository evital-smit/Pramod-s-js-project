const pool = require('../config/database');

const User = {
    create: async (name, age, gender, email, password_hash, phone) => {
        const result = await pool.query(
            "INSERT INTO Users (name, age, gender, email, password_hash, phone) VALUES ($1, $2, $3, $4, $5, $6) RETURNING *",
            [name, age, gender, email, password_hash, phone]
        );
        return result.rows[0];
    },

    findByEmail: async (email) => {
        const result = await pool.query(
            "SELECT * FROM Users WHERE email = $1",
            [email]
        );
        return result.rows[0];
    },

    updatePassword: async (user_id, newPassword) => {
        await pool.query('UPDATE users SET password = $1 WHERE user_id = $2', [newPassword, user_id]);
    },

    findById: async (user_id) => {
        const result = await pool.query(
            "SELECT user_id, name, age, gender, email, phone FROM Users WHERE user_id = $1",
            [user_id]
        );
        return result.rows[0];
    },

    updateUser: async (user_id, name, age, gender, phone) => {
        const result = await pool.query(
            "UPDATE Users SET name = $1, age = $2, gender = $3, phone = $4 WHERE user_id = $5 RETURNING *",
            [name, age, gender, phone, user_id]
        );
        return result.rows[0];
    },

    deleteUser: async (user_id) => {
        const result = await pool.query(
            "DELETE FROM Users WHERE user_id = $1 RETURNING *",
            [user_id]
        );
        return result.rows[0];
    }
};

module.exports = User;
