import { ChartData } from "@/components/Chart";
import "./bankroll.css"
import { BankrollTable } from "@/components/BankrollTable";

export default function Home() {
    return (
      <div className="bankroll-container">
        <ChartData />
        <BankrollTable />
      </div>
    );
  }