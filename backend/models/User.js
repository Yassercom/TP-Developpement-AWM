const db = require('../db');

const User = {
  // Create a new user
  async create(name, email, password) {
    try {
      const result = await db.query(
        'INSERT INTO users (name, email, password) VALUES ($1, $2, $3) RETURNING id, name, email, created_at',
        [name, email, password]
      );
      return result.rows[0];
    } catch (error) {
      throw error;
    }
  },

  // Find user by email
  async findByEmail(email) {
    try {
      const result = await db.query('SELECT * FROM users WHERE email = $1', [email]);
      return result.rows[0];
    } catch (error) {
      throw error;
    }
  },

  // Find user by ID
  async findById(id) {
    try {
      const result = await db.query('SELECT id, name, email, created_at FROM users WHERE id = $1', [id]);
      return result.rows[0];
    } catch (error) {
      throw error;
    }
  }
};

module.exports = User;
