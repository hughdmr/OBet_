import { Group, Paper, SimpleGrid, Text } from '@mantine/core';
import { DonutChart, BarChart } from '@mantine/charts';

import {
  IconUserPlus,
  IconDiscount2,
  IconReceipt2,
  IconCoin,
  IconArrowUpRight,
  IconArrowDownRight,
} from '@tabler/icons-react';
import classes from './StatsGrid.module.css';

const icons = {
  user: IconUserPlus,
  discount: IconDiscount2,
  receipt: IconReceipt2,
  coin: IconCoin,
};

const data = [
  { title: 'Bets', icon: 'receipt', value: '13,456', diff: 34 },
  { title: 'Profit', icon: 'coin', value: '4,145', diff: -13 },
  { title: 'ROI', icon: 'discount', value: '745', diff: 18 },
  { title: 'Progression', icon: 'user', value: '188', diff: -30 },
] as const;

export function StatsGrid() {
  const stats = data.map((stat) => {
    const Icon = icons[stat.icon];
    const DiffIcon = stat.diff > 0 ? IconArrowUpRight : IconArrowDownRight;

    return (
      <Paper withBorder p="md" radius="md" key={stat.title}>
        <Group justify="space-between">
          <Text size="xs" c="dimmed" className={classes.title}>
            {stat.title}
          </Text>
          <Icon className={classes.icon} size="1.4rem" stroke={1.5} />
        </Group>

        <Group align="flex-end" gap="xs" mt={25}>
          <Text className={classes.value}>{stat.value}</Text>
          <Text c={stat.diff > 0 ? 'teal' : 'red'} fz="sm" fw={500} className={classes.diff}>
            <span>{stat.diff}%</span>
            <DiffIcon size="1rem" stroke={1.5} />
          </Text>
        </Group>

        <Text fz="xs" c="dimmed" mt={7}>
          Compared to previous month
        </Text>
      </Paper>
    );
  });
  return (
    <div className={classes.root}>
      <SimpleGrid cols={{ base: 1, xs: 2, md: 4 }}>{stats}</SimpleGrid>
    </div>
  );
}

const graphdata = [
  { title: 'Profit per bankroll' },
  { title: 'ROI per bankroll'},
  { title: 'Progression per bankroll' },
] as const;

export const donutvalues = [
  { name: 'USA', value: 400, color: 'indigo.6' },
  { name: 'India', value: 300, color: 'yellow.6' },
  { name: 'Japan', value: 100, color: 'teal.6' },
  { name: 'Other', value: 200, color: 'gray.6' },
];

export function GraphDonutGrid() {
  const stats = graphdata.map((stat) => {

    return (
      <Paper withBorder p="md" radius="md" key={stat.title}>
        <Text size="xs" c="dimmed" className={classes.title}>
          {stat.title}
        </Text>

        <DonutChart size={220} withLabelsLine withLabels data={donutvalues} />
        
      </Paper>
    );
  });
  return (
    <div className={classes.root}>
      <SimpleGrid cols={{ base: 1, xs: 2, md: 3 }}>{stats}</SimpleGrid>
    </div>
  );
}

export const barvalues = [
  { month: 'January', Smartphones: 1200, Laptops: 900, Tablets: 200 },
  { month: 'February', Smartphones: 1900, Laptops: 1200, Tablets: 400 },
  { month: 'March', Smartphones: 400, Laptops: 1000, Tablets: 200 },
  { month: 'April', Smartphones: 1000, Laptops: 200, Tablets: 800 },
  { month: 'May', Smartphones: 800, Laptops: 1400, Tablets: 1200 },
  { month: 'June', Smartphones: 750, Laptops: 600, Tablets: 1000 },
];

export function GraphBarGrid() {
  const stats = graphdata.map((stat) => {

    return (
      <Paper withBorder p="md" radius="md" key={stat.title}>
        <Text size="xs" c="dimmed" className={classes.title}>
          {stat.title}
        </Text>

        <BarChart
          h={300}
          data={barvalues}
          dataKey="month"
          series={[
            { name: 'Smartphones', color: 'violet.6' },
            { name: 'Laptops', color: 'blue.6' },
            { name: 'Tablets', color: 'teal.6' },
          ]}
          tickLine="x"
        />
        
      </Paper>
    );
  });
  return (
    <div className={classes.root}>
      <SimpleGrid cols={{ base: 1, xs: 2, md: 3 }}>{stats}</SimpleGrid>
    </div>
  );
}