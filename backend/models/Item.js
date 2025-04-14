const db = require('../db');

const Item = {
  // Get all items for a specific user
  async getAllByUser(userId) {
    try {
      const result = await db.query(
        'SELECT * FROM items WHERE user_id = $1 ORDER BY created_at DESC',
        [userId]
      );
      return result.rows;
    } catch (error) {
      throw error;
    }
  },

  // Get a specific item by ID
  async getById(id, userId) {
    try {
      const result = await db.query(
        'SELECT * FROM items WHERE id = $1 AND user_id = $2',
        [id, userId]
      );
      return result.rows[0];
    } catch (error) {
      throw error;
    }
  },

  // Create a new item
  async create(title, description, userId) {
    try {
      const result = await db.query(
        'INSERT INTO items (title, description, user_id) VALUES ($1, $2, $3) RETURNING *',
        [title, description, userId]
      );
      return result.rows[0];
    } catch (error) {
      throw error;
    }
  },

  // Update an existing item
  async update(id, title, description, userId) {
    try {
      const result = await db.query(
        'UPDATE items SET title = $1, description = $2 WHERE id = $3 AND user_id = $4 RETURNING *',
        [title, description, id, userId]
      );
      return result.rows[0];
    } catch (error) {
      throw error;
    }
  },

  // Delete an item
  async delete(id, userId) {
    try {
      await db.query('DELETE FROM items WHERE id = $1 AND user_id = $2', [id, userId]);
      return { message: 'Item deleted successfully' };
    } catch (error) {
      throw error;
    }
  }
};

module.exports = Item;
