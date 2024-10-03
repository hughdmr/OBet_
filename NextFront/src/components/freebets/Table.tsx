import React, { useState, useEffect } from 'react';
import { Table, TextInput } from '@mantine/core';
import styles from './FreebetsInput.module.css';

const TableInput: React.FC<{
  betNumber: number;
  issuesNumber: number;
  setData: any;
  data: any;
}> = ({ betNumber, issuesNumber, setData, data }) => {

  useEffect(() => {
    const initialData = Array.from({ length: betNumber }, (_, index) => ({
      id: (index + 1).toString(),
      team1: 'PSG',
      team2: 'OM',
      odds: Array.from({ length: issuesNumber }, () => issuesNumber.toString()),
    }));
  
    setData(initialData);
  }, [betNumber, issuesNumber, setData]);  

  const handleInputChange = (id: string, index: number, value: string) => {
    setData((prevData:any) =>
      prevData.map((item:any) =>
        item.id === id
          ? {
            ...item,
            odds: item.odds.map((odd:any, i:any) => (i === index ? value : odd))
          }
          : item
      )
    );
  };

  const handleMatchChange = (id: string, value: string, team_nb: number) => {
    setData((prevData:any) =>
      prevData.map((item:any) =>
        item.id === id
          ? { ...item, [`team${team_nb}`]: value }
          : item
      )
    );
  };
  
  const rows = data.flatMap((item:any) => {
  
    const originalRow = (
      <Table.Tr key={item.id} className={styles.rowSelected}>
        <Table.Td className={styles.tdInput}>
          <TextInput
            type="text"
            value={item.team1}
            onChange={(e) => handleMatchChange(item.id, e.target.value, 1)}
            style={{ width: '100%' }}
          />
        </Table.Td>
        <Table.Td className={styles.tdInput}>
          <TextInput
            type="text"
            value={item.team2}
            onChange={(e) => handleMatchChange(item.id, e.target.value, 2)}
            style={{ width: '100%' }}
          />
        </Table.Td>
        {item.odds.map((odd:any, index:any) => (
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
                <Table.Th className={styles.thMatches}>Team A</Table.Th>
                <Table.Th className={styles.thMatches}>Team B</Table.Th>
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

export default TableInput;
