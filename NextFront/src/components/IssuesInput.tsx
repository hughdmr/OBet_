import { Flex, HoverCard, NumberInput, Text } from '@mantine/core';

const InputIssuesNumber: React.FC<{ setIssuesNumber: (value: number) => void }> = ({ setIssuesNumber }) => (
  <Flex direction="column" align="flex-start">
    <HoverCard shadow="md" position="top-start" offset={5}>
      <HoverCard.Target>
        <NumberInput
          label="Number of issues"
          placeholder="Number between 1 and 100"
          defaultValue={2}
          clampBehavior="strict"
          min={1}
          max={100}
          allowDecimal={false}
          stepHoldDelay={500}
          stepHoldInterval={100}
          onChange={(value) => setIssuesNumber(value as number)}
          style={{ width: '100%' }} // Ensures the input takes up full width
        />
      </HoverCard.Target>
      <HoverCard.Dropdown style={{ maxWidth: 'none', textAlign: 'left', padding: '8px' }}>
        <Text size="xs">
          Should be mutually exclusive and collectively exhaustive events.
        </Text>
      </HoverCard.Dropdown>
    </HoverCard>
  </Flex>
);

export { InputIssuesNumber };
