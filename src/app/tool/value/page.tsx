'use client';

import { useState } from 'react';
import { InputBetNumber, InputIssuesNumber } from '../../../components/ValueInputs';
import { TableInput } from '../../../components/ValueTable';
import classes from '../../../components/ValueInputs.module.css';

export default function Home() {
  const [betNumber, setBetNumber] = useState(1);
  const [issuesNumber, setIssuesNumber] = useState(2);
  const [operationType, setOperationType] = useState<string | null>(null);

  return (
    <div className={classes.container}>
      <InputBetNumber setBetNumber={setBetNumber} />
      <InputIssuesNumber setIssuesNumber={setIssuesNumber} />
      <div className={classes.scrollable}>
        <TableInput betNumber={betNumber} issuesNumber={issuesNumber} operationType={operationType} setOperationType={setOperationType}/>
      </div>
    </div>
  );
}
