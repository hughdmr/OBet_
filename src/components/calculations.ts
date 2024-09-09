// Fonction pour le calcul de la multiplication
export const calculateMultiplication = (data: { odds: string[] }[]) => {
    const odds = data.map(item => parseFloat(item.odds[0]));
    const product = odds.reduce((acc, curr) => acc * curr, 1).toFixed(2);
  
    const details = odds
      .map(odd => odd.toFixed(2))
      .join(' x ') + ` = ${product}`;
  
    return { result: product, details };
  };
  
  // Fonction pour le calcul de la soustraction
  export const calculateSubtraction = (data: { odds: string[] }[]) => {
    const odds = data.map(item => parseFloat(item.odds[0]));
    const reciprocals = odds.map(odd => 1 / odd);
    const sumOfReciprocals = reciprocals.reduce((acc, curr) => acc - curr, 0);
    const result = (1 / sumOfReciprocals).toFixed(2);
  
    const details = reciprocals
      .map(rec => rec.toFixed(2))
      .join(' - ') + ` = ${result}`;
  
    return { result, details };
  };
  
  // Fonction pour le calcul de l'union
  export const calculateUnion = (
    eventsRelation: string | null,
    data: { odds: string[] }[],
    intersections: number[]
  ) => {
    const odds = data.map(item => parseFloat(item.odds[0]));
    const probabilities = odds.map(odd => 1 / odd); // Probabilités des événements
  
    if (eventsRelation === 'independants') {
      let unionProbability = probabilities[0];
  
      for (let i = 1; i < probabilities.length; i++) {
        const currentProbability = probabilities[i];
        unionProbability = unionProbability + currentProbability - (unionProbability * currentProbability);
      }
  
      const result = (1 / unionProbability).toFixed(2);
  
      const details = `P(Union) = ${probabilities.map((prob, idx) => `P(A${idx + 1})`).join(' + ')} - Somme[(1)^n*Intersection_n] = ${result}`;
  
      return { result, details };
    }
  
    if (eventsRelation === 'dependants') {
      let unionProbability = probabilities[0];
  
      for (let i = 1; i < probabilities.length; i++) {
        const currentProbability = probabilities[i];
        const intersectionProbability = intersections[i - 1];
        unionProbability = unionProbability + currentProbability - intersectionProbability;
      }
  
      const result = (1 / unionProbability).toFixed(2);
  
      const details = `P(Union) = ${probabilities.map((prob, idx) => `P(A${idx + 1})`).join(' + ')} - Somme[(1)^n*Intersection_n] = ${result}`;
  
      return { result, details };
    }
  
    return { result: null, details: '' };
  };
  