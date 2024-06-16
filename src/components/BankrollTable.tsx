"use client"

import { Table } from '@mantine/core';

const elements = [
    { date: 6, amount: 12.011, team1: 'AC Ajaccio', team2: 'Olympique lyonnais', cote: 1.5, status: "lost" },
    { date: 7, amount: 14.007, team1: 'PSG', team2: 'Metz FC', cote: 1.8, status: "won" },
    { date: 39, amount: 88.906, team1: 'Nîmes Olympique', team2: 'Racing Club de Strasbourg', cote: 2.3, status: "won" },
    { date: 56, amount: 137.33, team1: 'Chamois niortais football club', team2: 'OGC Nice', cote: 1.4, status: "lost" },
    { date: 58, amount: 140.12, team1: 'FC Nantes', team2: 'Girondins de Bordeaux', cote: 2.8, status: "won" },
    { date: 6, amount: 12.011, team1: 'Stade brestois 29', team2: 'AJ Auxerre', cote: 3.1, status: "won" },
    { date: 6, amount: 12.011, team1: 'AC Ajaccio', team2: 'Olympique lyonnais', cote: 2.3, status: "pending" },
    { date: 7, amount: 14.007, team1: 'PSG', team2: 'Metz FC', cote: 2.3, status: "lost" },
    { date: 39, amount: 88.906, team1: 'Nîmes Olympique', team2: 'Racing Club de Strasbourg', cote: 2.3, status: "won" },
    { date: 56, amount: 137.33, team1: 'Chamois niortais football club', team2: 'OGC Nice', cote: 2.3, status: "won" },
    { date: 58, amount: 140.12, team1: 'FC Nantes', team2: 'Girondins de Bordeaux', cote: 3.1, status: "won" },
    { date: 6, amount: 12.011, team1: 'Stade brestois 29', team2: 'AJ Auxerre', cote: 2.5, status: "lost" },
    { date: 6, amount: 12.011, team1: 'AC Ajaccio', team2: 'Olympique lyonnais', cote: 3.1, status: "pending" },
    ];

export function BankrollTable() {
    const rows = elements.map((element) => (
      <Table.Tr key={element.team1}>
        <Table.Td>{element.date}</Table.Td>
        <Table.Td>{element.team1}</Table.Td>
        <Table.Td>{element.team2}</Table.Td>
        <Table.Td>{element.amount}€</Table.Td>
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