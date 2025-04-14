const express = require('express');
const router = express.Router();
const itemsController = require('../controllers/itemsController');
const auth = require('../middleware/auth');

// All routes require authentication
router.use(auth);

// @route   GET /api/items
// @desc    Get all items for the authenticated user
// @access  Private
router.get('/', itemsController.getAllItems);

// @route   GET /api/items/:id
// @desc    Get item by ID
// @access  Private
router.get('/:id', itemsController.getItemById);

// @route   POST /api/items
// @desc    Create a new item
// @access  Private
router.post('/', itemsController.createItem);

// @route   PUT /api/items/:id
// @desc    Update an item
// @access  Private
router.put('/:id', itemsController.updateItem);

// @route   DELETE /api/items/:id
// @desc    Delete an item
// @access  Private
router.delete('/:id', itemsController.deleteItem);

module.exports = router;
