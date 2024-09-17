'use client';

import { useState } from 'react';
import { InputBetNumber, InputIssuesNumber, InputKellyOdd, InputKellyFOdd, CalculKellyButton } from '../../../components/ValueInputs';
import SurebetTable from '../../../components/SurebetTable';
import classes from '../../../components/ValueInputs.module.css';
// @ts-ignore
import MathJax from 'react-mathjax2';

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
        <InputIssuesNumber setIssuesNumber={setIssuesNumber} />
      </div>
      <div className={classes.scrollable}>
        <SurebetTable betNumber={1} issuesNumber={issuesNumber}/>
      </div>
    </div>
  );
}
