'use client'

import React, { useState, useEffect } from 'react';
import { Table, Text, TextInput, Radio, Checkbox } from '@mantine/core';
import styles from './SurebetTable.module.css';

// Define the type for the data state
interface SurebetData {
  id: string;
  match: string;
  odds: number[];
  stakes: number[];
}

const SurebetTable: React.FC<{
  issuesNumber: number;
}> = ({ issuesNumber }) => {
  const [selectedRadio, setSelectedRadio] = useState<number>(0);
  const [checkboxStates, setCheckboxStates] = useState<boolean[]>([]);
  const [data, setData] = useState<SurebetData>({
    id: '1',
    match: 'Match',
    odds: [],
    stakes: [],
  });

  // Custom hook to remember previous value
  function usePrevious<T>(value: T): T | undefined {
    const ref = React.useRef<T>();
    useEffect(() => {
      ref.current = value;
    }, [value]);
    return ref.current;
  }

  const prevIssuesNumber = usePrevious(issuesNumber);

  useEffect(() => {
    // Merge old data with new issuesNumber
    setData(prevData => {
      const newOdds = Array.from({ length: issuesNumber }, (_, i) => 
        prevIssuesNumber !== undefined ? prevData.odds[i] ?? 1 : 1 // Default value if new issuesNumber
      );
      const newStakes = Array.from({ length: issuesNumber }, (_, i) => 
        prevIssuesNumber !== undefined ? prevData.stakes[i] ?? 10 : 10
      );
      return {
        id: '1',
        match: 'Match',
        odds: newOdds,
        stakes: newStakes,
      };
    });

    // Update checkbox states
    setCheckboxStates(prevStates =>
      Array.from({ length: issuesNumber }, (_, i) => prevStates[i] ?? (i === selectedRadio))
    );
  }, [issuesNumber, prevIssuesNumber, selectedRadio]);

  const updateStakes = async (checkboxStates: boolean[]) => {
    const fixedOdd = data.odds[selectedRadio];
    const fixedStake = data.stakes[selectedRadio];
    
    // Exclude the fixed column from the shareChecked array
    const shareChecked = checkboxStates
      .filter((value): value is boolean => value !== undefined);
    
    console.log(data)
    const payload = {
      odds: data.odds.map(o => o.toString()),  // Convert odds to strings without nested arrays
      stakes: data.stakes.map(s => s.toString()), // Ensure stakes are converted to strings
      selectedRadio: selectedRadio,
      shareChecked: shareChecked,
    };
    
    try {
      const response = await fetch('/api/surebet', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),
      });
      
      const result = await response.json();
      if (response.ok) {
        console.log('Updated stakes:', result.stakes);
        setData(prevData => ({
          ...prevData,
          stakes: result.stakes.map((stake: string) => parseFloat(stake)) // Convert strings back to numbers
        }));
      } else {
        console.error('Error updating stakes:', result.error);
      }
    } catch (error) {
      console.error('Network error:', error);
    }
};

  
  const handleInputChange = (index: number, value: string, type: 'odds' | 'stakes') => {
    console.log(`Input changed at index ${index}, type: ${type}, value: ${value}`);
    setData(prevData => {
      const newData = {
        ...prevData,
        [type]: prevData[type].map((entry, i) => (i === index ? parseFloat(value) : entry)),
      };
      console.log('Updated data:', newData);
      updateStakes(checkboxStates); // Call the API after updating state
      return newData;
    });
  };
  
  const handleRadioChange = (index: number) => {
    console.log(`Radio changed to index ${index}`);
    setSelectedRadio(index);
    setCheckboxStates(prevStates =>
      prevStates.map((_, i) => i === index)
    );
    updateStakes(checkboxStates); // Call the API after updating state
  };
  
  const handleCheckboxChange = (index: number) => {
    if (index === selectedRadio) {
      // Prevent unchecking the checkbox if it is the fixed column
      return;
    }
    
    console.log(`Checkbox changed at index ${index}`);
    setCheckboxStates(prevState => {
      const updatedStates = prevState.map((checked, i) => (i === index ? !checked : checked));
      updateStakes(updatedStates); // Call the API after updating state
      return updatedStates;
    });
  };
  
  const calculateBenefit = (index: number) => {
    if (selectedRadio === null) return 0;
    const odd = data.odds[index];
    const stake = data.stakes[index];
    const sumOfStakes = data.stakes.reduce((sum, s) => sum + s, 0);
    const benefit = (odd * stake) - sumOfStakes;
    return benefit;
  };

  const createTableRow = (type: 'odds' | 'stakes' | 'radio' | 'checkbox' | 'benefits', label: string, valueKey: 'odds' | 'stakes' | null) => (
    <Table.Tr>
      <Table.Td className={styles.tdMatches}>{label}</Table.Td>
      {data[valueKey ?? 'odds']?.map((value, index) => (
        <Table.Td key={`${type}-${index}`} className={styles.tdOdd}>
          {type === 'odds' || type === 'stakes' ? (
            <TextInput
              className={styles.tdInput}
              type="number"
              step="any" // Allows decimal values
              value={value}
              onChange={(e) => handleInputChange(index, e.target.value, valueKey!)}
            />
          ) : type === 'radio' ? (
            <Radio
              name="oddsRadio"
              checked={selectedRadio === index}
              onChange={() => handleRadioChange(index)}
            />
          ) : type === 'checkbox' ? (
            <Checkbox
              checked={checkboxStates[index]}
              onChange={() => handleCheckboxChange(index)}
            />
          ) : type === 'benefits' ? (
            <Text>{calculateBenefit(index).toFixed(2)}</Text>
          ) : null}
        </Table.Td>
      ))}
    </Table.Tr>
  );

  return (
    <div className={styles.tableContainer}>
      <Table className={styles.table}>
        <Table.Thead>
          <Table.Tr>
            <Table.Th className={styles.thMatches}>Matches</Table.Th>
            {Array.from({ length: issuesNumber }, (_, index) => (
              <Table.Th className={styles.thOdd} key={`header-${index}`}>
                Odd {index + 1}
              </Table.Th>
            ))}
          </Table.Tr>
        </Table.Thead>
        <Table.Tbody>
          {createTableRow('odds', data.match, 'odds')}
          {createTableRow('stakes', 'Stake', 'stakes')}
          {createTableRow('radio', 'Fix Profit', 'odds')}
          {createTableRow('checkbox', 'Share Profit', 'odds')}
          {/* Benefits Row */}
          {createTableRow('benefits', 'Benefits', null)}
        </Table.Tbody>
      </Table>
    </div>
  );
};

export default SurebetTable;
