import { Button } from '@mantine/core';

const handleValueCalculate = async (KellyOdd: number | null, KellyFOdd: number | null, setResult: any, setKelly: any, setReco: any) => {
    try {
      const response = await fetch('/api/value', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ KellyOdd, KellyFOdd }),
      });
  
      const data = await response.json();
  
      console.log('Calculated Value:', data.calculatedValue);
      console.log('Calculated Stake:', data.kellyStake);
  
      setResult(isNaN(data.calculatedValue)? '': (data.calculatedValue));
      setKelly(isNaN(data.kellyStake)? '' : (data.kellyStake));
      setReco(isNaN(data.kellyStake / 2.5) ? '' : (data.kellyStake / 2.5).toFixed(2));
    } catch (error) {
      console.error('Error calculating value and stake:', error);
    }
  };
  
  const CalculKellyButton = ({
    KellyOdd,
    KellyFOdd,
    setResult,
    setKelly,
    setReco,
  }: {
    KellyOdd: number | null;
    KellyFOdd: number | null;
    setResult: any;
    setKelly: any;
    setReco: any;
  }) => {
    return(
      <Button mt="md" onClick={() => handleValueCalculate(KellyOdd, KellyFOdd, setResult, setKelly, setReco)}>
      Calculate Value
    </Button>
    );
  };

  export {CalculKellyButton};
