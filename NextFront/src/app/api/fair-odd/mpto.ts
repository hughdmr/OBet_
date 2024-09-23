export const calculateMPTO = (odds: number[]): number[] => {
  const n = odds.length;
  if (n === 1) {
    return odds;
  }

  const reciprocalSum = odds.reduce((sum, odd) => sum + 1 / odd, 0) - 1;

  return odds.map(odd => (n * odd) / (n - reciprocalSum * odd));
};
