const validateSplit = (splitMethod, participants) => {
  
  // Validation for 'percentage' split method: Ensure that percentages sum up to 100%
  if (splitMethod === 'percentage') {
    const totalPercentage = participants.reduce((sum, participant) => sum + participant.percentage, 0);
    
    // Throw error if percentages don't sum up to 100%
    if (totalPercentage !== 100) {
      throw new Error('Percentages must add up to 100%.');
    }
  }
};

// Exporting validateSplit for use in other files
module.exports = { validateSplit };