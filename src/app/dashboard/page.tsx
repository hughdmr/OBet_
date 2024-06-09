import { GraphBarGrid, GraphDonutGrid, StatsGrid } from "@/components/StatsGrid";

export default function Home() {
    return (
      <div>
        <StatsGrid />
        <GraphDonutGrid />
        <GraphBarGrid />
      </div>
    );
  }