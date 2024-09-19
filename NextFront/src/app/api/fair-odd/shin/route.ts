import { NextResponse } from 'next/server';

export async function POST(req: Request) {
    try {
      console.log('hey')
    } catch (error) {
        console.log(error)
        return NextResponse.json(
          { error: 'An error occurred while processing your request.' },
          { status: 500 }
        );
      }
}  