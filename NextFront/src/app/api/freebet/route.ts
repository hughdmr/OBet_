import { NextResponse } from 'next/server';

const calculate_combinates = (list: number[][], nbr: number) => {
    let L:number[] = []
    if (nbr == 1) {
        for (let i=0; i<3; i++) {
            if (list[0][i]<=1) {
                throw new Error('Cotes should be > 1');
            }
            else {
                L.push(list[0][i])
            }
        }
    }
    if (nbr == 2) {
        for (let i=0; i<3; i++) {
            for (let j=0; j<3; j++) {
                    if (list[0][i]<=1 || list[1][j]<=1) {
                        throw new Error('Cotes should be > 1');
                    }
                    else {
                        L.push(list[0][i]*list[1][j])
                    }
            }
        }
    }
    if (nbr == 3) {
        for (let i=0; i<3; i++) {
            for (let j=0; j<3; j++) {
                for (let k=0; k<3; k++) {
                    if (list[0][i]<=1 || list[1][j]<=1 || list[2][k]<=1) {
                        throw new Error('Cotes should be > 1');
                    }
                    else {
                        L.push(list[0][i]*list[1][j]*list[2][k])
                    }
                }
            }
        }
    }
    if (nbr == 4) {
        for (let i=0; i<3; i++) {
            for (let j=0; j<3; j++) {
                for (let k=0; k<3; k++) {
                    for (let l=0; l<3; l++) {
                        if (list[0][i]<=1 || list[1][j]<=1 || list[2][k]<=1 || list[3][l]<=1) {
                            throw new Error('Cotes should be > 1');
                        }
                        else {
                            L.push(list[0][i]*list[1][j]*list[2][k]*list[3][l])
                        }
                    }
                }
            }
        }
    }
    return L
  };
    
const convert_inversed = (list: number[]) => {
    let L:number[] = []
    for (let i of list) {
        let inverted_value = 1/(i-1)
        L.push(inverted_value)
    }
    return L
}

export async function POST(req: Request) {
  try {
    const body = await req.json();
    var odds = body.map((obj:any) => obj.odds);

    const CombinedOdds = calculate_combinates(odds, odds.length)
    const InversedOdds = convert_inversed(CombinedOdds)
    const value = 100*(InversedOdds[0]/(InversedOdds.reduce((a, b) => a + b, 0))*(CombinedOdds[0]-1))
    return NextResponse.json({ value }, { status: 200 });

  } catch (error) {
    console.log(error)
    return NextResponse.json(
      { error: 'An error occurred while processing your request.' },
      { status: 500 }
    );
  }
}
