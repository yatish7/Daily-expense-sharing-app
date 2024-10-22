const validateSplit = (splitMethod, participants) => {
  if (splitMethod === 'percentage') {
    const totalPercentage = participants.reduce((sum, participant) => sum + participant.percentage, 0);
    if (totalPercentage !== 100) {
      throw new Error('Percentages must add up to 100%.');
    }
  }
};

module.exports = { validateSplit };
