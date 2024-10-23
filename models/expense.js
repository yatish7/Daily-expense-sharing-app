const mongoose = require('mongoose');

// Define the schema for storing expenses
const ExpenseSchema = new mongoose.Schema({
  
  // Reference to the user who created the expense (creator)
  creator: { 
    type: mongoose.Schema.Types.ObjectId, 
    ref: 'User',  // Links to the User model
    required: true 
  },
  
  // The total amount of the expense
  amount: { 
    type: Number, 
    required: true 
  },
  
  // A brief description of the expense
  description: { 
    type: String 
  },
  
  // The method used to split the expense (equal, exact, or percentage)
  splitMethod: { 
    type: String, 
    enum: ['equal', 'exact', 'percentage'],  // Restricts the value to these options
    required: true 
  },
  
  // Array of participants involved in the expense
  participants: [{
    user: { 
      type: mongoose.Schema.Types.ObjectId, 
      ref: 'User',  // Links to the User model for each participant
      required: true 
    },
    
    // Amount owed by each participant
    amountOwed: { 
      type: Number, 
      required: true 
    },
  }],
  
}, { timestamps: true });  // Automatically adds createdAt and updatedAt timestamps

// Export the Expense model for use in other parts of the app
module.exports = mongoose.model('Expense', ExpenseSchema);
