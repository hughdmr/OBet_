import { NumberInput } from '@mantine/core';

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
  
export {InputBetNumber};