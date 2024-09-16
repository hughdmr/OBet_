import { NextResponse } from 'next/server';

export const calculateSubtraction = (data: { odds: string[][] }) => {
    console.log('Input data for calculation:', data);
    
    const odds = data.odds.map((row: string[]) => parseFloat(row[0]));
    console.log('Parsed odds values:', odds);
    
    if (odds.some(isNaN)) {
        console.log('Invalid odds detected:', odds);
        return { result: '0.00', details: 'Some odds are invalid.' };
    }
    if (odds.length === 0) {
        console.log('No valid odds to calculate.');
        return { result: '0.00', details: 'No valid odds to calculate.' };
    }

    const reciprocals = odds.map(odd => 1 / odd);
    let result: number;

    if (reciprocals.length === 1) {
        // Only one odd, result is simply its reciprocal
        result = 1 / reciprocals[0];
    } else if (reciprocals.length === 2) {
        // Two odds, use the formula: 1 / ((1 / odd1) - (1 / odd2))
        const [reciprocal1, reciprocal2] = reciprocals;
        result = 1 / (reciprocal1 - reciprocal2);
    } else {
        // More than two odds
        const sumOfReciprocals = reciprocals.reduce((acc, curr) => acc - curr, 0);
        result = 1 / sumOfReciprocals;
    }

    const resultFormatted = result.toFixed(2);

    // LaTeX formatting for the reciprocals and calculation details
    const reciprocalsLaTeX = reciprocals.map((rec, idx) => `P(M_{${idx + 1}})`).join(' - ');
    const reciprocalsValuesLaTeX = reciprocals.map(rec => `\\frac{1}{${(1 / rec).toFixed(2)}}`).join(' - ');

    const details = 
      `\\text{Odd(Subtraction)} = \\frac{1}{P(\\text{Subtraction})} = 
      \\left[ ${reciprocalsLaTeX} \\right]^{-1} = 
      \\left[ ${reciprocalsValuesLaTeX} \\right]^{-1} = ${resultFormatted}`;

    console.log('Calculation details:', details);
    const resultLaTeX = `\\text{Subtraction Odd} = ${resultFormatted}`
    return { result: resultLaTeX, details };
};



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

        const { result, details } = calculateSubtraction(body);
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
