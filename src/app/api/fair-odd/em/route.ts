import { NextResponse } from 'next/server';

const calculateEM = (odds: number[]): number[] => {
    const n = odds.length;
    if (n === 1) {
      return odds; // If there is only one odd, return it unchanged
    }
  
    // Calculate the sum of reciprocals
    const reciprocalSum = odds.reduce((sum, odd) => sum + 1 / odd, 0);
  
    // Apply the formula to each odd
    return odds.map(odd =>
      parseFloat((odd * (reciprocalSum)).toFixed(2))
    );
  };  

export async function POST(req: Request) {
  try {
    console.log('hey')
    const body = await req.json();
    const { odds } = body;

    if (!Array.isArray(odds) || odds.some(row => !Array.isArray(row) || row.some(isNaN)) || odds.length < 1 || odds[0].length < 1) {
      return NextResponse.json(
        { error: 'Invalid input. Please provide a 2D array of odds where each row represents a match and each column represents an odd.' },
        { status: 400 }
      );
    }

    const fairOdds = odds.map(row => calculateEM(row));
    console.log('calculated')

    return NextResponse.json({ fairOdds }, { status: 200 });
  } catch (error) {
    console.log(error)
    return NextResponse.json(
      { error: 'An error occurred while processing your request.' },
      { status: 500 }
    );
  }
}
