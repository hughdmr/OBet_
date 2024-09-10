import React, { useState, useEffect } from 'react';
import { Table, TextInput, Checkbox, Button, Text } from '@mantine/core';
import cx from 'clsx';
import './ValueInputs.module.css';

import { InputOperationType } from './ValueInputs';
import { calculateMultiplication, calculateSubtraction, calculateUnion } from './calculations';

const TableInput: React.FC<{
  issuesNumber: number;
  betNumber: number;
  operationType: string | null;
  setOperationType: (value: string | null) => void;
}> = ({ issuesNumber, betNumber, operationType, setOperationType }) => {
  const [data, setData] = useState(() =>
    Array.from({ length: betNumber }, (_, index) => ({
      id: (index + 1).toString(),
      match: `Match ${index + 1}`,
      odds: Array.from({ length: issuesNumber }, () => '1'),
    }))
  );

  const [selection, setSelection] = useState<string[]>([]);
  const [showNewRows, setShowNewRows] = useState(false);
  const [showOperationType, setShowOperationType] = useState(false);
  const [showIntersectionField, setShowIntersectionField] = useState(false);
  const [calculationDetails, setCalculationDetails] = useState<string>('');
  const [intersectionOdds, setIntersectionOdds] = useState<string[]>([]);
  const [canCalculate, setCanCalculate] = useState(false);

  useEffect(() => {
    setData(() =>
      Array.from({ length: betNumber }, (_, index) => ({
        id: (index + 1).toString(),
        match: `Match ${index + 1}`,
        odds: Array.from({ length: issuesNumber }, () => '1'),
      }))
    );
    setSelection([]);
    setShowNewRows(false);
    setShowOperationType(false);
    setOperationType(null);
    setCalculationDetails(''); // Réinitialisation des détails de calcul
    setShowIntersectionField(false);
    setIntersectionOdds([]);
    setCanCalculate(false);
  }, [betNumber, issuesNumber]);
  
  useEffect(() => {
    setCalculationDetails(''); // Réinitialisation des détails de calcul lorsque l'opération change
  }, [operationType]);  

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

  const toggleRow = (id: string) =>
    setSelection((current) =>
      current.includes(id) ? current.filter((item) => item !== id) : [...current, id]
    );

  const toggleAll = () =>
    setSelection((current) => (current.length === data.length ? [] : data.map((item) => item.id)));

  const rows = data.flatMap((item) => {
    const selected = selection.includes(item.id);

    const originalRow = (
      <Table.Tr key={item.id} className={cx({ 'rowSelected': selected })}>
        <Table.Td>
          <Checkbox checked={selected} onChange={() => toggleRow(item.id)} />
        </Table.Td>
        <Table.Td>
          <TextInput
            type="text"
            value={item.match}
            onChange={(e) => handleMatchChange(item.id, e.target.value)}
            style={{ width: '100%' }}
          />
        </Table.Td>
        {item.odds.map((odd, index) => (
          <Table.Td key={index} style={{ minWidth: '120px' }}>
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

    const newRow = showNewRows ? (
      <Table.Tr key={`new-${item.id}`} className={cx('nonEditableRow')}>
        <Table.Td />
        <Table.Td>
          <TextInput
            type="text"
            value={`${item.match} FO`}
            readOnly
            style={{ width: '100%' }}
          />
        </Table.Td>
        {item.odds.map((odd, index) => (
          <Table.Td key={`new-${item.id}-${index}`} style={{ minWidth: '120px' }}>
            <TextInput
              type="text"
              value={odd}
              readOnly
              style={{ width: '100%' }}
            />
          </Table.Td>
        ))}
      </Table.Tr>
    ) : null;

    return [originalRow, newRow].filter(Boolean);
  });

  const handleIntersectionChange = (index: number, value: string) => {
    setIntersectionOdds((prevOdds) => {
      const newOdds = [...prevOdds];
      newOdds[index] = value;
      return newOdds;
    });
  };

  const handleCalculate = () => {
    let result, details;
    switch (operationType) {
      case 'Combined (Intersection with independants events)':
        // setShowIntersectionField(false);  
      ({ result, details } = calculateMultiplication(data));
        setCalculationDetails(details);
        break;
      case 'Soustraction (Privation with inclued events)':
        // setShowIntersectionField(false);  
      ({ result, details } = calculateSubtraction(data));
        setCalculationDetails(details);
        break;
      case 'Multichance of dependants events (Union : P(A∪B) = P(A)+P(B)-P(A∩B))':
        // setShowIntersectionField(true);
        ({ result, details } = calculateUnion('dependants', data, intersectionOdds.map(Number)));
        setCalculationDetails(details);
        break;
      case 'Multichance of independants events (Union : P(A∪B) = P(A)+P(B)-P(A∩B) = P(A)+P(B)-P(A)xP(B))':
        // setShowIntersectionField(false);  
      ({ result, details } = calculateUnion('independants', data, []));
        setCalculationDetails(details);
        break;
      default:
        setCalculationDetails('');
        break;
    }
  };  

  return (
    <div>
      <div style={{ overflowX: 'auto', width: '100%' }}>
        <div style={{ maxHeight: 'calc(100vh - 80px)', overflowY: 'auto' }}>
          <Table miw={800} verticalSpacing="sm">
            <Table.Thead>
              <Table.Tr>
                <Table.Th style={{ width: '40px' }}>
                  <Checkbox
                    onChange={toggleAll}
                    checked={selection.length === data.length}
                    indeterminate={selection.length > 0 && selection.length !== data.length}
                  />
                </Table.Th>
                <Table.Th style={{ minWidth: '150px' }}>Matches</Table.Th>
                {Array.from({ length: issuesNumber }, (_, index) => (
                  <Table.Th key={index} style={{ minWidth: '120px' }}>Odd {index + 1}</Table.Th>
                ))}
              </Table.Tr>
            </Table.Thead>
            <Table.Tbody>
              {rows}
            </Table.Tbody>
          </Table>
        </div>
      </div>
      <div>
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
          <Button
            mt="md"
            onClick={() => {
              setShowNewRows(true);
              setShowOperationType(true);
            }}
          >
            Calculate Fair Odds
          </Button>
        </div>
        {showOperationType && (
        <InputOperationType setOperationType={setOperationType} handleCalculate={handleCalculate} />
      )}
        {/* {showIntersectionField && (
          <div>
            {Array.from({ length: betNumber - 1 }, (_, index) => (
              <TextInput
                key={index}
                label={`Cote de (M${index + 1}∩M${index + 2})`}
                placeholder={`Enter the odds for intersection ${index + 1}`}
                onChange={(e) => handleIntersectionChange(index, e.target.value)}
                style={{ marginBottom: '10px', width: '100%' }}
              />
            ))}
          </div>
        )} */}
        {calculationDetails && (
        <Text mt="md">
          {calculationDetails}
        </Text>
      )}
      </div>
    </div>
  );
};

export default TableInput;
