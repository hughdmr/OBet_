export const calculateMultiplication = (data: { odds: string[][] }) => {
    console.log('Input data for calculation:', data);
    const odds = data.odds.map((row: string[]) => parseFloat(row[0]));
    console.log('Parsed odd1 values:', odds);
    if (odds.some(isNaN)) {
      console.log('Invalid odds detected:', odds);
      return { result: '0.00', details: 'Some odds are invalid.' };
    }
    if (odds.length === 0) {
      console.log('No valid odds to calculate.');
      return { result: '0.00', details: 'No valid odds to calculate.' };
    }
    const combinedProbability = odds.reduce((acc, curr) => acc * curr, 1).toFixed(2);
    const combinedOdd = parseFloat(combinedProbability).toFixed(2);
    console.log('Calculation result (Combined Odd):', combinedOdd);
    const oddsLaTeX = odds.map((odd, idx) => `P(M_{${idx + 1}})`).join(' \\times ');
    const oddsValuesLaTeX = odds.map(odd => `\\frac{1}{${odd.toFixed(2)}}`).join(' \\times ');
    const details = `
      \\text{Odd(Combined)} = \\frac{1}{P(\\text{Combined})} = 
      \\left[ ${oddsLaTeX} \\right]^{-1} = 
      \\left[ ${oddsValuesLaTeX} \\right]^{-1} = ${combinedOdd}
    `;
    const resultLaTeX = `\\text{Combined Odd} = ${combinedOdd}`;
    console.log('Calculation details:', details);
    return { result: resultLaTeX, details };
  };