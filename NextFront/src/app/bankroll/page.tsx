import "./bankroll.css"
import { ChartData } from "@/components/Chart";
import { BankrollTable } from "@/components/BankrollTable";
import { BetForm } from "@/components/BetForm";

import { fetchBets, fetchFilteredBets } from '@/scripts/data';

export default async function Home() {
    const bets = await fetchBets();
    return (
      <div className="bankroll-container">
        <h1>Bankroll - Graph & Analysis</h1>
        <ChartData />
        <BetForm />
        <BankrollTable elements={bets}/>
      </div>
    );
  }