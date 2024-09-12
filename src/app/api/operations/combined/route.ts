import { NextResponse } from 'next/server';

export const calculateMultiplication = (data: { odds: string[][] }) => {
  console.log('Input data for calculation:', data);

  // Extract only the first odd (odd1) from each row
  const odds = data.odds.map((row: string[]) => parseFloat(row[0]));
  console.log('Parsed odd1 values:', odds);

  // Check for valid odds
  if (odds.some(isNaN)) {
    console.log('Invalid odds detected:', odds);
    return { result: '0.00', details: 'Some odds are invalid.' };
  }

  if (odds.length === 0) {
    console.log('No valid odds to calculate.');
    return { result: '0.00', details: 'No valid odds to calculate.' };
  }

  // Calculate the combined probability
  const combinedProbability = odds.reduce((acc, curr) => acc * curr, 1).toFixed(2);
  const combinedOdd = (1 / parseFloat(combinedProbability)).toFixed(2);
  console.log('Calculation result (Combined Odd):', combinedOdd);

  // Format the details as LaTeX
  const oddsLaTeX = odds.map((odd, idx) => `P(M_{${idx + 1}})`).join(' \\times ');
  const oddsValuesLaTeX = odds.map(odd => odd.toFixed(2)).join(' \\times ');
  const details = `
    \\text{Odd(Combined)} = \\frac{1}{P(\\text{Combined})} = 
    \\left[ ${oddsLaTeX} \\right]^{-1} = 
    \\left[ ${oddsValuesLaTeX} \\right]^{-1} = ${combinedOdd}
  `;

  console.log('Calculation details:', details);

  return { result: combinedOdd, details };
};

export async function POST(req: Request) {
  try {
    const body = await req.json();
    console.log('Received request body:', body);

    // Validate the body structure
    if (!body || !Array.isArray(body.odds) || body.odds.some((row: string[]) => !Array.isArray(row))) {
      console.log('Validation failed for body:', body);
      return NextResponse.json(
        { error: 'Invalid input. Please provide a valid array of odds.' },
        { status: 400 }
      );
    }

    // Call the function to calculate the result
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
