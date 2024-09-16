import React, { useState, useEffect } from 'react';
import { Text, NumberInput, Select, Table, TextInput, Checkbox, Button } from '@mantine/core';
import cx from 'clsx';
import './ValueInputs.module.css'; // Assurez-vous que le fichier CSS est correctement importé

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
}> = ({ setOperationType, operationCalculate }) => (  <Select
    mt="md"
    comboboxProps={{ withinPortal: true }}
    data={[
      'Combined (Intersection with independants events) = M1-FO1 x M1-FO2 x M1-FO3 x ...',
      'Soustraction (Privation with inclued events) = 1/(1/M1-FO1 - 1/M1-FO2 - 1/M1-FO3 - ... )',
      'Multichance Separated (Union with combined null)',
      'Multichance Unseparated (Union with combined not null)'
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

  const calculateMultiplication = () => {
    const odds = data.map(item => parseFloat(item.odds[0]));
    const product = odds.reduce((acc, curr) => acc * curr, 1).toFixed(2);

    const details = odds
      .map(odd => odd.toFixed(2))
      .join(' x ') + ` = ${product}`;

    setCalculationDetails(details);
    return product;
  };

  const calculateSubtraction = () => {
    const odds = data.map(item => parseFloat(item.odds[0]));
    const reciprocals = odds.map(odd => 1 / odd);
    const sumOfReciprocals = reciprocals.reduce((acc, curr) => acc - curr, 0);
    const result = (1 / sumOfReciprocals).toFixed(2);
  
    const details = reciprocals
      .map(rec => rec.toFixed(2))
      .join(' - ') + ` = ${result}`;
  
    setCalculationDetails(details);
    return result;
  };

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

  const handleCalculate = (operationType: any) => {
    if (operationType === 'Combined (Intersection with independants events) = M1-FO1 x M1-FO2 x M1-FO3 x ...') {
      calculateMultiplication();
    } else if (operationType === 'Soustraction (Privation with inclued events) = 1/(1/M1-FO1 - 1/M1-FO2 - 1/M1-FO3 - ... )') {
      calculateSubtraction();
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
            <Table.Tbody>{rows}</Table.Tbody>
          </Table>
        </div>
      </div>

      <div style={{ marginTop: '20px', paddingTop: '20px' }}>
        {showOperationType && (
          <InputOperationType
            setOperationType={setOperationType}
            operationCalculate={handleCalculate}
          />
        )}
        {calculationDetails && (
          <div style={{ marginTop: '20px', paddingTop: '20px' }}>
            <Text>Details:</Text>
            <Text>{calculationDetails}</Text>
          </div>
        )}
        <Button
          fullWidth
          color="green"
          mt="md"
          size="md"
          variant="outline"
          onClick={() => {
            setShowNewRows((prev) => !prev);
            setShowOperationType((prev) => !prev);
          }}
        >
          {showNewRows ? 'Hide rows' : 'Show rows'}
        </Button>
      </div>
    </div>
  );
};

export { InputIssuesNumber, InputBetNumber, InputOperationType, TableInput };
