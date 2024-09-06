import cx from 'clsx';
import { useState, useEffect } from 'react';
import { Table, TextInput, Checkbox, rem, Button } from '@mantine/core';
import classes from './TableInput.module.css';

interface TableInputProps {
  betNumber: number;
  issuesNumber: number;
  operationType: string | null;
}

export function TableInput({ betNumber, issuesNumber, operationType }: TableInputProps) {
  const [data, setData] = useState(() => 
    Array.from({ length: betNumber }, (_, index) => ({
      id: (index + 1).toString(),
      match: `Match ${index + 1}`, 
      odds: Array.from({ length: issuesNumber }, () => '1'), // Default to '1' for multiplication
    }))
  );

  const [selection, setSelection] = useState<string[]>([]);
  const [showNewRows, setShowNewRows] = useState(false);

  useEffect(() => {
    setData(() => 
      Array.from({ length: betNumber }, (_, index) => ({
        id: (index + 1).toString(),
        match: `Match ${index + 1}`, 
        odds: Array.from({ length: issuesNumber }, () => '1'), // Default to '1' for multiplication
      }))
    );
    setSelection([]);
    setShowNewRows(false);
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

  const calculateNewRowValues = (odds: string[]) => {
    if (operationType === 'Combined (Intersection with independants events)') {
      // Example calculation for Combined operation
      return odds.reduce((acc, curr) => acc * parseFloat(curr), 1).toFixed(2);
    } else if (operationType === 'Soustraction (Privation with independants events)') {
      // Example calculation for Soustraction operation
      return odds.reduce((acc, curr) => acc - parseFloat(curr), 0).toFixed(2);
    } else if (operationType === 'Multichance Separated (Union with combined null)') {
      // Example calculation for Multichance Separated operation
      return odds.reduce((acc, curr) => Math.max(acc, parseFloat(curr)), 0).toFixed(2);
    } else if (operationType === 'Multichance Unseparated (Union with combined not null)') {
      // Example calculation for Multichance Unseparated operation
      return odds.reduce((acc, curr) => Math.max(acc, parseFloat(curr)), 0).toFixed(2);
    }
    return '0.00';
  };

  const rows = data.flatMap((item) => {
    const selected = selection.includes(item.id);

    // Row for existing data
    const originalRow = (
      <Table.Tr key={item.id} className={cx({ [classes.rowSelected]: selected })}>
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
          <Table.Td key={index} style={{ minWidth: rem(120) }}>
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

    // Row for additional non-editable data, shown only if `showNewRows` is true
    const newRow = showNewRows ? (
      <Table.Tr key={`new-${item.id}`} className={cx(classes.nonEditableRow)}>
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
          <Table.Td key={`new-${item.id}-${index}`} style={{ minWidth: rem(120) }}>
            <TextInput 
              type="text"
              value={calculateNewRowValues(item.odds)} 
              readOnly
              style={{ width: '100%' }}
            />
          </Table.Td>
        ))}
      </Table.Tr>
    ) : null;

    return [originalRow, newRow].filter(Boolean);
  });

  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center'}}>
      <div style={{ overflowX: 'auto', width: '100%' }}>
        <div style={{ maxHeight: 'calc(100vh - 80px)', overflowY: 'auto' }}>
          <Table miw={800} verticalSpacing="sm">
            <Table.Thead>
              <Table.Tr>
                <Table.Th style={{ width: rem(40) }}>
                  <Checkbox
                    onChange={toggleAll}
                    checked={selection.length === data.length}
                    indeterminate={selection.length > 0 && selection.length !== data.length}
                  />
                </Table.Th>
                <Table.Th style={{ minWidth: rem(150) }}>Matches</Table.Th>
                {Array.from({ length: issuesNumber }, (_, index) => (
                  <Table.Th key={index} style={{ minWidth: rem(120) }}>Odd {index + 1}</Table.Th>
                ))}
              </Table.Tr>
            </Table.Thead>
            <Table.Tbody>{rows}</Table.Tbody>
          </Table>
        </div>
      </div>
      <div style={{ marginTop: '20px' }}>
        <Button onClick={() => setShowNewRows(true)}> 
          Calculate 
        </Button>
      </div>
    </div>
  );
}
