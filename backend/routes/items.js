const express = require('express');
const { body, param } = require('express-validator');
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
router.get('/:id', [param('id').isInt().withMessage('ID must be an integer')], itemsController.getItemById);

// @route   POST /api/items
// @desc    Create a new item
// @access  Private
router.post(
  '/',
  [
    body('title').trim().notEmpty().withMessage('Title is required'),
    body('description').optional().trim().isString()
  ],
  itemsController.createItem
);

// @route   PUT /api/items/:id
// @desc    Update an item
// @access  Private
router.put(
  '/:id',
  [
    param('id').isInt().withMessage('ID must be an integer'),
    body('title').trim().notEmpty().withMessage('Title is required'),
    body('description').optional().trim().isString()
  ],
  itemsController.updateItem
);

// @route   DELETE /api/items/:id
// @desc    Delete an item
// @access  Private
router.delete('/:id', [param('id').isInt().withMessage('ID must be an integer')], itemsController.deleteItem);

module.exports = router;
