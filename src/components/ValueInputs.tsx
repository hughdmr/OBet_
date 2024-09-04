'use client'
import { NumberInput, Select } from '@mantine/core';

interface InputIssuesNumberProps {
  setIssuesNumber: (value: number) => void;
}

export function InputIssuesNumber({ setIssuesNumber }: InputIssuesNumberProps) {
  return (
    <NumberInput
      label="Number of issues (independants)"
      placeholder="Number between 2 and 100"
      defaultValue={2}
      clampBehavior="strict"
      min={2}
      max={100}
      allowDecimal={false}
      stepHoldDelay={500}
      stepHoldInterval={100}
      onChange={(value) => setIssuesNumber(value as number)}
    />
  );
}

interface InputBetNumberProps {
  setBetNumber: (value: number) => void;
}

export function InputBetNumber({ setBetNumber }: InputBetNumberProps) {
  return (
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
}

export function InputOperationType() {
  return (
    <Select
      mt="md"
      comboboxProps={{ withinPortal: true }}
      data={['Combined (Intersection with independants events)', 'Soustraction (Privation with independants events)', 'Multichance Separated (Union with combined null)', 'Multichance Unseparated (Union with combined not null)']}
      placeholder="Pick one"
      label="Operation"
    />
  );
}
