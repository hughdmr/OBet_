// This file contains type definitions for your data.
// It describes the shape of the data, and what data type each property should accept.

export type User = {
    id: string;
    pseudo: string;
    email: string;
    password: string;
  };
  
  export type TableBet = {
    id: string;
    user_id: string;
    date: Date;
    team1: string;
    team2: string;
    amount: number;
    cote: number,
    status: 'pending' | 'won' | 'lost';
  };

  export type DisplayBet = {
    id: string;
    user_id: string;
    date: string;
    team1: string;
    team2: string;
    amount: string;
    cote: number,
    status: 'pending' | 'won' | 'lost';
  };