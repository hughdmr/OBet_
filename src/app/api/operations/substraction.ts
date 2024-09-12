import { NextResponse } from 'next/server';

export const calculateSubtraction = (data: { odds: string[] }[]) => {
  const odds = data.map(item => parseFloat(item.odds[0]));
  const reciprocals = odds.map(odd => 1 / odd);
  let result: number;
  if (reciprocals.length === 1) {
    result = 1 / reciprocals[0];
  } else {
    const sumOfReciprocals = reciprocals.reduce((acc, curr) => acc - curr, 0);
    result = 1 / sumOfReciprocals;
  }
  const details = `P(Substraction) = ${reciprocals.map((rec, idx) => `P(M${idx + 1})`).join(' - ')} = ${reciprocals.map(rec => rec.toFixed(2)).join(' - ')} = ${result.toFixed(2)}`;
  return { result: result.toFixed(2), details };
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

    const result = calculateSubtraction(odds);
    return NextResponse.json({ result }, { status: 200 });
  } catch (error) {
    console.log(error);
    return NextResponse.json(
      { error: 'An error occurred while processing your request.' },
      { status: 500 }
    );
  }
}
