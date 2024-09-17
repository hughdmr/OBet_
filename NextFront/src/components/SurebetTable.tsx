import React, { useState, useEffect } from 'react';
import { Table, TextInput, Radio, Checkbox } from '@mantine/core'; // replace with actual imports

const SurebetTable: React.FC<{
  issuesNumber: number;
}> = ({ issuesNumber }) => {
  const [selectedRadio, setSelectedRadio] = useState<number | null>(null);
  const [checkboxStates, setCheckboxStates] = useState(
    Array.from({ length: issuesNumber }, () => false)
  );

  // Set default values for odds to 2 and stakes to 10
  const [data, setData] = useState(() => ({
    id: '1',
    match: 'Match',
    odds: Array.from({ length: issuesNumber }, () => issuesNumber), // Default value of 2 for odds
    stakes: Array.from({ length: issuesNumber }, () => '10'), // Default value of 10 for stakes
  }));

  useEffect(() => {
    setData({
      id: '1',
      match: 'Match',
      odds: Array.from({ length: issuesNumber }, () => issuesNumber), // Default value of 2 for odds
      stakes: Array.from({ length: issuesNumber }, () => '10'), // Default value of 10 for stakes
    });
  }, [issuesNumber]);

  const handleInputChange = (index: number, value: string, type: 'odds' | 'stakes') => {
    setData((prevData) => ({
      ...prevData,
      [type]: prevData[type].map((entry, i) => (i === index ? value : entry)),
    }));
  };

  const handleRadioChange = (index: number) => {
    setSelectedRadio(index);
  };

  const handleCheckboxChange = (index: number) => {
    setCheckboxStates((prevState) =>
      prevState.map((checked, i) => (i === index ? !checked : checked))
    );
  };

  const oddsRow = (
    <Table.Tr>
      <Table.Td>{data.match}</Table.Td>
      {data.odds.map((odd, index) => (
        <Table.Td key={`odd-${index}`}>
          <TextInput
            type="text"
            value={odd}
            onChange={(e) => handleInputChange(index, e.target.value, 'odds')}
          />
        </Table.Td>
      ))}
    </Table.Tr>
  );

  const stakesRow = (
    <Table.Tr>
      <Table.Td>Stake</Table.Td>
      {data.stakes.map((stake, index) => (
        <Table.Td key={`stake-${index}`}>
          <TextInput
            type="text"
            value={stake}
            onChange={(e) => handleInputChange(index, e.target.value, 'stakes')}
          />
        </Table.Td>
      ))}
    </Table.Tr>
  );

  const radioRow = (
    <Table.Tr>
      <Table.Td>Fix Profit</Table.Td>
      {data.odds.map((_, index) => (
        <Table.Td key={`radio-${index}`}>
          <Radio
            name="oddsRadio"
            checked={selectedRadio === index}
            onChange={() => handleRadioChange(index)}
          />
        </Table.Td>
      ))}
    </Table.Tr>
  );

  const checkboxRow = (
    <Table.Tr>
      <Table.Td>Share Profit</Table.Td>
      {data.odds.map((_, index) => (
        <Table.Td key={`checkbox-${index}`}>
          <Checkbox
            checked={checkboxStates[index]}
            onChange={() => handleCheckboxChange(index)}
          />
        </Table.Td>
      ))}
    </Table.Tr>
  );

  const fifthRow = (
    <Table.Tr>
      <Table.Td>Benefits</Table.Td>
      {data.odds.map((_, index) => (
        <Table.Td key={`fifth-${index}`}>
          {/* Customize this fifth row as needed */}
        </Table.Td>
      ))}
    </Table.Tr>
  );

  return (
    <div>
      <div className="table-container">
        <div className="table-wrapper">
          <Table>
            <Table.Thead>
              <Table.Tr>
                <Table.Th>Matches</Table.Th>
                {Array.from({ length: issuesNumber }, (_, index) => (
                  <Table.Th key={`header-${index}`}>Odd {index + 1}</Table.Th>
                ))}
              </Table.Tr>
            </Table.Thead>
            <Table.Tbody>
              {oddsRow}
              {stakesRow}
              {radioRow}
              {checkboxRow}
              {fifthRow}
            </Table.Tbody>
          </Table>
        </div>
      </div>
    </div>
  );
};

export default SurebetTable;
