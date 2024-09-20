import { NextResponse } from 'next/server';
import { calculateKellyStake, calculateValue } from './calculateValue';

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
