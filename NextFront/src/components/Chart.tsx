import { AreaChart } from '@mantine/charts';
import { fetchBankroll } from '@/scripts/data';

export async function ChartData() {
  const data = await fetchBankroll();
  return (
    <AreaChart
      h={400}
      data={data}
      dataKey="date"
      withLegend
      unit="€"
      tooltipAnimationDuration={200}
      series={[
        { name: 'amount', color: 'indigo.6' }
      ]}
      curveType="monotone"
    />
  );
}