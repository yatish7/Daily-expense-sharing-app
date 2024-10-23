const express = require('express');
const { body, validationResult } = require('express-validator');
const mongoose = require('mongoose');  // Add mongoose to use ObjectId conversion
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
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { creator, amount, description, splitMethod, participants } = req.body;

    try {
      // Convert the creator and participants.user to ObjectId using 'new'
      const creatorId = new mongoose.Types.ObjectId(creator);  // Convert creator to ObjectId
      const participantsWithObjectIds = participants.map(participant => ({
        ...participant,
        user: new mongoose.Types.ObjectId(participant.user) // Convert each user in participants to ObjectId
      }));

      // Validate split method and participants
      validateSplit(splitMethod, participantsWithObjectIds);

      // Calculate the split amounts based on the method
      const calculatedParticipants = calculateSplit(splitMethod, amount, participantsWithObjectIds);

      // Create and save the new expense
      const expense = new Expense({
        creator: creatorId,
        amount,
        description,
        splitMethod,
        participants: calculatedParticipants,
      });

      await expense.save();
      res.status(201).json(expense);
    } catch (error) {
      console.error('MongoDB error:', error); // Log the full MongoDB error
      res.status(500).json({ error: error.message }); // Return the full error message
    }
  }
);

// Balance Sheet Route
router.get('/balance-sheet/:userId', async (req, res) => {
  const userId = req.params.userId;

  try {
    // Fetch all expenses that include the user
    const expenses = await Expense.find({ 
      'participants.user': new mongoose.Types.ObjectId(userId)
    });

    const balances = {};

    // Initialize balances for each participant
    expenses.forEach(expense => {
      expense.participants.forEach(participant => {
        const participantId = participant.user.toString();
        
        // Initialize balance if it doesn't exist
        if (!balances[participantId]) {
          balances[participantId] = {
            totalOwed: 0,
            totalPaid: 0,
          };
        }

        // Calculate total owed and total paid
        if (participantId === userId) {
          balances[participantId].totalOwed += participant.amountOwed;
        } else {
          balances[participantId].totalPaid += participant.amountOwed;
        }
      });
    });

    // Format the balance sheet output
    const balanceSheet = Object.keys(balances).map(id => {
      return {
        userId: id,
        totalOwed: balances[id].totalOwed,
        totalPaid: balances[id].totalPaid,
        balance: balances[id].totalPaid - balances[id].totalOwed,
      };
    });

    res.json(balanceSheet);
  } catch (error) {
    console.error('Error fetching balance sheet:', error);
    res.status(500).json({ error: error.message || 'Internal Server Error' });
  }
});

module.exports = router;
