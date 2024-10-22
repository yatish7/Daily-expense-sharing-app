const express = require('express');
const { body, validationResult } = require('express-validator');
const Expense = require('../models/Expense');
const { validateSplit } = require('../helpers/validations');
const { calculateSplit } = require('../helpers/splitCalculations');

const router = express.Router();

// Add Expense
router.post('/',
  [
    body('creator').notEmpty().withMessage('Creator ID is required.'),
    body('amount').isNumeric().withMessage('Amount must be a number.'),
    body('description').notEmpty().withMessage('Description is required.'),
    body('splitMethod').isIn(['equal', 'exact', 'percentage']).withMessage('Invalid split method.'),
    body('participants').isArray().withMessage('Participants must be an array.'),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) return res.status(400).json({ errors: errors.array() });

    const { creator, amount, description, splitMethod, participants } = req.body;

    // Validate split method and participants
    try {
      validateSplit(splitMethod, participants);
    } catch (error) {
      return res.status(400).json({ error: error.message });
    }

    try {
      // Calculate the split amounts based on the method
      const calculatedParticipants = calculateSplit(splitMethod, amount, participants);

      const expense = new Expense({
        creator,
        amount,
        description,
        splitMethod,
        participants: calculatedParticipants
      });

      await expense.save();
      res.status(201).json(expense);
    } catch (error) {
      res.status(500).json({ error: 'Error adding expense' });
    }
  }
);

// Retrieve individual user expenses
router.get('/:userId', async (req, res) => {
  try {
    const expenses = await Expense.find({ 'participants.user': req.params.userId });
    res.json(expenses);
  } catch (error) {
    res.status(500).json({ error: 'Error fetching expenses' });
  }
});

// Download balance sheet
router.get('/balance-sheet/:userId', async (req, res) => {
  // Your implementation for balance sheet download goes here
});

module.exports = router;
