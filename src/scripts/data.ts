import { sql } from '@vercel/postgres';
import { User, TableBet } from './definitions'

const formatCurrency = (amount: number) => {
    return amount.toLocaleString('fr-FR', {
      style: 'currency',
      currency: 'EUR',
    });
  };

export async function fetchUsers() {
  // Add noStore() here to prevent the response from being cached.
  // This is equivalent to in fetch(..., {cache: 'no-store'}).

  try {
    const data = await sql<User>`SELECT * FROM users`;
    return data.rows;
  } catch (error) {
    console.error('Database Error:', error);
    throw new Error('Failed to fetch users.');
  }
}

export async function fetchBets() {
  try {
    const data = await sql<TableBet>`
      SELECT bets.id, bets.date, bets.team1, bets.team2, bets.amount, bets.cote, bets.status, users.id
      FROM bets
      JOIN users ON bets.user_id = users.id
      ORDER BY bets.date DESC
      LIMIT 25`;

    const latestBets = data.rows.map((bet) => ({
      ...bet,
      date: bet.date.toLocaleDateString().toString(),
      amount: formatCurrency(bet.amount),
    }));
    return latestBets;
  } catch (error) {
    console.error('Database Error:', error);
    throw new Error('Failed to fetch the latest bets.');
  }
}

export async function fetchFilteredBets(query: string) {
  try {
    const data = await sql<TableBet>`
      SELECT
        bets.id,
        bets.date,
        bets.team1,
        bets.team2,
        bets.amount,
        bets.cote,
        bets.status,
        users.id
      FROM bets
      JOIN users ON bets.user_id = users.id
      WHERE
        users.pseudo ILIKE ${`%${query}%`} OR
        bets.team1 ILIKE ${`%${query}%`} OR
        bets.team2 ILIKE ${`%${query}%`} OR
        bets.amount::text ILIKE ${`%${query}%`} OR
        bets.date::text ILIKE ${`%${query}%`} OR
        bets.status ILIKE ${`%${query}%`}
      ORDER BY bets.date
    `;

    const bets = data.rows.map((bet) => ({
        ...bet,
        date: bet.date.toLocaleDateString().toString(),
        amount: formatCurrency(bet.amount),
      }));
    return bets;

  } catch (error) {
    console.error('Database Error:', error);
    throw new Error('Failed to fetch bets.');
  }
}


