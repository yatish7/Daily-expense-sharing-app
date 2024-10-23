// Import required modules
const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');

// Load environment variables from .env file
dotenv.config();

// Import routes
const userRoutes = require('./routes/user');  // Routes for user-related operations
const expenseRoutes = require('./routes/expense');  // Routes for expense-related operations

// Initialize express app
const app = express();

// Middleware to parse incoming JSON requests
app.use(express.json());

// MongoDB connection setup
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log('MongoDB connected successfully'))  // Success message upon connection
  .catch(err => console.error('MongoDB connection error:', err));  // Error handling for connection issues

// Define API routes
app.use('/api/user', userRoutes);  // Routes for user management
app.use('/api/expense', expenseRoutes);  // Routes for managing expenses

// Start the server and listen on the designated port
const PORT = process.env.PORT || 9000;  // Use port from environment variables or default to 9000
app.listen(PORT, () => console.log(`Server is running on port ${PORT}`));  // Confirmation of server startup
