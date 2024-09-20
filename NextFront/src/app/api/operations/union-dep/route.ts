import { NextResponse } from 'next/server';
import { calculateUnionDependants } from './uniondep';

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

    const result = calculateUnionDependants(odds, intersections);
    return NextResponse.json({ result }, { status: 200 });
  } catch (error) {
    console.log(error);
    return NextResponse.json(
      { error: 'An error occurred while processing your request.' },
      { status: 500 }
    );
  }
}
