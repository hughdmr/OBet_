export const calculateKellyStake = (kellyOdd: number, kellyFOdd: number): number => {
    if (kellyOdd <= 1 || kellyFOdd <= 1) {
      throw new Error('Odds must be greater than 1.');
    }
    return parseFloat(
      (100 * (1 / kellyFOdd - (1 - 1 / kellyFOdd) / (kellyOdd - 1))).toFixed(2)
    );
  };
  
export const calculateValue = (kellyOdd: number, kellyFOdd: number): number => {
    if (kellyFOdd === 0) {
      throw new Error('Fair odd (kellyFOdd) cannot be zero.');
    }
    return parseFloat((100 * (kellyOdd / kellyFOdd) - 100).toFixed(2));
};