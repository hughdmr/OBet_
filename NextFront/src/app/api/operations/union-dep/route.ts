import { NextResponse } from 'next/server';

// export const calculateUnionDependants = (data: { odds: string[] }[], intersections: number[]) => {
//   const odds = data.map(item => parseFloat(item.odds[0]));
//   const probabilities = odds.map(odd => 1 / odd);
//   let unionProbability = probabilities[0];

//   for (let i = 1; i < probabilities.length; i++) {
//     const currentProbability = probabilities[i];
//     const intersectionProbability = intersections[i - 1];
//     unionProbability = unionProbability + currentProbability - intersectionProbability;
//   }

//   const result = (1 / unionProbability).toFixed(2);
//   const details = `P(Union) = ${probabilities.map((prob, idx) => `P(A${idx + 1})`).join(' + ')} - Somme[(1)^n*Intersection_n] = ${result}`;
//   return { result, details };
// };

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { odds, intersections } = body;

    if (!Array.isArray(odds) || odds.some(row => !Array.isArray(row) || row.some(isNaN)) || !Array.isArray(intersections)) {
      return NextResponse.json(
        { error: 'Invalid input. Please provide valid odds and intersections.' },
        { status: 400 }
      );
    }

    const result = { result: '', details: '' }
    return NextResponse.json({ result }, { status: 200 });
  } catch (error) {
    console.log(error);
    return NextResponse.json(
      { error: 'An error occurred while processing your request.' },
      { status: 500 }
    );
  }
}
