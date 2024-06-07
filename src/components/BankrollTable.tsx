"use client"

import { Table } from '@mantine/core';

const elements = [
    { position: 6, mass: 12.011, symbol: 'AC Ajaccio', name: 'Olympique lyonnais' },
    { position: 7, mass: 14.007, symbol: 'PSG', name: 'Metz FC' },
    { position: 39, mass: 88.906, symbol: 'Nîmes Olympique', name: 'Racing Club de Strasbourg' },
    { position: 56, mass: 137.33, symbol: 'Chamois niortais football club', name: 'OGC Nice' },
    { position: 58, mass: 140.12, symbol: 'FC Nantes', name: 'Girondins de Bordeaux' },
    { position: 6, mass: 12.011, symbol: 'Stade brestois 29', name: 'AJ Auxerre' },
    { position: 6, mass: 12.011, symbol: 'AC Ajaccio', name: 'Olympique lyonnais' },
    { position: 7, mass: 14.007, symbol: 'PSG', name: 'Metz FC' },
    { position: 39, mass: 88.906, symbol: 'Nîmes Olympique', name: 'Racing Club de Strasbourg' },
    { position: 56, mass: 137.33, symbol: 'Chamois niortais football club', name: 'OGC Nice' },
    { position: 58, mass: 140.12, symbol: 'FC Nantes', name: 'Girondins de Bordeaux' },
    { position: 6, mass: 12.011, symbol: 'Stade brestois 29', name: 'AJ Auxerre' },
    { position: 6, mass: 12.011, symbol: 'AC Ajaccio', name: 'Olympique lyonnais' },
    { position: 7, mass: 14.007, symbol: 'PSG', name: 'Metz FC' },
    { position: 39, mass: 88.906, symbol: 'Nîmes Olympique', name: 'Racing Club de Strasbourg' },
    { position: 56, mass: 137.33, symbol: 'Chamois niortais football club', name: 'OGC Nice' },
    { position: 58, mass: 140.12, symbol: 'FC Nantes', name: 'Girondins de Bordeaux' },
    { position: 6, mass: 12.011, symbol: 'Stade brestois 29', name: 'AJ Auxerre' },
    ];

export function BankrollTable() {
    const rows = elements.map((element) => (
      <Table.Tr key={element.name}>
        <Table.Td>{element.position}</Table.Td>
        <Table.Td>{element.name}</Table.Td>
        <Table.Td>{element.symbol}</Table.Td>
        <Table.Td>{element.mass}€</Table.Td>
      </Table.Tr>
    ));
  
    return (
      <Table verticalSpacing="md" highlightOnHover withTableBorder>
        <Table.Thead>
          <Table.Tr>
            <Table.Th>Bet number</Table.Th>
            <Table.Th>Team or Player A</Table.Th>
            <Table.Th>Team or Player B</Table.Th>
            <Table.Th>Amount</Table.Th>
          </Table.Tr>
        </Table.Thead>
        <Table.Tbody>{rows}</Table.Tbody>
      </Table>
    );
  }