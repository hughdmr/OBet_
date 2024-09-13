import React, { useState, useEffect } from 'react';
import { Table, TextInput, Checkbox, Button, Text, Select } from '@mantine/core';
import cx from 'clsx';
import MathJax from 'react-mathjax2';
import styles from './ValueInputs.module.css'; // Importation des styles CSS

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
  const [selectedOperation, setSelectedOperation] = useState<string | null>(null);
  const [operationResult, setOperationResult] = useState<string | null>(null); // New state for result


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

  const handleOperationChange = (value: string | null) => {
    setSelectedOperation(value);
    setOperationType(value);
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

  const handleOperationCalculate = async () => {
    console.log('New Odds:', newOdds);

    // Filtrer les données pour inclure uniquement les lignes sélectionnées avec Odds 1
    const filteredData = data
    .filter((item, index) => 
      selection.includes(item.id) && 
      newOdds[index]?.[0] !== undefined // Vérifie si le Odds 1 est défini pour la ligne
    )
    .map((item, index) => ({
      ...item,
      odds: newOdds[index], // Remplacer l'ancien odds par le nouveau odds depuis newOdds
    }));
  
    console.log('Filtered Data:', filteredData); // Debugging line

    let result, details;
    switch (operationType) {
        case 'Combined (Intersection with independants events)':
          try {
            console.log('Sending data to /combined API:', filteredData);
            
            const response = await fetch('http://localhost:3000/api/operations/combined', {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json',
              },
              body: JSON.stringify({ odds: filteredData.map(item => item.odds) }), // Assurez-vous que le format correspond à ce que l'API attend
            });
      
            console.log('Response Status:', response.status);

            if (!response.ok) {
              const errorText = await response.text();
              console.error('Error response:', errorText);
              throw new Error(`HTTP error! Status: ${response.status}`);
            }
      
            const jsonResponse = await response.json();
            console.log('Response JSON:', jsonResponse);

            ({ result, details } = jsonResponse);
            setCalculationDetails(details);
            setOperationResult(result);
          } catch (error) {
            console.error('Error during fetch operation:', error);
            setCalculationDetails('Error occurred while fetching the data.');
          }
          break;
        
        case 'Soustraction (Privation with inclued events)':
          console.log('Calling calculateSubtraction with filteredData:', filteredData);
          ({ result, details } = calculateSubtraction(filteredData));
          console.log('Subtraction Result:', result, 'Details:', details);
          setCalculationDetails(details);
          setOperationResult(result);
          break;

        case 'Multichance of dependants events (Union : P(A∪B) = P(A)+P(B)-P(A∩B))':
          console.log('Calling calculateUnion with dependants:', filteredData, intersectionOdds.map(Number));
          ({ result, details } = calculateUnion('dependants', filteredData, intersectionOdds.map(Number)));
          console.log('Union Result:', result, 'Details:', details);
          setCalculationDetails(details);
          setOperationResult(result);
          break;

        case 'Multichance of independants events (Union : P(A∪B) = P(A)+P(B)-P(A∩B) = P(A)+P(B)-P(A)xP(B))':
          console.log('Calling calculateUnion with independants:', filteredData, []);
          ({ result, details } = calculateUnion('independants', filteredData, []));
          console.log('Union Result:', result, 'Details:', details);
          setCalculationDetails(details);
          setOperationResult(result);
          break;

        default:
          console.warn('Unknown operation type:', operationType);
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
                defaultValue="EM"
                style={{ width: '100px' }} // Réduire la largeur du Select
            />
        </div>
        {showOperationType && (
        <div style={{ width: '100%' }}>
            <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'flex-end', gap: '10px', width: '100%' }}>
                <Select
                    mt="md"
                    comboboxProps={{ withinPortal: true }}
                    data={[
                        'Combined (Intersection with independants events)',
                        'Soustraction (Privation with inclued events)',
                        'Multichance of independants events (Union)',
                        'Multichance of dependants events (Union)',
                    ]}
                    placeholder="Pick one"
                    label="Operation"
                    onChange={handleOperationChange}
                    style={{ width: '400px' }}
                />
                {selectedOperation && (
                    <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'flex-end', gap: '10px' }}> {/* Align items to bottom */}
                        <Button
                        mt="md"
                        onClick={handleOperationCalculate}
                        style={{ whiteSpace: 'nowrap' }} // To prevent text wrapping
                        >
                        Calculate Operation
                        </Button>

                        {calculationDetails && (
                        <div style={{ marginBottom: '-5px', marginLeft: '50px', border: '2px solid green', paddingLeft: '10px', paddingRight: '10px'}}> {/* Add margin to slightly lift the result */}
                            <MathJax.Context input='tex'>
                            <MathJax.Node>{operationResult}</MathJax.Node>
                            </MathJax.Context>
                        </div>
                        )}
                    </div>
                    )}
                    </div>

            
            {/* Display calculation details on the next line */}
            {calculationDetails && (
            <div style={{ marginTop: '10px', textAlign: 'left'}}> {/* Add some margin to separate it from the button */}
                <MathJax.Context input='tex'>                    
                    <MathJax.Node>{calculationDetails}</MathJax.Node>
                </MathJax.Context>
            </div>
            )}
        </div>
    )}
    </div>
</div>

);
};

export default TableInput;
