export const calculateMultiplication = (data: { odds: string[] }[]) => {
    const odds = data.map(item => parseFloat(item.odds[0]));
    const result = odds.reduce((acc, curr) => acc * curr, 1).toFixed(2);
    const details = `P(Combined) = ${odds.map((odd, idx) => `P(M${idx + 1})`).join(' x ')} = ${odds.map(odd => odd.toFixed(2)).join(' x ')} = ${result}`;
    return { result, details };
};

export const calculateSubtraction = (data: { odds: string[] }[]) => {
    const odds = data.map(item => parseFloat(item.odds[0]));
    const reciprocals = odds.map(odd => 1 / odd);
    let result: number;
    if (reciprocals.length === 1) {
        result = (1 / reciprocals[0]);
    } else {
        const sumOfReciprocals = reciprocals.reduce((acc, curr) => acc - curr, 0);
        result = (1 / sumOfReciprocals);
    }
    const details = `P(Substraction) = ${reciprocals.map((rec, idx) => `P(M${idx + 1})`).join(' - ')} = ${reciprocals.map(rec => rec.toFixed(2)).join(' - ')} = ${result.toFixed(2)}`;
    return { result: result.toFixed(2), details };
};

export const calculateUnion = (
    eventsRelation: string | null,
    data: { odds: string[] }[],
    intersections: number[]
) => {
    const odds = data.map(item => parseFloat(item.odds[0]));
    const probabilities = odds.map(odd => 1 / odd);
    let unionProbability: number;

    if (eventsRelation === 'independants') {
        unionProbability = probabilities[0];
        for (let i = 1; i < probabilities.length; i++) {
            const currentProbability = probabilities[i];
            unionProbability = unionProbability + currentProbability - (unionProbability * currentProbability);
        }
        const result = (1 / unionProbability).toFixed(2);
        const details = `P(Union) = ${probabilities.map((prob, idx) => `P(A${idx + 1})`).join(' + ')} - Somme[(1)^n*Intersection_n] = ${result}`;
        return { result, details };
    }

    if (eventsRelation === 'dependants') {
        unionProbability = probabilities[0];
        for (let i = 1; i < probabilities.length; i++) {
            const currentProbability = probabilities[i];
            const intersectionProbability = intersections[i - 1];
            unionProbability = unionProbability + currentProbability - intersectionProbability;
        }
        const result = (1 / unionProbability).toFixed(2);
        const details = `P(Union) = ${probabilities.map((prob, idx) => `P(A${idx + 1})`).join(' + ')} - Somme[(1)^n*Intersection_n] = ${result}`;
        return { result, details };
    }

    return { result: null, details: 'Invalid event relation' };
};
