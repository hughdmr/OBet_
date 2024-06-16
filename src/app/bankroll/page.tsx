import "./bankroll.css"
import { ChartData } from "@/components/Chart";
import { BankrollTable } from "@/components/BankrollTable";
import { BetForm } from "@/components/BetForm";

export default function Home() {
    return (
      <div className="bankroll-container">
        <ChartData />
        <BetForm />
        <BankrollTable />
      </div>
    );
  }