import { NextResponse } from 'next/server';
import { calculateEM } from './em';
import { calculateMPTO } from './mpto';

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { foType, odds } = body; // Extract foType from the body

    if (!Array.isArray(odds) || odds.some(row => !Array.isArray(row) || row.some(isNaN)) || odds.length < 1 || odds[0].length < 1) {
      return NextResponse.json(
        { error: 'Invalid input. Please provide a 2D array of odds where each row represents a match and each column represents an odd.' },
        { status: 400 }
      );
    }

    let fairOdds;

    if (foType === 'mpto') {
      fairOdds = odds.map(row => calculateMPTO(row)); // Perform MPTO calculation
    } else if (foType === 'em') {
      fairOdds = odds.map(row => calculateEM(row)); // Perform EM calculation
    } else {
      return NextResponse.json(
        { error: 'Invalid calculation type.' },
        { status: 400 }
      );
    }

    console.log('Calculated fair odds:', fairOdds);
    return NextResponse.json({ fairOdds }, { status: 200 });
  } catch (error) {
    console.error('Error in API:', error);
    return NextResponse.json(
      { error: 'An error occurred while processing your request.' },
      { status: 500 }
    );
  }
}
