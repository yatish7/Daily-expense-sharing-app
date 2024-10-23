const express = require('express');
const { body, validationResult } = require('express-validator');
const User = require('../models/User');

const router = express.Router();

// Create User
router.post('/',
  [
    // Validate email format
    body('email').isEmail().withMessage('Invalid email format.'),
    
    // Ensure the name is not empty
    body('name').notEmpty().withMessage('Name cannot be empty.'),
    
    // Validate mobile number format (can customize locale as needed)
    body('mobile').isMobilePhone('any').withMessage('Invalid mobile number format.'),
  ],
  async (req, res) => {
    // Check for validation errors
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { name, email, mobile } = req.body;

    try {
      // Check if a user with the given email already exists
      const existingUser = await User.findOne({ email });
      if (existingUser) {
        return res.status(400).json({ error: 'User with this email already exists.' });
      }

      // Create a new user instance
      const user = new User({ name, email, mobile });

      // Save the new user to the database
      await user.save();

      // Return the newly created user as a response
      res.status(201).json(user);
    } catch (error) {
      console.error('Error creating user:', error);  // Log the actual error
      res.status(500).json({ error: 'Error creating user' });
    }
  }
);

// Retrieve User Details by ID
router.get('/:userId', async (req, res) => {
  try {
    // Find the user by the provided userId
    const user = await User.findById(req.params.userId);
    
    // If the user is not found, return a 404 error
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    // Return the found user details as a response
    res.json(user);
  } catch (error) {
    console.error('Error fetching user:', error);  // Log the actual error
    res.status(500).json({ error: 'Error fetching user' });
  }
});

module.exports = router;
