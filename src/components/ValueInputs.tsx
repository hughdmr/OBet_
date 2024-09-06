'use client'

import { NumberInput, Select, Table, TextInput, Checkbox, rem, Button } from '@mantine/core';
import cx from 'clsx';
import { useState, useEffect } from 'react';
import classes from './TableInput.module.css';

// Composants InputIssuesNumber, InputBetNumber et InputOperationType
interface InputIssuesNumberProps {
  setIssuesNumber: (value: number) => void;
}

export function InputIssuesNumber({ setIssuesNumber }: InputIssuesNumberProps) {
  return (
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
}

interface InputBetNumberProps {
  setBetNumber: (value: number) => void;
}

export function InputBetNumber({ setBetNumber }: InputBetNumberProps) {
  return (
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
}

export function InputOperationType({ setOperationType }: { setOperationType: (value: string) => void }) {
  return (
    <Select
      mt="md"
      comboboxProps={{ withinPortal: true }}
      data={[
        'Combined (Intersection with independants events)', 
        'Soustraction (Privation with independants events)', 
        'Multichance Separated (Union with combined null)', 
        'Multichance Unseparated (Union with combined not null)'
      ]}
      placeholder="Pick one"
      label="Operation"
      onChange={(value) => setOperationType} // Ajoutez cette ligne pour mettre à jour le type d'opération
    />
  );
}

// Composant principal avec la logique d'affichage
export function TableInput({ betNumber, issuesNumber }: { betNumber: number; issuesNumber: number }) {
  const [data, setData] = useState(() =>
    Array.from({ length: betNumber }, (_, index) => ({
      id: (index + 1).toString(),
      match: `Match ${index + 1}`,
      odds: Array.from({ length: issuesNumber }, () => '1.00'), // Valeur par défaut des odds
    }))
  );

  const [operationType, setOperationType] = useState<string | null>(null); // État pour stocker l'opération sélectionnée
  const [showNewRows, setShowNewRows] = useState(false);

  useEffect(() => {
    setData(() =>
      Array.from({ length: betNumber }, (_, index) => ({
        id: (index + 1).toString(),
        match: `Match ${index + 1}`,
        odds: Array.from({ length: issuesNumber }, () => '1.00'), // Réinitialisation
      }))
    );
    setShowNewRows(false);
  }, [betNumber, issuesNumber]);

  // Calculer la multiplication des valeurs dans la colonne "odd1" si l'option "Combined" est sélectionnée
  const calculateCombinedOdds = () => {
    if (operationType === 'Combined (Intersection with independants events)') {
      const odd1Values = data.map((item) => parseFloat(item.odds[0] || '1')); // Multiplier seulement la première colonne
      return odd1Values.reduce((acc, odd) => acc * odd, 1).toFixed(2); // Multiplication des odds
    }
    return null;
  };

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

  const rows = data.map((item) => (
    <Table.Tr key={item.id}>
      <Table.Td>{item.match}</Table.Td>
      {item.odds.map((odd, index) => (
        <Table.Td key={index}>
          <TextInput
            type="text"
            value={odd}
            onChange={(e) => handleInputChange(item.id, index, e.target.value)}
            style={{ width: '100%' }}
          />
        </Table.Td>
      ))}
    </Table.Tr>
  ));

  const combinedOddsResult = calculateCombinedOdds(); // Calculer les odds combinés

  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
      <InputOperationType setOperationType={setOperationType} /> {/* Sélection d'opération */}
      <div style={{ overflowX: 'auto', width: '100%' }}>
        <Table miw={800} verticalSpacing="sm">
          <Table.Thead>
            <Table.Tr>
              <Table.Th>Matches</Table.Th>
              {Array.from({ length: issuesNumber }, (_, index) => (
                <Table.Th key={index}>Odd {index + 1}</Table.Th>
              ))}
            </Table.Tr>
          </Table.Thead>
          <Table.Tbody>{rows}</Table.Tbody>
        </Table>
      </div>
      {/* Afficher le résultat seulement si l'option "Combined" est sélectionnée */}
      {combinedOddsResult && (
        <div style={{ marginTop: '20px' }}>
          <p><strong>Combined odds result (Odd1):</strong> {combinedOddsResult}</p>
        </div>
      )}
      <Button onClick={() => setShowNewRows(true)} style={{ marginTop: '20px' }}>Calculate</Button>
    </div>
  );
}
