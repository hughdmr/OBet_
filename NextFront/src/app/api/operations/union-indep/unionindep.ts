export const calculateUnionIndependants = (data: { odds: string[][] }) => {
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

  const probabilities = odds.map(odd => 1 / odd);
  let unionProbability = probabilities[0];
  
  for (let i = 1; i < probabilities.length; i++) {
      const currentProbability = probabilities[i];
      unionProbability = unionProbability + currentProbability - (unionProbability * currentProbability);
  }

  const result = (1 / unionProbability).toFixed(2);
  const n = probabilities.length;
  const summationLaTeX = `\\sum_{k=2}^{${n}} (-1)^{k} \\sum_{1 \\leq i_1 < i_2 < \\cdots < i_k \\leq ${n}} P\\left(\\bigcap_{j=1}^k M_{i_j}\\right)`;

  const probabilitiesLaTeX = probabilities.map((prob, idx) => `P(M_{${idx + 1}})`).join(' + ');
  const details = 
    `\\text{Odd(Union)} = \\frac{1}{P(\\text{Union})} = \\left[ ${probabilitiesLaTeX} - ${summationLaTeX}\\right]^{-1} = ${result}`;

  console.log('Calculation details:', details);
  const resultLaTeX = `\\text{Multichance Fair Odd} = ${result}`
  return { result: resultLaTeX, details };
};