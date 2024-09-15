import { BetGrid, CapitalGrid, GraphDonutGrid, HorizontalStatsGrid } from "@/components/StatsGrid";

export default function Home() {
    return (
      <div>
        <HorizontalStatsGrid />
        <GraphDonutGrid />
        <BetGrid />
        <CapitalGrid />
      </div>
    );
  }