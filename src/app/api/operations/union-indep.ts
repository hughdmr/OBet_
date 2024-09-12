import { NextResponse } from 'next/server';

export const calculateUnionIndependants = (data: { odds: string[] }[]) => {
  const odds = data.map(item => parseFloat(item.odds[0]));
  const probabilities = odds.map(odd => 1 / odd);
  let unionProbability = probabilities[0];

  for (let i = 1; i < probabilities.length; i++) {
    const currentProbability = probabilities[i];
    unionProbability = unionProbability + currentProbability - (unionProbability * currentProbability);
  }

  const result = (1 / unionProbability).toFixed(2);
  const details = `P(Union) = ${probabilities.map((prob, idx) => `P(A${idx + 1})`).join(' + ')} - ${result}`;
  return { result, details };
};

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { odds } = body;

    if (!Array.isArray(odds) || odds.some(row => !Array.isArray(row) || row.some(isNaN))) {
      return NextResponse.json(
        { error: 'Invalid input. Please provide a valid array of odds.' },
        { status: 400 }
      );
    }

    const result = calculateUnionIndependants(odds);
    return NextResponse.json({ result }, { status: 200 });
  } catch (error) {
    console.log(error);
    return NextResponse.json(
      { error: 'An error occurred while processing your request.' },
      { status: 500 }
    );
  }
}
