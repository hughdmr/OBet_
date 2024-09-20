import React, { useState, useEffect } from 'react';
import { Table, Text, TextInput, Radio, Checkbox, Flex } from '@mantine/core';

const SurebetTable: React.FC<{ issuesNumber: number }> = ({ issuesNumber }) => {
  const [selectedRadio, setSelectedRadio] = useState<number>(0);
  const [checkboxStates, setCheckboxStates] = useState<boolean[]>([]);
  const [odds, setOdds] = useState<string[]>([]);
  const [stakes, setStakes] = useState<string[]>([]);

  function usePrevious<T>(value: T): T | undefined {
    const ref = React.useRef<T>();
    useEffect(() => {
      ref.current = value;
    }, [value]);
    return ref.current;
  }

  const prevIssuesNumber = usePrevious(issuesNumber);

  useEffect(() => {
    const newOdds = Array.from({ length: issuesNumber }, (_, i) =>
      prevIssuesNumber !== undefined ? odds[i] ?? issuesNumber.toString() : issuesNumber.toString()
    );

    const newStakes = Array.from({ length: issuesNumber }, (_, i) =>
      prevIssuesNumber !== undefined ? stakes[i] ?? '10' : '10'
    );

    setOdds(newOdds);
    setStakes(newStakes);
    
    // Maintain previous checkbox states and only update the selected one
    setCheckboxStates((prevStates) => {
      const newCheckboxStates = Array.from({ length: issuesNumber }, (_, i) => 
        i === selectedRadio ? true : (prevStates[i] ?? false)
      );

      return newCheckboxStates;
    });

    if (selectedRadio >= issuesNumber) {
      setSelectedRadio(0);
    }
  }, [issuesNumber, prevIssuesNumber]);

  useEffect(() => {
    updateStakes(checkboxStates);
  }, [odds, checkboxStates]);

  const updateStakes = async (checkboxStates: boolean[]) => {
    const payload = {
      odds: odds.map((o) => parseFloat(o)),
      stakes: stakes.map((s) => parseFloat(s)),
      selectedRadio: selectedRadio,
      shareChecked: checkboxStates,
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
      console.log('API Response:', result);

      if (response.ok) {
        if (Array.isArray(result.stakes) && result.stakes.length === issuesNumber) {
          setStakes(result.stakes.map((stake: any) => stake?.toString() || '0'));
        } else {
          console.error('Expected result.stakes to be an array of the right length:', result.stakes);
        }
      } else {
        console.error('Error updating stakes:', result.error || 'Invalid response format');
      }
    } catch (error) {
      console.error('Network error:', error);
    }
  };

  const handleOddChange = (index: number, value: string) => {
    setOdds((prevOdds) => {
      const newOdds = prevOdds.map((entry, i) => (i === index ? value : entry));
      return newOdds;
    });
  };

  const handleStakeChange = (index: number, value: string) => {
    if (index === selectedRadio) {
      setStakes((prevStakes) => {
        const newStakes = prevStakes.map((entry, i) => (i === index ? value : entry));
        return newStakes;
      });
    }
  };

  const handleRadioChange = (index: number) => {
    const updatedCheckboxStates = [...checkboxStates];
    updatedCheckboxStates.fill(false);
    updatedCheckboxStates[index] = true; // Always check the new fixed column checkbox

    setCheckboxStates(updatedCheckboxStates);
    setSelectedRadio(index);
  };

  const handleCheckboxChange = (index: number) => {
    if (index === selectedRadio) {
      return; // Prevent toggling the fixed column checkbox
    }

    setCheckboxStates((prevStates) => {
      const updatedStates = prevStates.map((checked, i) =>
        i === index ? !checked : checked
      );
      return updatedStates;
    });
  };

  const calculateBenefit = (index: number) => {
    if (selectedRadio === null) return 0;
    const odd = parseFloat(odds[index] || '0');
    const stake = parseFloat(stakes[index] || '0');
    const sumOfStakes = stakes.reduce((sum, s) => sum + parseFloat(s || '0'), 0);
    const benefit = odd * stake - sumOfStakes;
    return benefit;
  };

  const createRow = (type: 'odds' | 'stakes' | 'radio' | 'checkbox' | 'profit', label: string) => {
    const isStakeRow = type === 'stakes';
    const totalStake = isStakeRow ? stakes.reduce((sum, stake) => sum + parseFloat(stake || '0'), 0) : 0;

    return (
      <Table.Tr>
        <Table.Td style={{ backgroundColor: '#f5f5f5', width: '200px' }}>
          {isStakeRow ? `${label} (Total: ${totalStake.toFixed(2)})` : label}
        </Table.Td>
        {odds.map((value, index) => (
          <Table.Td key={`${type}-${index}`} style={{ width: '100px' }}>
            {type === 'odds' ? (
              <TextInput
                type="text"
                value={value}
                onChange={(e) => handleOddChange(index, e.target.value)}
              />
            ) : type === 'stakes' ? (
              <TextInput
                type="text"
                value={stakes[index]}
                onChange={(e) => handleStakeChange(index, e.target.value)}
              />
            ) : type === 'radio' ? (
              <Flex justify="center">
                <Radio
                  name="oddsRadio"
                  checked={selectedRadio === index}
                  onChange={() => handleRadioChange(index)}
                />
              </Flex>
            ) : type === 'checkbox' ? (
              <Flex justify="center">
                <Checkbox
                  checked={checkboxStates[index]}
                  onChange={() => handleCheckboxChange(index)}
                />
              </Flex>
            ) : type === 'profit' ? (
              <Flex justify="center">
                <Text>{calculateBenefit(index).toFixed(2)}</Text>
              </Flex>
            ) : null}
          </Table.Td>
        ))}
      </Table.Tr>
    );
  };

  return (
    <div style={{ overflowX: 'auto', width: 'fit-content' }}>
      <Table withTableBorder withColumnBorders>
        <Table.Thead>
          <Table.Tr>
            <Table.Th style={{ width: '200px' }}>Match</Table.Th>
            {Array.from({ length: issuesNumber }, (_, index) => (
              <Table.Th key={`header-${index}`} style={{ width: '100px' }}>
                <Flex justify="center">Issue {index + 1}</Flex>
              </Table.Th>
            ))}
          </Table.Tr>
        </Table.Thead>
        <Table.Tbody>
          {createRow('odds', 'Odds')}
          {createRow('stakes', 'Stakes')}
          {createRow('radio', 'Fix Profit')}
          {createRow('checkbox', 'Share Profit')}
          {createRow('profit', 'Profit')}
        </Table.Tbody>
      </Table>
    </div>
  );
};

export default SurebetTable;
