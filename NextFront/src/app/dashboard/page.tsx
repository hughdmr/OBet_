import { BetGrid, CapitalGrid, GraphDonutGrid, HorizontalStatsGrid } from "@/components/StatsGrid";

export default function Home() {
    return (
      <div>
        <h1>Home - Dashboard</h1>
        <HorizontalStatsGrid />
        <GraphDonutGrid />
        <BetGrid />
        <CapitalGrid />
      </div>
    );
  }