// Function to calculate how much each participant owes based on the split method
const calculateSplit = (splitMethod, amount, participants) => {
  switch (splitMethod) {
    
    // Equal Split: Divide the total amount equally among all participants
    case 'equal':
      const equalSplitAmount = amount / participants.length;
      return participants.map(participant => ({
        user: participant.user,  // User ID or reference
        amountOwed: equalSplitAmount  // Amount each participant owes
      }));
    
    // Exact Split: Use the specific amount provided by each participant
    case 'exact':
      return participants.map(participant => ({
        user: participant.user,  // User ID or reference
        amountOwed: participant.amountOwed  // Exact amount owed by each participant (this field should be provided in the request)
      }));
      
    // Percentage Split: Calculate based on the percentage provided by each participant
    case 'percentage':
      return participants.map(participant => ({
        user: participant.user,  // User ID or reference
        amountOwed: (participant.percentage / 100) * amount  // Calculate amount based on the percentage
      }));
      
    // Default case: If an invalid split method is provided
    default:
      throw new Error('Invalid split method.');
  }
};

// Exporting calculateSplit for use in other files
module.exports = { calculateSplit };