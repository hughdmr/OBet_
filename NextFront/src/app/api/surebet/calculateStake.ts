export const calculateStake = (odds: number[], stakes: number[], selectedRadio: number, shareChecked: boolean[]) => {
  const fixedOdd = odds[selectedRadio];
  const fixedStake = stakes[selectedRadio];

  const updatedStakes = stakes.map((stake, i) => {
    if (shareChecked[i]) {
      return (fixedOdd * fixedStake) / odds[i];
    }
    return stake;
  });
  console.log('updated stakes', updatedStakes);

  const sumStakesCheckedTrue = updatedStakes.reduce((sum, stake, i) => {
    if (shareChecked[i]) {
      return sum + stake;
    }
    return sum;
  }, 0);

  console.log('sum checked stake', sumStakesCheckedTrue);

  const finalStakes = updatedStakes.map((stake, i) => {
    if (!shareChecked[i]) {
      let sumOfOneDividedByOddUnchecked = 0;
      for (let j = 0; j < shareChecked.length; j++) {
        if (!shareChecked[j] && j !== i) {
          sumOfOneDividedByOddUnchecked += 1 / odds[j];
        }
      }
      
      const denominator = odds[i] * (1 - sumOfOneDividedByOddUnchecked) - 1;
      if (denominator === 0) {
        return NaN;
      }
      
      const calculatedStake = sumStakesCheckedTrue / denominator;
      return calculatedStake;
    }

    return stake;
  });

  console.log('final stake', finalStakes);

  return finalStakes;
};
