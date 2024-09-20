
export const calculateSubtraction = (data: { odds: string[][] }) => {
    console.log('Input data for calculation:', data);
    
    const odds = data.odds.map((row: string[]) => parseFloat(row[0]));
    console.log('Parsed odds values:', odds);
    
    if (odds.some(isNaN)) {
        console.log('Invalid odds detected:', odds);
        return { result: '0.00', details: 'Some odds are invalid.' };
    }
    if (odds.length === 0) {
        console.log('No valid odds to calculate.');
        return { result: '0.00', details: 'No valid odds to calculate.' };
    }

    const reciprocals = odds.map(odd => 1 / odd);
    let result: number;

    if (reciprocals.length === 1) {
        result = 1 / reciprocals[0];
    } else if (reciprocals.length === 2) {
        const [reciprocal1, reciprocal2] = reciprocals;
        result = 1 / (reciprocal1 - reciprocal2);
    } else {
        const sumOfReciprocals = reciprocals.reduce((acc, curr) => acc - curr, 0);
        result = 1 / sumOfReciprocals;
    }

    const resultFormatted = result.toFixed(2);

    const reciprocalsLaTeX = reciprocals.map((rec, idx) => `P(M_{${idx + 1}})`).join(' - ');
    const reciprocalsValuesLaTeX = reciprocals.map(rec => `\\frac{1}{${(1 / rec).toFixed(2)}}`).join(' - ');

    const details = 
      `\\text{Odd(Subtraction)} = \\frac{1}{P(\\text{Subtraction})} = 
      \\left[ ${reciprocalsLaTeX} \\right]^{-1} = 
      \\left[ ${reciprocalsValuesLaTeX} \\right]^{-1} = ${resultFormatted}`;

    console.log('Calculation details:', details);
    const resultLaTeX = `\\text{Subtraction Odd} = ${resultFormatted}`
    return { result: resultLaTeX, details };
};

