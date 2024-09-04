'use client'

import { useState } from 'react';
import { InputIssuesNumber, InputBetNumber, InputOperationType } from '../../../components/ValueInputs';
import { TableInput } from '../../../components/TableInput';
import classes from '../../../components/ValueInputs.module.css';

export default function Home() {
  const [betNumber, setBetNumber] = useState(1);
  const [issuesNumber, setIssuesNumber] = useState(2);

  return (
    <div className={classes.container}>
      <InputIssuesNumber setIssuesNumber={setIssuesNumber} />
      <InputBetNumber setBetNumber={setBetNumber} />
      <TableInput betNumber={betNumber} issuesNumber={issuesNumber} />
      <InputOperationType />
    </div>
  );
}
