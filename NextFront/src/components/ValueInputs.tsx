import React from 'react';
import { NumberInput, Button } from '@mantine/core';
import classes from './ValueInputs.module.css';

const InputIssuesNumber: React.FC<{ setIssuesNumber: (value: number) => void }> = ({ setIssuesNumber }) => (
  <NumberInput
    label="Number of issues"
    description="Should be mutually exclusive and collectively exhaustive events."
    placeholder="Number between 1 and 100"
    defaultValue={2}
    clampBehavior="strict"
    min={1}
    max={100}
    allowDecimal={false}
    stepHoldDelay={500}
    stepHoldInterval={100}
    onChange={(value) => setIssuesNumber(value as number)}
  />
);

const InputBetNumber: React.FC<{ setBetNumber: (value: number) => void }> = ({ setBetNumber }) => (
  <NumberInput
    label="Number of matches"
    description="Matches for which you want to calculate the fair odds."
    placeholder="Number between 1 and 100"
    defaultValue={1}
    clampBehavior="strict"
    min={1}
    max={100}
    allowDecimal={false}
    stepHoldDelay={500}
    stepHoldInterval={100}
    onChange={(value) => setBetNumber(value as number)}
  />
);

const InputKellyOdd: React.FC<{ setKellyOdd: (value: number) => void }> = ({ setKellyOdd }) => (
  <NumberInput
    label="Odd"
    description="Odd you want to calculate value"
    clampBehavior="strict"
    hideControls
    min={1}
    allowDecimal={true}
    stepHoldDelay={500}
    stepHoldInterval={100}
    onChange={(value) => setKellyOdd(value as number)}
    className={classes.inputKelly}
  />
);

const InputKellyFOdd: React.FC<{ setKellyFOdd: (value: number) => void }> = ({ setKellyFOdd }) => (
  <NumberInput
    label="Fair Odd"
    description="Fair Odd you want to compare with"
    clampBehavior="strict"
    hideControls
    min={1}
    allowDecimal={true}
    stepHoldDelay={500}
    stepHoldInterval={100}
    onChange={(value) => setKellyFOdd(value as number)}
    className={classes.inputKelly}
  />
);

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


export {InputBetNumber, InputIssuesNumber, InputKellyOdd, InputKellyFOdd, CalculKellyButton};

