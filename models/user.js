const mongoose = require('mongoose');

// Regular expression for email validation
const emailRegex = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/;
// Regular expression for 10-digit mobile number validation
const mobileRegex = /^\d{10}$/;

const UserSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Name is required'],
    trim: true, // Trim whitespace
  },
  email: {
    type: String,
    required: [true, 'Email is required'],
    unique: true,
    match: [emailRegex, 'Please fill a valid email address'], // Validate email format
  },
  mobile: {
    type: String,
    required: [true, 'Mobile number is required'],
    unique: true,
    match: [mobileRegex, 'Please fill a valid mobile number'], // Validate mobile format
  },
});

// Export the User model
module.exports = mongoose.model('User', UserSchema);
