'use client';

import { useState } from 'react';
import { InputKellyOdd, InputKellyFOdd } from '../../../components/value/KellysInput';
import { CalculKellyButton } from '../../../components/value/KellysCalcul';
import { InputBetNumber } from '../../../components/value/BetsInput';
import { InputIssuesNumber } from '../../../components/value/IssuesInput';
import TableInput from '../../../components/value/ValueTable';
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
    <div style={{ display: 'flex', flexDirection: 'column', gap: '20px', height: 'auto' }}>
      <div style={{ display: 'flex', gap: '20px', alignItems: 'flex-end' }}>
        <InputBetNumber setBetNumber={setBetNumber} />
        <InputIssuesNumber setIssuesNumber={setIssuesNumber} />
      </div>
      <div style={{ width: '100%', overflowX: 'auto', maxHeight: '100%'}}>
        <TableInput betNumber={betNumber} issuesNumber={issuesNumber}/>
      </div>
      <div style={{ display: 'flex', gap: '20px', alignItems: 'flex-end'}}>
        <InputKellyOdd setKellyOdd={setKellyOdd}/>
        <InputKellyFOdd setKellyFOdd={setKellyFOdd} />
        <CalculKellyButton KellyOdd={KellyOdd} KellyFOdd={KellyFOdd} setResult={setResult} setKelly={setKelly} setReco={setReco}/>
        {result !== null && (
          <div style={{ marginBottom: '-5px', border: '2px solid green', padding: '10px'}}>
            <MathJax.Context style={{ marginLeft: '10px', fontSize: '10px' }}>
              <MathJax.Node>{`\\text{Value} : ${result}%`}</MathJax.Node>
            </MathJax.Context>

            {kelly !== null && (
              <MathJax.Context style={{ marginLeft: '10px', fontSize: '10px' }}>
                <MathJax.Node>{`\\text{Kelly Stake} : ${kelly}%`}</MathJax.Node>
              </MathJax.Context>
            )}
            
            {reco !== null && (
              <MathJax.Context style={{ marginLeft: '10px', fontSize: '10px' }}>
                <MathJax.Node>{`\\text{Recommended Stake} : ${reco}%`}</MathJax.Node>
              </MathJax.Context>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
