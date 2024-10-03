const calculateTRJValue = (odds: string[]) => {
    const sumInverse = odds.reduce((sum, odd) => sum + 1 / parseFloat(odd), 0);
    const trj = 100 / sumInverse;
    return trj.toFixed(1);
  }; 

const calculateTRJSurebet = (odds: string[]) => {
  const sumInverse = odds.reduce((sum, odd) => sum + 1 / parseFloat(odd || '1'), 0);
  const trj = 100 / sumInverse;
  return trj.toFixed(1);
};

export { calculateTRJValue, calculateTRJSurebet };