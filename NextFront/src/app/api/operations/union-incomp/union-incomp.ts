export const calculateUnionIncompatibles = (data: { odds: string[][] }) => {
    console.log('Input data for calculation:', data);
    
    const odds: any = data.odds[0]//.map((row: string[]) => parseFloat(row[0]));
    console.log('odds', odds)
    if (odds.some(isNaN)) {
        console.log('Invalid odds detected:', odds);
        return { result: '0.00', details: 'Some odds are invalid.' };
    }

    if (odds.length === 0) {
        console.log('No valid odds to calculate.');
        return { result: '0.00', details: 'No valid odds to calculate.' };
    }

    const probabilities = odds.map((odd: any) => 1 / odd);
    console.log(probabilities)
    const totalProbability = probabilities.reduce((sum: any, prob: any) => sum + prob, 0);
    console.log(totalProbability)
    const result = (1 / totalProbability).toFixed(2);
    const n = probabilities.length;

    const probabilitiesLaTeX = probabilities.map((prob: any, idx: any) => `P(M_{${idx + 1}})`).join(' + ');
    const details = 
      `\\text{Odd(Union)} = \\frac{1}{P(\\text{Union})} = \\left[ ${probabilitiesLaTeX} \\right]^{-1} = ${result}`;
  
    console.log('Calculation details:', details);
    const resultLaTeX = `\\text{Multichance Fair Odd} = ${result}`;
    
    return { result: resultLaTeX, details };
};
