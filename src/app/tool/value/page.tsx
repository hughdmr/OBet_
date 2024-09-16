'use client';

import { useState } from 'react';
import { Text } from '@mantine/core';
import { InputBetNumber, InputIssuesNumber, InputKellyOdd, InputKellyFOdd, CalculKellyButton } from '../../../components/ValueInputs';
import TableInput from '../../../components/ValueTable';
import classes from '../../../components/ValueInputs.module.css';

export default function Home() {
  const [betNumber, setBetNumber] = useState(1);
  const [issuesNumber, setIssuesNumber] = useState(2);
  const [KellyOdd, setKellyOdd] = useState<number | null>(null);
  const [KellyFOdd, setKellyFOdd] = useState<number | null>(null);
  const [result, setResult] = useState<number | null>(null);
  const [kelly, setKelly] = useState<number | null>(null);
  const [reco, setReco] = useState<number | null>(null);

  return (
    <div className={classes.container}>
      <div className={classes.flexContainer}>
        <InputBetNumber setBetNumber={setBetNumber} />
        <InputIssuesNumber setIssuesNumber={setIssuesNumber} />
      </div>
      <div className={classes.scrollable}>
        <TableInput betNumber={betNumber} issuesNumber={issuesNumber}/>
      </div>
      <div className={classes.flexContainer}>
        <InputKellyOdd setKellyOdd={setKellyOdd} />
        <InputKellyFOdd setKellyFOdd={setKellyFOdd} />
        <CalculKellyButton KellyOdd={KellyOdd} KellyFOdd={KellyFOdd} setResult={setResult} setKelly={setKelly} setReco={setReco}/>
        {result !== null && (
            <Text className={classes.resultText}>  Value: {result}%</Text>
          )}
        {kelly !== null && (
            <Text className={classes.resultText}>  Kelly Stake: {kelly}%</Text>
            
        )}
        {kelly !== null && (
          <Text className={classes.resultText}>
            Recommended Stake: {reco}%
          </Text>            
        )}
        
      </div>
    </div>
  );
}
