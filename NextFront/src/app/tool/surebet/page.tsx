'use client';

import { useState } from 'react';
import { InputIssuesNumber } from '../../../components/value/IssuesInput';
import SurebetTable from '../../../components/SurebetTable';
import classes from '../../../components/SurebetTable.module.css';

export default function Home() {
  const [issuesNumber, setIssuesNumber] = useState(2);

  return (
    <div className={classes.container}>
      <div className={classes.flexContainer}>
        <InputIssuesNumber setIssuesNumber={setIssuesNumber} />
      </div>
      <div className={classes.scrollable}>
        <SurebetTable issuesNumber={issuesNumber} />
      </div>
    </div>
  );
}
