import React, { useState, useEffect } from 'react';
import { Table, TextInput, Checkbox, Button, Text, Select } from '@mantine/core';
import cx from 'clsx';
import styles from './ValueInputs.module.css';

const SurebetTable: React.FC<{
  issuesNumber: number;
  betNumber: number;
}> = ({ issuesNumber, betNumber}) => {
  const [data, setData] = useState(() =>
    Array.from({ length: betNumber }, (_, index) => ({
      id: (index + 1).toString(),
      match: `Match ${index + 1}`,
      odds: Array.from({ length: issuesNumber }, () => issuesNumber.toString()),
    }))
  );

  useEffect(() => {
    const initialData = Array.from({ length: betNumber }, (_, index) => ({
      id: (index + 1).toString(),
      match: `Match ${index + 1}`,
      odds: Array.from({ length: issuesNumber }, () => issuesNumber.toString()),
    }));
  
    setData(initialData);
  }, [betNumber, issuesNumber]);  


  const handleInputChange = (id: string, index: number, value: string) => {
    setData((prevData) =>
      prevData.map((item) =>
        item.id === id
          ? {
              ...item,
              odds: item.odds.map((odd, i) => (i === index ? value : odd)),
            }
          : item
      )
    );
  };

  const handleMatchChange = (id: string, value: string) => {
    setData((prevData) =>
      prevData.map((item) =>
        item.id === id
          ? { ...item, match: value }
          : item
      )
    );
  };
  
  const rows = data.flatMap((item, matchIndex) => {
  
    const originalRow = (
      <Table.Tr key={item.id}>
        <Table.Td className={styles.tdInput}>
          <TextInput
            type="text"
            value={item.match}
            onChange={(e) => handleMatchChange(item.id, e.target.value)}
            style={{ width: '100%' }}
          />
        </Table.Td>
        {item.odds.map((odd, index) => (
          <Table.Td key={index} className={styles.tdInput}>
            <TextInput
              type="text"
              value={odd}
              onChange={(e) => handleInputChange(item.id, index, e.target.value)}
              style={{ width: '100%' }}
            />
          </Table.Td>
        ))}
      </Table.Tr>
    );
  
    return originalRow;
  });


    return (
    <div>
      <div className={styles.tableContainer}>
        <div className={styles.tableWrapper}>
          <Table className={styles.table}>
            <Table.Thead>
              <Table.Tr>
                <Table.Th className={styles.thMatches}>Matches</Table.Th>
                {Array.from({ length: issuesNumber }, (_, index) => (
                  <Table.Th key={index} className={styles.thOdd}>Odd {index + 1}</Table.Th>
                ))}
              </Table.Tr>
            </Table.Thead>
            <Table.Tbody>
              {rows}
            </Table.Tbody>
          </Table>
        </div>
      </div>
</div>

);
};

export default SurebetTable;
