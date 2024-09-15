import { AreaChart } from '@mantine/charts';
import { data } from './ChartData';

export function ChartData() {
  return (
    <AreaChart
      h={400}
      data={data}
      dataKey="date"
      withLegend
      unit="€"
      tooltipAnimationDuration={200}
      series={[
        { name: 'Winamax', color: 'indigo.6' },
        { name: 'Unibet', color: 'blue.6' },
        { name: 'Betclic', color: 'teal.6' },
      ]}
      curveType="monotone"
    />
  );
}