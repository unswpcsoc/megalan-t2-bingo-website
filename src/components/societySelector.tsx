import React, { useState } from 'react';

import { api } from '~/utils/api';
import NotLoggedIn from './universal/NotLoggedIn';
import NotAdmin from './universal/notAdmin';
import { type Session } from 'next-auth';
import { type ClubNamesType } from './types/clubs';


const SocietySelector = ({ session, setSocietyId }: { session: Session, setSocietyId: CallableFunction}) => {
  // get all the societies the logged in user is an admin of.
  const { data: clubList } = api.quests.getAdminClubs.useQuery({
    userID: session ? session.id : "",
  });
  const [selectedCard, setSelectedCard] = useState<string>("");

  const handleCardClick = (id: string, name: string) => {
    if (id === selectedCard) {
      setSelectedCard("");
      setSocietyId(null)
    } else {
      setSelectedCard(id);
      setSocietyId(name);
    }
    
  };


  if (!session) return <NotLoggedIn />;
  if (session.type !== "ADMIN") return <NotAdmin />;

  return (
    <div className="border-2 h-2/5 border-black">
    <div className="flex flex-row align-middle justify-start overflow-y-scroll ">
      {clubList?.clubs.map((club: { name: ClubNamesType; id: string }, index) => (
        <div
          key={index}
          className={`max-w-xs mx-2 my-2 p-4 border-4 
          ${selectedCard === club.id ? 'border-blue-500 bg-green-600' : 'border-gray-300'
            }`}
          onClick={() => handleCardClick(club.id, club.name)}
        >
          <h2 className="text-lg font-semibold">{club.name}</h2>
          <p className="mt-2">{"this is the clubs description"}</p>
        </div>
      ))}
    </div>
    </div>
  );
};

export default SocietySelector;
