const calculateSplit = (splitMethod, amount, participants) => {
  switch (splitMethod) {
    case 'equal':
      const equalSplitAmount = amount / participants.length;
      return participants.map(participant => ({
        user: participant.user,
        amountOwed: equalSplitAmount
      }));
    
    case 'exact':
      return participants.map(participant => ({
        user: participant.user,
        amountOwed: participant.amountOwed // Ensure participants include this field
      }));
      
    case 'percentage':
      return participants.map(participant => ({
        user: participant.user,
        amountOwed: (participant.percentage / 100) * amount // Ensure participants include this field
      }));
      
    default:
      throw new Error('Invalid split method.');
  }
};

module.exports = { calculateSplit };
