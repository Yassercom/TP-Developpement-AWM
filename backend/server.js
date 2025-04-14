const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const path = require('path');

// Load environment variables
dotenv.config();

// Initialize Express app
const app = express();

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Test route for POST requests
app.post('/test', (req, res) => {
  console.log('POST request received:', req.body);
  res.json({ message: 'POST request received', data: req.body });
});

// Define routes
app.use('/api/auth', require('./routes/auth'));
app.use('/api/items', require('./routes/items'));

// Basic route for testing
app.get('/', (req, res) => {
  res.json({ message: 'Welcome to the CRUD API' });
});

// Set port and start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});