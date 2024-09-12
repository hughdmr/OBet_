import { NextResponse } from 'next/server';

export const calculateMultiplication = (data: { odds: string[] }[]) => {
  const odds = data.map(item => parseFloat(item.odds[0]));
  const result = odds.reduce((acc, curr) => acc * curr, 1).toFixed(2);
  const details = `P(Combined) = ${odds.map((odd, idx) => `P(M${idx + 1})`).join(' x ')} = ${odds.map(odd => odd.toFixed(2)).join(' x ')} = ${result}`;
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

    const result = calculateMultiplication(odds);
    return NextResponse.json({ result }, { status: 200 });
  } catch (error) {
    console.log(error);
    return NextResponse.json(
      { error: 'An error occurred while processing your request.' },
      { status: 500 }
    );
  }
}
