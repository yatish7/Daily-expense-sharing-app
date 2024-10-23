const mongoose = require('mongoose');

// Define regular expression for email validation
const emailRegex = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/;

// Define regular expression for 10-digit mobile number validation
const mobileRegex = /^\d{10}$/;

// Define the schema for storing user details
const UserSchema = new mongoose.Schema({
  
  // User's name
  name: {
    type: String,
    required: [true, 'Name is required'],  // Validation with error message
    trim: true,  // Removes whitespace around the name
  },
  
  // User's email (must be unique)
  email: {
    type: String,
    required: [true, 'Email is required'],  // Validation with error message
    unique: true,  // Ensures that no two users have the same email
    match: [emailRegex, 'Please fill a valid email address'],  // Validates against regex
  },
  
  // User's mobile number (must be unique)
  mobile: {
    type: String,
    required: [true, 'Mobile number is required'],  // Validation with error message
    unique: true,  // Ensures that no two users have the same mobile number
    match: [mobileRegex, 'Please fill a valid mobile number'],  // Validates against regex
  },
  
});

// Export the User model for use in other parts of the app
module.exports = mongoose.model('User', UserSchema);
