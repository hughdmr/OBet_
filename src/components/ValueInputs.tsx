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

export {InputBetNumber, InputIssuesNumber};

