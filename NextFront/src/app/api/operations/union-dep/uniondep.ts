export const calculateUnionDependants = (data: { odds: string[] }[], intersections: number[]) => {
  const odds = data.map(item => parseFloat(item.odds[0]));
  const probabilities = odds.map(odd => 1 / odd);
  let unionProbability = probabilities[0];

  for (let i = 1; i < probabilities.length; i++) {
    const currentProbability = probabilities[i];
    const intersectionProbability = intersections[i - 1];
    unionProbability = unionProbability + currentProbability - intersectionProbability;
  }

  const result = (1 / unionProbability).toFixed(2);
  const details = `P(Union) = ${probabilities.map((prob, idx) => `P(A${idx + 1})`).join(' + ')} - Somme[(1)^n*Intersection_n] = ${result}`;
  return { result, details };
};
