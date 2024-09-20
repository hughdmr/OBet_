import { NextResponse } from 'next/server';
import { calculateMultiplication } from './combined';
  
export async function POST(req: Request) {
  try {
    const body = await req.json();
    console.log('Received request body:', body);

    if (!body || !Array.isArray(body.odds) || body.odds.some((row: string[]) => !Array.isArray(row))) {
      console.log('Validation failed for body:', body);
      return NextResponse.json(
        { error: 'Invalid input. Please provide a valid array of odds.' },
        { status: 400 }
      );
    }

    const { result, details } = calculateMultiplication(body);
    console.log('Calculation result and details:', { result, details });

    return NextResponse.json({ result, details }, { status: 200 });
  } catch (error) {
    console.error('Error processing request:', error);
    return NextResponse.json(
      { error: 'An error occurred while processing your request.' },
      { status: 500 }
    );
  }
}
