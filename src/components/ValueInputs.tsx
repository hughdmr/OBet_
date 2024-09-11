import React, { useState } from 'react';
import { NumberInput, Select, Button } from '@mantine/core';
import './ValueInputs.module.css';

// Composant InputIssuesNumber
const InputIssuesNumber: React.FC<{ setIssuesNumber: (value: number) => void }> = ({ setIssuesNumber }) => (
  <NumberInput
    label="Number of issues"
    description="Should be mutually exclusive and collectively exhaustive events."
    placeholder="Number between 1 and 100"
    defaultValue={2}
    clampBehavior="strict"
    min={1}
    max={100}
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
    description="Matches for which you want to calculate the fair odds."
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
        onChange={handleChange}
        style={{ width: '400px' }} // Fixer la largeur du Select à 200px
      />
      <div style={{ width: '150px'}}> {/* Container pour le bouton à droite */}
        {selectedOperation && (
          <Button 
            mt="md"
            onClick={handleCalculate}
            style={{ whiteSpace: 'nowrap' }} // Pour empêcher le texte de se couper
          >
            Calculate Operation
          </Button>
        )}
      </div>
    </div>
  );

};
export { InputOperationType, InputBetNumber, InputIssuesNumber};

