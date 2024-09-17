import { NumberInput } from '@mantine/core';

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

export {InputIssuesNumber};