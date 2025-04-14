const Item = require('../models/Item');

// Get all items for the authenticated user
exports.getAllItems = async (req, res) => {
  try {
    const items = await Item.getAllByUser(req.user.id);
    res.json(items);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
};

// Get a specific item by ID
exports.getItemById = async (req, res) => {
  try {
    const item = await Item.getById(req.params.id, req.user.id);
    
    if (!item) {
      return res.status(404).json({ msg: 'Item not found' });
    }
    
    res.json(item);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
};

// Create a new item
exports.createItem = async (req, res) => {
  const { title, description } = req.body;
  
  try {
    const newItem = await Item.create(title, description, req.user.id);
    res.json(newItem);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
};

// Update an existing item
exports.updateItem = async (req, res) => {
  const { title, description } = req.body;
  
  try {
    let item = await Item.getById(req.params.id, req.user.id);
    
    if (!item) {
      return res.status(404).json({ msg: 'Item not found' });
    }
    
    // Update item
    item = await Item.update(req.params.id, title, description, req.user.id);
    
    res.json(item);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
};

// Delete an item
exports.deleteItem = async (req, res) => {
  try {
    let item = await Item.getById(req.params.id, req.user.id);
    
    if (!item) {
      return res.status(404).json({ msg: 'Item not found' });
    }
    
    // Delete item
    await Item.delete(req.params.id, req.user.id);
    
    res.json({ msg: 'Item removed' });
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
};
