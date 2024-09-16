import { NextResponse } from 'next/server';

const calculateKellyStake = (kellyOdd: number, kellyFOdd: number): number => {
  if (kellyOdd <= 1 || kellyFOdd <= 1) {
    throw new Error('Odds must be greater than 1.');
  }
  return parseFloat(
    (100 * (1 / kellyFOdd - (1 - 1 / kellyFOdd) / (kellyOdd - 1))).toFixed(2)
  );
};

const calculateValue = (kellyOdd: number, kellyFOdd: number): number => {
  if (kellyFOdd === 0) {
    throw new Error('Fair odd (kellyFOdd) cannot be zero.');
  }
  return parseFloat((100 * (kellyOdd / kellyFOdd) - 100).toFixed(2));
};

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { KellyOdd, KellyFOdd } = body;

    if (typeof KellyOdd !== 'number' || typeof KellyFOdd !== 'number') {
      return NextResponse.json(
        { error: 'Invalid input. Please provide both KellyOdd and KellyFOdd as numbers.' },
        { status: 400 }
      );
    }

    const kellyStake = calculateKellyStake(KellyOdd, KellyFOdd);
    const calculatedValue = calculateValue(KellyOdd, KellyFOdd);

    console.log(`Kelly Stake: ${kellyStake}%`);
    console.log(`Calculated Value: ${calculatedValue}%`);

    return NextResponse.json(
      { kellyStake, calculatedValue },
      { status: 200 }
    );
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: 'An error occurred while processing your request.' },
      { status: 500 }
    );
  }
}
