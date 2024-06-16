import { db } from '@vercel/postgres';
import { users, bets } from './placeholder-data.js';
import bcrypt from 'bcrypt';

async function seedUsers(client) {
  try {
    await client.sql`CREATE EXTENSION IF NOT EXISTS "uuid-ossp"`;
    // Create the "users" table if it doesn't exist
    const createTable = await client.sql`
      CREATE TABLE IF NOT EXISTS users (
        id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
        pseudo VARCHAR(255) NOT NULL,
        email TEXT NOT NULL UNIQUE,
        password TEXT NOT NULL
      );
    `;

    console.log(`Created "users" table`);

    // Insert data into the "users" table
    const insertedUsers = await Promise.all(
      users.map(async (user) => {
        const hashedPassword = await bcrypt.hash(user.password, 10);
        return client.sql`
        INSERT INTO users (id, pseudo, email, password)
        VALUES (${user.id}, ${user.pseudo}, ${user.email}, ${hashedPassword})
        ON CONFLICT (id) DO NOTHING;
      `;
      }),
    );

    console.log(`Seeded ${insertedUsers.length} users`);

    return {
      createTable,
      users: insertedUsers,
    };
  } catch (error) {
    console.error('Error seeding users:', error);
    throw error;
  }
}

async function seedBets(client) {
  try {
    await client.sql`CREATE EXTENSION IF NOT EXISTS "uuid-ossp"`;

    // Create the "invoices" table if it doesn't exist
    const createTable = await client.sql`
    CREATE TABLE IF NOT EXISTS bets (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    user_id UUID NOT NULL,
    date DATE NOT NULL,
    team1 TEXT NOT NULL,
    team2 TEXT NOT NULL,
    amount FLOAT NOT NULL,
    cote FLOAT NOT NULL,
    status VARCHAR(255) NOT NULL
  );
`;

    console.log(`Created "bets" table`);

    // Insert data into the "invoices" table
    const insertedBets = await Promise.all(
      bets.map(
        (bet) => client.sql`
        INSERT INTO bets (user_id, date, team1, team2, amount, cote, status)
        VALUES (${bet.user_id}, ${bet.date}, ${bet.team1}, ${bet.team2}, ${bet.amount}, ${bet.cote}, ${bet.status})
        ON CONFLICT (id) DO NOTHING;
      `,
      ),
    );

    console.log(`Seeded ${insertedBets.length} bets`);

    return {
      createTable,
      bets: insertedBets,
    };
  } catch (error) {
    console.error('Error seeding bets:', error);
    throw error;
  }
}

async function main() {
  const client = await db.connect();

  await seedUsers(client);
  await seedBets(client);

  await client.end();
}

main().catch((err) => {
  console.error(
    'An error occurred while attempting to seed the database:',
    err,
  );
});
