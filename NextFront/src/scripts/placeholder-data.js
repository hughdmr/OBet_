// This file contains placeholder data

const users = [
    {
        id: '410544b2-4001-4271-9855-fec4b6a6442a',
        pseudo: 'Ougo',
        email: 'Ougo@nextmail.com',
        password: 'jesuisOUGO',
    },
    {
        id: '3958dc9e-712f-4377-85e9-fec4b6a6442a',
        pseudo: 'Delba de Oliveira',
        email: 'delba@oliveira.com',
        password: '1ejkdzejkdbazjl67',
    },
    {
        id: '3958dc9e-742f-4377-85e9-fec4b6a6442a',
        pseudo: 'Lee Robinson',
        email: 'lee@robinson.com',
        password: '12DBSHZN6',
    },
    {
        id: '3958dc9e-737f-4377-85e9-fec4b6a6442a',
        pseudo: 'Hector Simpson',
        email: 'hector@simpson.com',
        password: 'qdzqe566',
    },
    {
        id: '50ca3e18-62cd-11ee-8c99-0242ac120002',
        pseudo: 'Steven Tey',
        email: 'steven@tey.com',
        password: 'ztzgzg333114',
    },
    {
        id: '3958dc9e-787f-4377-85e9-fec4b6a6442a',
        pseudo: 'Steph Dietz',
        email: 'steph@dietz.com',
        password: '63GSSS-43',
    }
  ];
  
  const bets = [
    {
        user_id: users[0].id,
        date: '2022-12-06',
        team1: 'PSG',
        team2: 'OM',
        amount: 157,
        cote: 2.4,
        status: 'won',
    },
    {
        user_id: users[1].id,
        date: '2022-12-06',
        team1: 'FC Barcelone',
        team2: 'OM',
        amount: 250,
        cote: 10,
        status: 'lost',
    },
    {
        user_id: users[2].id,
        date: '2022-12-06',
        team1: 'PSG',
        team2: 'Real Madrid',
        amount: 100,
        cote: 3.2,
        status: 'pending',
    },
    {
        user_id: users[3].id,
        date: '2022-12-06',
        team1: 'PSG',
        team2: 'FC Metz',
        amount: 15,
        cote: 2.25,
        status: 'lost',
    },
    {
        user_id: users[4].id,
        date: '2022-12-06',
        team1: 'FC Metz',
        team2: 'OM',
        amount: 10,
        cote: 2.1,
        status: 'lost',
    },
    {
        user_id: users[5].id,
        date: '2022-12-06',
        team1: 'Manchester United',
        team2: 'Bayern Munich',
        amount: 25,
        cote: 1.9,
        status: 'pending',
    },
    {
        user_id: users[1].id,
        date: '2022-12-06',
        team1: 'Liverpool',
        team2: 'AC Milan',
        amount: 35,
        cote: 5,
        status: 'won',
    },
    {
        user_id: users[1].id,
        date: '2022-12-06',
        team1: 'Chelsea',
        team2: 'OM',
        amount: 45,
        cote: 1.8,
        status: 'won',
    },
    {
        user_id: users[2].id,
        date: '2022-12-06',
        team1: 'Ajax',
        team2: 'Napoli',
        amount: 65,
        cote: 2,
        status: 'won',
    },
    {
        user_id: users[1].id,
        date: '2022-12-06',
        team1: 'PSG',
        team2: 'Machester city',
        amount: 75,
        cote: 1.5,
        status: 'won',
    },
  ];
  
export {
    users,
    bets,
  };