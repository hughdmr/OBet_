'use client'

import { useState } from 'react';
import { InputIssuesNumber, InputBetNumber, InputOperationType } from '../../../components/ValueInputs';
import { TableInput } from '../../../components/TableInput';
import classes from '../../../components/ValueInputs.module.css';

export default function Home() {
  const [betNumber, setBetNumber] = useState(1);
  const [issuesNumber, setIssuesNumber] = useState(2);
  const [operationType, setOperationType] = useState<string | null>(null); // État pour l'opération sélectionnée

  return (
    <div className={classes.container}>
      <InputBetNumber setBetNumber={setBetNumber} />
      <InputIssuesNumber setIssuesNumber={setIssuesNumber} />
      <div className={classes.scrollable}>
      <TableInput betNumber={betNumber} issuesNumber={issuesNumber} operationType={operationType} />
      </div>
      {/* Ici, l'input apparaîtra juste sous le tableau */}
      <InputOperationType setOperationType={setOperationType} />
    </div>
  );
}
