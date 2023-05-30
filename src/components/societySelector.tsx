import React, { useState } from 'react';

import { api } from '~/utils/api';
import NotLoggedIn from './universal/NotLoggedIn';
import NotAdmin from './universal/notAdmin';
import { type Session } from 'next-auth';



const SocietySelector = ({ session }: { session: Session}) => {
  // get all the societies the logged in user is an admin of.
  const { data: clubList } = api.quests.getAdminClubs.useQuery({
    userID: session ? session.id : "",
  });



  const [selectedCard, setSelectedCard] = useState<string | null>(null);

  const handleCardClick = (id: string) => {
    setSelectedCard(id === selectedCard ? null : id);
  };


  if (!session) return <NotLoggedIn />;
  if (session.type !== "ADMIN") return <NotAdmin />;

  return (
    <div className="flex flex-wrap justify-center">
      {clubList?.clubs.map((club: { name: string; id: string }, index) => (
        <div
          key={index}
          className={`max-w-xs mx-4 my-4 p-4 border ${selectedCard === club.id ? 'border-blue-500' : 'border-gray-300'
            }`}
          onClick={() => handleCardClick(club.id)}
        >
          <h2 className="text-lg font-semibold">{club.name}</h2>
          <p className="mt-2">{"this is the clubs description"}</p>
        </div>
      ))}
    </div>
  );
};

export default SocietySelector;
