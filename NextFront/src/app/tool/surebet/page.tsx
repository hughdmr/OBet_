'use client';

import { useState } from 'react';
import { InputIssuesNumber } from '../../../components/value/IssuesInput';
import SurebetTable from '../../../components/SurebetTable';

export default function Home() {
  const [issuesNumber, setIssuesNumber] = useState(2);

  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        gap: '20px',
        height: 'auto',
      }}
    >
      <div
        style={{
          display: 'flex',
          gap: '20px',
          alignItems: 'flex-end',
        }}
      >
        <InputIssuesNumber setIssuesNumber={setIssuesNumber} />
      </div>
      <div style={{width: '100%', overflowX: 'auto', maxHeight: '100%'}}>
        <SurebetTable issuesNumber={issuesNumber} />
      </div>
    </div>
  );
}
