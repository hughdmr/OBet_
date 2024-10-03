import { Flex, HoverCard, NumberInput, Text } from '@mantine/core';

const InputKellyOdd: React.FC<{ setKellyOdd: (value: number) => void }> = ({ setKellyOdd }) => (
  <Flex direction="column" align="flex-start" style={{ display: 'flex', flexDirection: 'column', gap: '20px', height: 'auto' }}>
    <HoverCard shadow="md" position="top-start" offset={5}>
      <HoverCard.Target>
        <NumberInput
          label="Odd"
          clampBehavior="strict"
          hideControls
          min={1}
          allowDecimal={true}
          stepHoldDelay={500}
          stepHoldInterval={100}
          onChange={(value) => setKellyOdd(value as number)}
          style={{ width: '120px' }} // directly applied width
        />
      </HoverCard.Target>
      <HoverCard.Dropdown style={{ maxWidth: 'none', textAlign: 'left', padding: '8px' }}>
        <Text size="xs">
          Odd you want to calculate value
        </Text>
      </HoverCard.Dropdown>
    </HoverCard>
  </Flex>
);

const InputKellyFOdd: React.FC<{ setKellyFOdd: (value: number) => void }> = ({ setKellyFOdd }) => (
  <Flex direction="column" align="flex-start" style={{ display: 'flex', flexDirection: 'column', gap: '20px', height: 'auto' }}>
    <HoverCard shadow="md" position="top-start" offset={5}>
      <HoverCard.Target>
        <NumberInput
          label="Fair Odd"
          clampBehavior="strict"
          hideControls
          min={1}
          allowDecimal={true}
          stepHoldDelay={500}
          stepHoldInterval={100}
          onChange={(value) => setKellyFOdd(value as number)}
          style={{ width: '120px' }} // directly applied width
        />
      </HoverCard.Target>
      <HoverCard.Dropdown style={{ maxWidth: 'none', textAlign: 'left', padding: '8px' }}>
        <Text size="xs">
          Fair Odd you want to compare with
        </Text>
      </HoverCard.Dropdown>
    </HoverCard>
  </Flex>
);

export { InputKellyFOdd, InputKellyOdd };
