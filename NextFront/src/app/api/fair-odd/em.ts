export const calculateEM = (odds: number[]): number[] => {
    const n = odds.length;
    if (n === 1) {
      return odds;
    }
  
    const reciprocalSum = odds.reduce((sum, odd) => sum + 1 / odd, 0);
  
    return odds.map(odd =>
      parseFloat((odd * (reciprocalSum)).toFixed(2))
    );
  };  