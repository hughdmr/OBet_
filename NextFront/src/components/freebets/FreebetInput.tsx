import { Flex, HoverCard, NumberInput, Text } from '@mantine/core';

  const InputFreebets: React.FC<{ setFreebets: (value: number) => void }> = ({ setFreebets }) => (
    <Flex direction="column" align="flex-start" style={{ display: 'flex', flexDirection: 'column', gap: '20px', height: 'auto' }}>
      <HoverCard shadow="md" position="top-start" offset={5}>
        <HoverCard.Target>
          <NumberInput
            label="Freebet Amount"
            clampBehavior="strict"
            hideControls
            min={1}
            allowDecimal={true}
            stepHoldDelay={500}
            stepHoldInterval={100}
            onChange={(value) => setFreebets(value as number)}
            style={{ width: '120px' }} // directly applied width
          />
        </HoverCard.Target>
        <HoverCard.Dropdown style={{ maxWidth: 'none', textAlign: 'left', padding: '8px' }}>
          <Text size="xs">
          Amount of freebet you want to convert
          </Text>
        </HoverCard.Dropdown>
      </HoverCard>
    </Flex>
  );

export {InputFreebets};