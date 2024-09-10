import React, { useState } from 'react';
import { NumberInput, Select, Button } from '@mantine/core';
import './ValueInputs.module.css';

// Composant InputIssuesNumber
const InputIssuesNumber: React.FC<{ setIssuesNumber: (value: number) => void }> = ({ setIssuesNumber }) => (
  <NumberInput
    label="Number of issues (independants)"
    placeholder="Number between 2 and 20"
    defaultValue={2}
    clampBehavior="strict"
    min={2}
    max={20}
    allowDecimal={false}
    stepHoldDelay={500}
    stepHoldInterval={100}
    onChange={(value) => setIssuesNumber(value as number)}
  />
);

// Composant InputBetNumber
const InputBetNumber: React.FC<{ setBetNumber: (value: number) => void }> = ({ setBetNumber }) => (
  <NumberInput
    label="Number of matches"
    placeholder="Number between 1 and 100"
    defaultValue={1}
    clampBehavior="strict"
    min={1}
    max={100}
    allowDecimal={false}
    stepHoldDelay={500}
    stepHoldInterval={100}
    onChange={(value) => setBetNumber(value as number)}
  />
);

interface InputOperationTypeProps {
  setOperationType: (value: string | null) => void;
  handleCalculate: () => void; // Renommé pour la clarté
}

const InputOperationType: React.FC<InputOperationTypeProps> = ({ setOperationType, handleCalculate }) => {
  const [selectedOperation, setSelectedOperation] = useState<string | null>(null);

  const handleChange = (value: string | null) => {
    setSelectedOperation(value);
    setOperationType(value);
  };

  return (
    <div>
      <Select
        mt="md"
        comboboxProps={{ withinPortal: true }}
        data={[
          'Combined (Intersection with independants events)',// P(A∩B) = P(A)xP(B)) = M1-FO1 x M1-FO2 x M1-FO3 x ...',
          'Soustraction (Privation with inclued events)', // P(A/B) = P(A)-P(A∩B) = P(A)-P(B)) = 1/(1/M1-FO1 - 1/M1-FO2 - 1/M1-FO3 - ... )',
          'Multichance of independants events (Union : P(A∪B) = P(A)+P(B)-P(A∩B) = P(A)+P(B)-P(A)xP(B))',
          'Multichance of dependants events (Union : P(A∪B) = P(A)+P(B)-P(A∩B))',
        ]}
        placeholder="Pick one"
        label="Operation"
        onChange={handleChange}
      />
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
{selectedOperation && (
        <Button 
        mt="md"
        onClick={handleCalculate} // Appeler handleCalculate ici
      >
        Calculate Operation
      </Button>
)}
    </div>
    </div>
  );
};

export { InputOperationType, InputBetNumber, InputIssuesNumber};

