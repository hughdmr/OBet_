import { NumberInput, Select } from '@mantine/core';
import classes from './ValueInputs.module.css';

export function InputIssuesNumber() {
  return (
    <NumberInput
      label="Number of issues (independants)"
      placeholder="Number between 2 and 100"
      // error="Invalid number, need number between 2 and 100"
      defaultValue={2}
      clampBehavior="strict"
      min={2}
      max={100}
      allowDecimal={false}
      stepHoldDelay={500}
      stepHoldInterval={100}
    />
  );
}

export function InputBetNumber() {
  return (
    <NumberInput
      label="Number of fair odds you want to calcul for future operations"
      placeholder="Number between 1 and 100"
      // error="Invalid number, need number between 2 and 100"
      defaultValue={1}
      clampBehavior="strict"
      min={1}
      max={100}
      allowDecimal={false}
      stepHoldDelay={500}
      stepHoldInterval={100}
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
        classNames={classes}
      />
  );
}
