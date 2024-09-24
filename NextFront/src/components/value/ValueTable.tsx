import React, { useState, useEffect } from 'react';
import { Table, Text, TextInput, Checkbox, Button, Select, Tooltip, Flex } from '@mantine/core';
import cx from 'clsx';
// @ts-ignore
import MathJax from 'react-mathjax2';
import styles from './ValueInputs.module.css';

const calculateTRJ = (odds: string[]) => {
  const sumInverse = odds.reduce((sum, odd) => sum + 1 / parseFloat(odd), 0);
  const trj = 100 / sumInverse;
  return trj.toFixed(1); // Return TRJ with 2 decimal places
};

const TableInput: React.FC<{
  issuesNumber: number;
  betNumber: number;
}> = ({ issuesNumber, betNumber }) => {

  type DataType = {
    id: string;
    match: string;
    odds: string[]; // odds should always be a string[]
    newTextField: string;
    trj: string;
  };

  const [data, setData] = useState<DataType[]>(() =>
    Array.from({ length: betNumber }, (_, index) => ({
      id: (index + 1).toString(),
      match: `Match ${index + 1}`,
      odds: Array.from({ length: issuesNumber }, () => issuesNumber.toString()), // Set odds to issuesNumber as a string
      newTextField: 'TRJ',
      trj: calculateTRJ(Array.from({ length: issuesNumber }, () => issuesNumber.toString())), // Initialize TRJ with issuesNumber as odds
    }))
  );


  const [selection, setSelection] = useState<string[]>([]);
  const [showNewRows, setShowNewRows] = useState(false);
  const [showOperationType, setShowOperationType] = useState(false);
  const [calculationDetails, setCalculationDetails] = useState<string>('');
  const [newOdds, setNewOdds] = useState<string[][]>([]);
  const [selectedOperation, setSelectedOperation] = useState<string | null>(null);
  const [operationResult, setOperationResult] = useState<string | null>(null);
  const [operationType, setOperationType] = useState<string | null>(null);
  const [foType, setFOType] = useState<string | null>('MPTO');
  const [trjValues, setTRJValues] = useState<string[]>([]); // Add this line


  useEffect(() => {
    const initialData = Array.from({ length: betNumber }, (_, index) => ({
      id: (index + 1).toString(),
      match: `Match ${index + 1}`,
      odds: Array.from({ length: issuesNumber }, () => issuesNumber.toString()), // Set odds to issuesNumber as a string
      newTextField: 'TRJ',
      trj: calculateTRJ(Array.from({ length: issuesNumber }, () => issuesNumber.toString())), // Initialize TRJ with issuesNumber
    }));

    setData(initialData);
    setSelection(initialData.map(item => item.id));
    setShowNewRows(false);
    setShowOperationType(false);
    setOperationType(null);
    setCalculationDetails('');
    handleTRJCalculate();
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
            trj: calculateTRJ(item.odds.map((odd, i) => (i === index ? value : odd))),
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

  const handleFOChange = (value: string | null) => {
    setFOType(value);
  };

  const toggleRow = (id: string) =>
    setSelection((current) =>
      current.includes(id) ? current.filter((item) => item !== id) : [...current, id]
    );

  const toggleAll = () =>
    setSelection((current) => (current.length === data.length ? [] : data.map((item) => item.id)));

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
        <Table.Td className={styles.tdInput}>
          <Text style={{ width: '100%' }}>
            {item.trj} %
          </Text>
        </Table.Td>
      </Table.Tr>
    );

    const newTRJ = newOdds[matchIndex]?.length
      ? calculateTRJ(newOdds[matchIndex])
      : '';

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
        <Table.Td className={styles.tdInput}>
          <Text style={{ width: '100%' }}>
            {newTRJ} % {/* Display TRJ value */}
          </Text>
        </Table.Td>
      </Table.Tr>
    ) : null;

    return [originalRow, newRow].filter(Boolean);
  });

  const sendDataToFOAPI = async (foType: string, oddData: any) => {
    try {
      const url = `http://localhost:3000/api/fair-odd`;
      console.log(`Sending data to ${url}:`, { odds: oddData, foType });

      const response = await fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ odds: oddData, foType }), // Include foType here
      });

      console.log('Response Status:', response.status);

      if (!response.ok) {
        const errorText = await response.text();
        console.error('Error response:', errorText);
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      const result = await response.json();
      console.log('Result:', result);

      return result;
    } catch (error) {
      console.error('Error during fetch operation:', error);
      return { result: 'Error occurred while fetching the data.', details: '' };
    }
  };

  const handleFOCalculate = async () => {
    // Ensure odds are numbers
    const oddsData = data.map(row => row.odds.map(odd => parseFloat(odd)));

    console.log('Odds Data:', oddsData);

    // Call the API and pass foType directly
    const response = await sendDataToFOAPI(foType!.toLowerCase(), oddsData);

    if (response) {
      // Calculate TRJ using the original odds
      const trjValues = response.fairOdds.map((oddsForMatch: string[]) =>
        calculateTRJ(oddsForMatch)  // Use original odds for TRJ calculation
      );

      // Format the odds to have 2 decimal places for display
      const updatedOdds = response.fairOdds.map((oddsForMatch: string[]) =>
        oddsForMatch.map(odd => parseFloat(odd).toFixed(2)) // Format each odd for display
      );

      // Update the state with new odds and TRJ
      setNewOdds(updatedOdds);
      setShowNewRows(true);
      setTRJValues(trjValues.map((trj: any) => parseFloat(trj).toFixed(2))); // Format TRJ for display
    }
  };





  const sendDataToOperationApi = async (operation: string, filteredData: any) => {
    try {
      const url = `http://localhost:3000/api/operations/${operation}`;
      console.log(`Sending data to ${url}:`, filteredData);

      const response = await fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ odds: filteredData.map((item: any) => item.odds) }),
      });

      console.log('Response Status:', response.status);

      if (!response.ok) {
        const errorText = await response.text();
        console.error('Error response:', errorText);
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      const jsonResponse = await response.json();
      console.log('Response JSON:', jsonResponse);

      return jsonResponse;
    } catch (error) {
      console.error('Error during fetch operation:', error);
      return { result: 'Error occurred while fetching the data.', details: '' };
    }
  };

  const handleOperationCalculate = async () => {
    console.log('New Odds:', newOdds);
    let response;

    if (operationType === 'Multichance of incompatibles events (Union)') {
      const firstRowOdds = newOdds[0]?.slice(0, 2).map(odd => parseFloat(odd)) || [];
      const dataToSend = [{ odds: firstRowOdds }];
      console.log('data', dataToSend)
      response = await sendDataToOperationApi('union-incomp', dataToSend);
    } else {
      const filteredData = data
        .filter((item, index) =>
          selection.includes(item.id) &&
          newOdds[index]?.[0] !== undefined
        )
        .map((item, index) => ({
          ...item,
          odds: newOdds[index],
        }));

      console.log('Filtered Data:', filteredData);

      switch (operationType) {
        case 'Combined (Intersection with independants events)':
          response = await sendDataToOperationApi('combined', filteredData);
          break;
        case 'Subtraction (Privation with inclued events)':
          response = await sendDataToOperationApi('substraction', filteredData);
          break;
        case 'Multichance of independants events (Union)':
          response = await sendDataToOperationApi('union-indep', filteredData);
          break;
        default:
          console.warn('Unknown operation type:', operationType);
          response = { details: '', result: '' };
          break;
      }
    }

    if (response) {
      setCalculationDetails(response.details);
      setOperationResult(response.result);
    }
  };


  const handleTRJCalculate = async () => {
    const allOdds = data.map((row) => row.odds);
    console.log('All Odds:', allOdds);
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
                <Table.Th className={styles.thTRJ}>TRJ</Table.Th>
              </Table.Tr>
            </Table.Thead>
            <Table.Tbody>
              {rows}
            </Table.Tbody>
          </Table>
        </div>
      </div>
      <div>
        <Flex
          direction="row"
          justify="flex-start"
          align="flex-end"
          gap="10px"
        >
          <Button
            mt="md"
            onClick={() => {
              setShowNewRows(true);
              setShowOperationType(true);
              handleFOCalculate();
            }}
          >
            Calculate Fair Odds
          </Button>
          <Select
            label=""
            placeholder="Method"
            data={['MPTO', 'EM']}
            defaultValue="MPTO"
            onChange={handleFOChange}
            style={{ width: '100px' }}
          />
        </Flex>

        {showOperationType && (
          <Flex direction="row" align="flex-end" gap="10px" style={{ width: '100%' }}>
            <Select
              mt="md"
              comboboxProps={{ withinPortal: true }}
              data={[
                'Combined (Intersection with independants events)',
                'Subtraction (Privation with included events)',
                'Multichance of independants events (Union)',
                'Multichance of incompatibles events (Union)', // New operation type
              ]}
              placeholder="Pick one"
              label="Operation"
              onChange={handleOperationChange}
              style={{ width: '400px' }}
            />
            {selectedOperation && (
              <Flex direction="row" align="flex-end" gap="10px">
                <Button mt="md" onClick={handleOperationCalculate} style={{ whiteSpace: 'nowrap' }}>
                  Calculate Operation
                </Button>

                {calculationDetails && (
                  <Tooltip
                    label={
                      <MathJax.Context input="tex">
                        <MathJax.Node>{calculationDetails}</MathJax.Node>
                      </MathJax.Context>
                    }
                    withArrow
                    position="bottom"
                    zIndex={1000}
                  >
                    <div
                      style={{
                        marginLeft: '50px',
                        border: '2px solid green',
                        paddingLeft: '10px',
                        paddingRight: '10px',
                        cursor: 'pointer',
                      }}
                    >
                      <MathJax.Context input="tex">
                        <MathJax.Node>{operationResult}</MathJax.Node>
                      </MathJax.Context>
                    </div>
                  </Tooltip>
                )}
              </Flex>
            )}
          </Flex>
        )}

      </div>
    </div>

  );
};

export default TableInput;
