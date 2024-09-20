import { NextResponse } from 'next/server';
import { calculateStake } from './calculateStake';

export async function POST(req: Request) {
  try {
    const body = await req.json();
    console.log('Received request body:', body);

    if (!body || !Array.isArray(body.odds) || !Array.isArray(body.stakes) || typeof body.selectedRadio !== 'number' || !Array.isArray(body.shareChecked)) {
      console.log('Validation failed for body:', body);
      return NextResponse.json(
        { error: 'Invalid input. Please provide valid odds, stakes, selectedRadio, and shareChecked.' },
        { status: 400 }
      );
    }

    const { odds, stakes, selectedRadio, shareChecked } = body;

    const oddsNumbers = odds.map((odd: string) => parseFloat(odd));
    const stakesNumbers = stakes.map((stake: string) => parseFloat(stake));
    const calculatedStakes = calculateStake(oddsNumbers, stakesNumbers, selectedRadio, shareChecked);
    console.log('Calculated stakes:', calculatedStakes);

    const formattedStakes = calculatedStakes.map(stake => 
      isNaN(stake) ? 'NaN' : parseFloat(stake.toFixed(2))
    );

    return NextResponse.json({ stakes: formattedStakes }, { status: 200 });
  } catch (error) {
    console.error('Error processing request:', error);
    return NextResponse.json(
      { error: 'An error occurred while processing your request.' },
      { status: 500 }
    );
  }
}
