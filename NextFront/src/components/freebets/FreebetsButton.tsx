import React, { useState } from 'react';
import { Button } from '@mantine/core';

type Odds = {
  win: number;
  draw: number;
  lost: number;
};

const FreebetButton = ({data, FreebetsAmount}: {
  data: any[];
  FreebetsAmount: number;
  }) => {
    const [calcul, setCalcul] = useState(0)

    const GetCombinedOdds = async (data:any) => {
      const data_int = data.map((item:any) => ({
        ...item,
        odds: item.odds.map((i:any) => parseFloat(i))
      }))
      const response = await fetch('/api/freebet', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data_int),
      });
    
      const value = await response.json();
      console.log(value["value"])
      setCalcul(value["value"])
    }

    return(
    <>
      <Button mt="md" onClick={() => GetCombinedOdds(data)}>
        Convert Freebets
      </Button>
      <div>
        <div>
          Conversion: {calcul.toFixed(2)}%
        </div>
        <div>
          Gains: {((calcul/100)*FreebetsAmount).toFixed(2)}€
        </div>
      </div>
    </>
    );
  };

  export {FreebetButton};
