const mongoose = require('mongoose');

const ExpenseSchema = new mongoose.Schema({
  creator: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  amount: { type: Number, required: true },
  description: { type: String },
  splitMethod: { type: String, enum: ['equal', 'exact', 'percentage'], required: true },
  participants: [{
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    amountOwed: { type: Number, required: true },
  }],
}, { timestamps: true });

module.exports = mongoose.model('Expense', ExpenseSchema);
