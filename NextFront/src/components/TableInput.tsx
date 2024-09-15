"use client"

import cx from 'clsx';
import { useState } from 'react';
import { Table, Checkbox, ScrollArea, Group, Avatar, Text, rem } from '@mantine/core';
import classes from './TableInput.module.css';

const data = [
  {
    id: '1',
    odd1: '2',
    odd2: '2',
  },
  {
    id: '2',
    odd1: '1.5',
    odd2: '3',
  },
];

export function TableInput() {
  const [selection, setSelection] = useState(['1']);
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
          <Checkbox checked={selection.includes(item.id)} onChange={() => toggleRow(item.id)} />
        </Table.Td>
        <Table.Td>{item.id}</Table.Td>
        <Table.Td>{item.odd1}</Table.Td>
        <Table.Td>{item.odd2}</Table.Td>
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
            <Table.Th>Index</Table.Th>
            <Table.Th>Odd 1</Table.Th>
            <Table.Th>Odd 2</Table.Th>
          </Table.Tr>
        </Table.Thead>
        <Table.Tbody>{rows}</Table.Tbody>
      </Table>
    </ScrollArea>
  );
}