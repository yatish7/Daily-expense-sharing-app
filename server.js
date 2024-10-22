const express = require('express');
const mongoose = require('mongoose');
require('dotenv').config(); 

// Routes
const userRoutes = require('./routes/user.js');
const expenseRoutes = require('./routes/expense');

// Initialize the app
const app = express();

app.use(express.json()); 

mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log('MongoDB connected'))
  .catch(err => console.error('MongoDB connection error:', err));

// Use routes
app.use('/api/user', userRoutes);
app.use('/api/expense', expenseRoutes);


const PORT = process.env.PORT || 9000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
