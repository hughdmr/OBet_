import cx from 'clsx';
import { useState } from 'react';
import { Table, Checkbox, ScrollArea, rem } from '@mantine/core';
import classes from './TableInput.module.css';

interface TableInputProps {
  betNumber: number;
  issuesNumber: number;
}

export function TableInput({ betNumber, issuesNumber }: TableInputProps) {
  const [selection, setSelection] = useState<string[]>([]);

  const data = Array.from({ length: betNumber }, (_, index) => ({
    id: (index + 1).toString(),
    odds: Array.from({ length: issuesNumber }, () => issuesNumber.toString()), // Chaque odd est le nombre total d'issues
  }));

  const toggleRow = (id: string) =>
    setSelection((current) =>
      current.includes(id) ? current.filter((item) => item !== id) : [...current, id]
    );

  const toggleAll = () =>
    setSelection((current) => (current.length === data.length ? [] : data.map((item) => item.id)));

  const rows = data.map((item) => {
    const selected = selection.includes(item.id);
    return (
      <Table.Tr key={item.id} className={cx({ [classes.rowSelected]: selected })}>
        <Table.Td>
          <Checkbox checked={selected} onChange={() => toggleRow(item.id)} />
        </Table.Td>
        <Table.Td>{item.id}</Table.Td>
        {item.odds.map((odd, index) => (
          <Table.Td key={index}>{odd}</Table.Td>
        ))}
      </Table.Tr>
    );
  });

  return (
    <ScrollArea>
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
            <Table.Th>Matches</Table.Th>
            {Array.from({ length: issuesNumber }, (_, index) => (
              <Table.Th key={index}>Odd {index + 1}</Table.Th>
            ))}
          </Table.Tr>
        </Table.Thead>
        <Table.Tbody>{rows}</Table.Tbody>
      </Table>
    </ScrollArea>
  );
}
