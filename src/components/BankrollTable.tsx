"use client"

import { DisplayBet } from '@/scripts/definitions';
import { Table } from '@mantine/core';

export function BankrollTable({elements}:{elements: DisplayBet[]}) {
    const rows = elements.map((element) => (
      <Table.Tr key={element.id}>
        <Table.Td>{element.date}</Table.Td>
        <Table.Td>{element.team1}</Table.Td>
        <Table.Td>{element.team2}</Table.Td>
        <Table.Td>{element.amount}</Table.Td>
        <Table.Td>{element.cote}</Table.Td>
        <Table.Td>{element.status}</Table.Td>
      </Table.Tr>
    ));
  
    return (
      <Table verticalSpacing="md" highlightOnHover withTableBorder>
        <Table.Thead>
          <Table.Tr>
            <Table.Th>Bet date</Table.Th>
            <Table.Th>Team A</Table.Th>
            <Table.Th>Team B</Table.Th>
            <Table.Th>Amount</Table.Th>
            <Table.Th>Cote</Table.Th>
            <Table.Th>Status</Table.Th>
          </Table.Tr>
        </Table.Thead>
        <Table.Tbody>{rows}</Table.Tbody>
      </Table>
    );
  }