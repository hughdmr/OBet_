'use client';

import { useState } from 'react';
import { InputBetNumber, InputIssuesNumber } from '../../../components/ValueInputs';
import TableInput from '../../../components/ValueTable';
import classes from '../../../components/ValueInputs.module.css';

export default function Home() {
  const [betNumber, setBetNumber] = useState(1);
  const [issuesNumber, setIssuesNumber] = useState(2);

  return (
    <div className={classes.container}>
      <div className={classes.flexContainer}>
        <InputBetNumber setBetNumber={setBetNumber} />
        <InputIssuesNumber setIssuesNumber={setIssuesNumber} />
      </div>
      <div className={classes.scrollable}>
        <TableInput betNumber={betNumber} issuesNumber={issuesNumber}/>
      </div>
    </div>
  );
}
