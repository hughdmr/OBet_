'use client';

import { useState } from 'react';
import { SegmentedControl } from '@mantine/core';
import { FreebetButton } from '../../../components/freebets/FreebetsButton';
import classes from '../../../components/freebets/FreebetsInput.module.css';
import TableInput from '../../../components/freebets/Table';
import { InputFreebets } from '@/components/freebets/FreebetInput';

export default function Home() {
    const [matchesValue, setMatchesValue] = useState('1');
    const [freebets, setFreebets] = useState(0);

    const betNumber = parseInt(matchesValue)
    const issuesNumber = 3

    const [data, setData] = useState(() =>
      Array.from({ length: betNumber }, (_, index) => ({
        id: (index + 1).toString(),
        team1: 'PSG',
        team2: 'OM',
        odds: Array.from({ length: issuesNumber }, () => issuesNumber.toString()),
      }))
    );

    return (
      <div className={classes.container}>
        <h1>Freebet Conversion</h1>
      <div className={classes.flexContainer}>
        <SegmentedControl fullWidth size="md" radius="md"
        value={matchesValue}
        onChange={setMatchesValue}
        data={[
          { label: '1 Match', value: '1' },
          { label: '2 Matchs', value: '2' },
          { label: '3 Matchs', value: '3' },
        ]}
        />
      </div>
      <div className={classes.container}>
        <TableInput betNumber={betNumber} issuesNumber={issuesNumber} setData={setData} data={data}/>
        <div className={classes.flexContainer}>
          <InputFreebets setFreebets={setFreebets}/>
          <FreebetButton data={data} FreebetsAmount={freebets}/>
        </div>
      </div>
    </div>
    );
  }