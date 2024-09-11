import React, { useState, useEffect } from 'react';
import { Table, TextInput, Checkbox, Button, Text, Select } from '@mantine/core';
import cx from 'clsx';
import styles from './ValueInputs.module.css'; // Importation des styles CSS

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
      odds: Array.from({ length: issuesNumber }, () => issuesNumber.toString()),
    }))
  );

  const [selection, setSelection] = useState<string[]>([]);
  const [showNewRows, setShowNewRows] = useState(false);
  const [showOperationType, setShowOperationType] = useState(false);
  const [showIntersectionField, setShowIntersectionField] = useState(false);
  const [calculationDetails, setCalculationDetails] = useState<string>('');
  const [intersectionOdds, setIntersectionOdds] = useState<string[]>([]);
  const [canCalculate, setCanCalculate] = useState(false);
  const [newOdds, setNewOdds] = useState<string[][]>([]); // Type string[][] pour un tableau de tableaux

  useEffect(() => {
    const initialData = Array.from({ length: betNumber }, (_, index) => ({
      id: (index + 1).toString(),
      match: `Match ${index + 1}`,
      odds: Array.from({ length: issuesNumber }, () => issuesNumber.toString()),
    }));
  
    setData(initialData);
    setSelection(initialData.map(item => item.id)); // Initialiser les cases à cocher comme cochées
    setShowNewRows(false);
    setShowOperationType(false);
    setOperationType(null);
    setCalculationDetails('');
    setShowIntersectionField(false);
    setIntersectionOdds([]);
    setCanCalculate(false);
  }, [betNumber, issuesNumber]);  

  useEffect(() => {
    setCalculationDetails('');
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

  const fetchNewOdds = async () => {
    try {
      const oddsData = data.map(row => row.odds.map(odd => parseFloat(odd)));
  
      const response = await fetch('http://localhost:3000/api/fair-odd', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ odds: oddsData }),
      });
  
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
  
      const text = await response.text();
      if (!text) {
        console.error('La réponse est vide.');
        return;
      }
  
      const result = JSON.parse(text);
      setNewOdds(result.fairOdds);
      setShowNewRows(true); // Assurez-vous que les nouvelles lignes sont affichées
    } catch (error) {
      console.error('Erreur lors de la récupération des données :', error);
    }
  };
  
  const rows = data.flatMap((item, matchIndex) => {
    const selected = selection.includes(item.id);
    const isHighlight = operationType !== null && selected;
  
    const originalRow = (
      <Table.Tr key={item.id} className={cx({ [styles.rowSelected]: selected })}>
        <Table.Td>
          <Checkbox className={styles.checkboxChecked} checked={selected} onChange={() => toggleRow(item.id)} />
        </Table.Td>
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
  
    const newRow = showNewRows ? (
      <Table.Tr key={`new-${item.id}`} className={styles.nonEditableRow}>
        <Table.Td />
        <Table.Td className={styles.tdInput}>
          <TextInput
            type="text"
            value={`${item.match} FO`}
            readOnly
            style={{ width: '100%' }}
          />
        </Table.Td>
        {newOdds[matchIndex]?.map((odd, index) => (
          <Table.Td 
            key={`new-${item.id}-${index}`} 
            className={cx(styles.tdInput, {
              [styles.highlightOdd1]: index === 0 && isHighlight
            })}
          >
            <TextInput
              type="text"
              value={odd.toString()}
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
    console.log(newOdds)
    // Filtrer les données pour inclure uniquement les lignes sélectionnées avec Odds 1
    const filteredData = data.filter((item, index) =>
      selection.includes(item.id) &&
      newOdds[index]?.[0] !== undefined // Vérifie si le Odds 1 est défini pour la ligne
    );
  
    console.log('Filtered data:', filteredData); // Debugging line
  
    let result, details;
    switch (operationType) {
      case 'Combined (Intersection with independants events)':
        ({ result, details } = calculateMultiplication(filteredData));
        setCalculationDetails(details);
        break;
      case 'Soustraction (Privation with inclued events)':
        ({ result, details } = calculateSubtraction(filteredData));
        setCalculationDetails(details);
        break;
      case 'Multichance of dependants events (Union : P(A∪B) = P(A)+P(B)-P(A∩B))':
        ({ result, details } = calculateUnion('dependants', filteredData, intersectionOdds.map(Number)));
        setCalculationDetails(details);
        break;
      case 'Multichance of independants events (Union : P(A∪B) = P(A)+P(B)-P(A∩B) = P(A)+P(B)-P(A)xP(B))':
        ({ result, details } = calculateUnion('independants', filteredData, []));
        setCalculationDetails(details);
        break;
      default:
        setCalculationDetails('');
        break;
    }
  };  
  

  

  return (
    <div>
      <div className={styles.tableContainer}>
        <div className={styles.tableWrapper}>
          <Table className={styles.table}>
            <Table.Thead>
              <Table.Tr>
                <Table.Th style={{ width: '40px' }} className={styles.checkboxChecked}>
                  <Checkbox
                    onChange={toggleAll}
                    checked={selection.length === data.length}
                    indeterminate={selection.length > 0 && selection.length !== data.length}
                  />
                </Table.Th>
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
      <div>
        <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'flex-start', alignItems: 'flex-end', gap: '10px' }}>
            <Button
                mt="md"
                onClick={() => {
                    setShowNewRows(true);
                    setShowOperationType(true);
                    fetchNewOdds(); // Appeler la fonction pour récupérer les données de la route
                }}
            >
                Calculate Fair Odds
            </Button>
            <Select
                label=""
                placeholder="Method"
                data={['EM', 'MPTO', 'SHIN', 'OR', 'LOG']}
                style={{ width: '100px' }} // Réduire la largeur du Select
            />
        </div>
        <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'flex-end', gap: '10px', width: '100%' }}>
  {showOperationType && (
    <InputOperationType setOperationType={setOperationType} handleCalculate={handleCalculate} />
  )}
  {calculationDetails && (
    <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'flex-end' }}>
      <Text mt="md">
        {calculationDetails}
      </Text>
    </div>
  )}
</div>


      </div>
    </div>

  );
};

export default TableInput;
