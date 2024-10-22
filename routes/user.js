const express = require('express');
const { body, validationResult } = require('express-validator');
const User = require('../models/User');

const router = express.Router();

// Create User
router.post('/',
  [
    body('email').isEmail().withMessage('Invalid email format.'),
    body('name').notEmpty().withMessage('Name cannot be empty.'),
    body('mobile').isMobilePhone('any').withMessage('Invalid mobile number format.'),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) return res.status(400).json({ errors: errors.array() });

    const { name, email, mobile } = req.body;

    try {
      // Check for existing user
      const existingUser = await User.findOne({ email });
      if (existingUser) {
        return res.status(400).json({ error: 'User with this email already exists.' });
      }

      // Create and save new user
      const user = new User({ name, email, mobile });
      await user.save();
      res.status(201).json(user);
    } catch (error) {
      res.status(500).json({ error: 'Error creating user' });
    }
  }
);

// Retrieve User Details
router.get('/:userId', async (req, res) => {
  try {
    const user = await User.findById(req.params.userId);
    if (!user) return res.status(404).json({ error: 'User not found' });
    res.json(user);
  } catch (error) {
    res.status(500).json({ error: 'Error fetching user' });
  }
});

module.exports = router;
