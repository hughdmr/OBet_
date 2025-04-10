import { Flex, HoverCard, NumberInput, Text } from '@mantine/core';

const InputBetNumber: React.FC<{ setBetNumber: (value: number) => void }> = ({ setBetNumber }) => (
  <Flex direction="column" align="flex-start">
    <HoverCard shadow="md" position="top-start" offset={5}>
      <HoverCard.Target>
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
          style={{ width: '100%' }} // Ensures the input takes up full width
        />
      </HoverCard.Target>
      <HoverCard.Dropdown style={{ maxWidth: 'none', textAlign: 'left', padding: '8px' }}>
        <Text size="xs">
        Matches for which you want to calculate the fair odds.        
        </Text>
      </HoverCard.Dropdown>
    </HoverCard>
  </Flex>
);

export { InputBetNumber };
