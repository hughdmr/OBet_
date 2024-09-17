'use client';

import { useState } from 'react';
import { InputKellyOdd, InputKellyFOdd } from '../../../components/value/KellysInput';
import { CalculKellyButton } from '../../../components/value/KellysCalcul';
import { InputBetNumber } from '../../../components/value/BetsInput';
import { InputIssuesNumber } from '../../../components/value/IssuesInput';
import TableInput from '../../../components/value/ValueTable';
import classes from '../../../components/value/ValueInputs.module.css';
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
        <InputBetNumber setBetNumber={setBetNumber} />
        <InputIssuesNumber setIssuesNumber={setIssuesNumber} />
      </div>
      <div className={classes.scrollable}>
        <TableInput betNumber={betNumber} issuesNumber={issuesNumber}/>
      </div>
      <div className={classes.flexContainer}>
        <InputKellyOdd setKellyOdd={setKellyOdd}/>
        <InputKellyFOdd setKellyFOdd={setKellyFOdd} />
        <CalculKellyButton KellyOdd={KellyOdd} KellyFOdd={KellyFOdd} setResult={setResult} setKelly={setKelly} setReco={setReco}/>
        {result !== null && (
        <div style={{ marginBottom: '-5px', border: '2px solid green', padding: '10px'}}>
          <MathJax.Context className={classes.resultText} >
            <MathJax.Node>{`\\text{Value} : ${result}%`}</MathJax.Node>
          </MathJax.Context>

        {kelly !== null && (
           <MathJax.Context className={classes.resultText} >
           <MathJax.Node>{`\\text{Kelly Stake} : ${kelly}%`}</MathJax.Node>
         </MathJax.Context>       
        )}
        {reco !== null && (
          <MathJax.Context className={classes.resultText} >
            <MathJax.Node>{`\\text{Recommended Stake} : ${reco}%`}</MathJax.Node>
          </MathJax.Context>          
        )}
        </div>
        )}
      </div>
    </div>
  );
}
