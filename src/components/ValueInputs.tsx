import React, { useState, useEffect } from 'react';
import { Text, NumberInput, Select, Table, TextInput, Checkbox, Button } from '@mantine/core';
import cx from 'clsx';
import './ValueInputs.module.css';
import { calculateMultiplication, calculateSubtraction, calculateUnion } from './calculations';

// Composant InputIssuesNumber
const InputIssuesNumber: React.FC<{ setIssuesNumber: (value: number) => void }> = ({ setIssuesNumber }) => (
  <NumberInput
    label="Number of issues (independants)"
    placeholder="Number between 2 and 20"
    defaultValue={2}
    clampBehavior="strict"
    min={2}
    max={20}
    allowDecimal={false}
    stepHoldDelay={500}
    stepHoldInterval={100}
    onChange={(value) => setIssuesNumber(value as number)}
  />
);

// Composant InputBetNumber
const InputBetNumber: React.FC<{ setBetNumber: (value: number) => void }> = ({ setBetNumber }) => (
  <NumberInput
    label="Number of matches"
    placeholder="Number between 1 and 100"
    defaultValue={1}
    clampBehavior="strict"
    min={1}
    max={100}
    allowDecimal={false}
    stepHoldDelay={500}
    stepHoldInterval={100}
    onChange={(value) => setBetNumber(value as number)}
  />
);

// Composant InputOperationType
const InputOperationType: React.FC<{ 
  setOperationType: (value: string | null) => void, 
  operationCalculate: (value: string | null) => void 
}> = ({ setOperationType, operationCalculate }) => (
  <Select
    mt="md"
    comboboxProps={{ withinPortal: true }}
    data={[
      'Combined (Intersection of independants events P(A∩B) = P(A)xP(B)) = M1-FO1 x M1-FO2 x M1-FO3 x ...',
      'Soustraction (Privation of inclued events P(A/B) = P(A)-P(A∩B) = P(A)-P(B)) = 1/(1/M1-FO1 - 1/M1-FO2 - 1/M1-FO3 - ... )',
      'Multichance of independants events (Union : P(A∪B) = P(A)+P(B)-P(A∩B) = P(A)+P(B)-P(A)xP(B))',
      'Multichance of dependants events (Union : P(A∪B) = P(A)+P(B)-P(A∩B))',
    ]}
    placeholder="Pick one"
    label="Operation"
    onChange={(value) => {
      setOperationType(value!);
      operationCalculate(value);
    }}
  />
);

// Composant TableInput
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
  const [showIntersectionField, setShowIntersectionField] = useState(false); // Ajouté pour le champ supplémentaire
  const [calculationDetails, setCalculationDetails] = useState<string>('');

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
    setShowOperationType(false); // Réinitialiser l'affichage de InputOperationType
    setOperationType(null);
    setCalculationDetails('');
    setShowIntersectionField(false); // Réinitialiser l'affichage du champ supplémentaire
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


  const handleCalculate = (operationType: string | null) => {
    if (operationType === 'Combined (Intersection with independants events) = M1-FO1 x M1-FO2 x M1-FO3 x ...') {
      setShowIntersectionField(false); // Cacher le champ supplémentaire pour les autres opérations
      calculateMultiplication(data);
    } else if (operationType === 'Soustraction (Privation with inclued events) = 1/(1/M1-FO1 - 1/M1-FO2 - 1/M1-FO3 - ... )') {
      setShowIntersectionField(false); // Cacher le champ supplémentaire pour les autres opérations
      calculateSubtraction(data);
    }
    else if (operationType === 'Multichance of dependants events (Union : P(A∪B) = P(A)+P(B)-P(A∩B))') {
      setShowIntersectionField(true); // Afficher le champ supplémentaire
      calculateUnion('dependants', data, []);
    } 
    else if (operationType === 'Multichance of independants events (Union : P(A∪B) = P(A)+P(B)-P(A∩B) = P(A)+P(B)-P(A)xP(B))') {
      setShowIntersectionField(false); // Cacher le champ supplémentaire pour les autres opérations
      calculateUnion('independants', data, [])
    }
  }

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
              setShowNewRows(true); // Afficher les nouvelles lignes après avoir calculé
              setShowOperationType(true);
            }}
          >
            Calculate
          </Button>
        </div>
        {showOperationType && (
          <InputOperationType 
            setOperationType={setOperationType} 
            operationCalculate={handleCalculate}
          />
        )}
        {showIntersectionField && (
          <TextInput
    label="Cote de (A∩B)"
    value={showIntersectionField ? 'true' : 'false'}
    onChange={(e) => setShowIntersectionField(e.currentTarget.value === 'true')}
  />
        )}
        {operationType && (
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
            <Text style={{ marginBottom: '10px' }}>Calculation Details : {calculationDetails}</Text>
          </div>
        )}
      </div>
    </div>
  );
};

export { InputIssuesNumber, InputBetNumber, InputOperationType, TableInput };
