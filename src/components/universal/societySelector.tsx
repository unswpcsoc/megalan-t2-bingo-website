import React, { useState } from 'react';

import { api } from '~/utils/api';
import NotLoggedIn from './NotLoggedIn';
import NotAdmin from './notAdmin';
import { type Session } from 'next-auth';
import { type ClubNamesType } from '../types/clubs';
import { getSocietyNameType } from '../functions/getSocietyNameType';


const SocietySelector = (
  { session, setSocietyId }: { session: Session, setSocietyId: CallableFunction}) => {
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
    <div className="mb-2 mt-4">
      <div className="w-full items-center text-center text-xl text-white">Select Society </div>
    <div className="flex flex-row align-middle items-center justify-start overflow-y-scroll ">
      {clubList?.clubs.map((club: { name: ClubNamesType; id: string }, index) => (
        <div
          key={index}
          className={`m-2 p-4 rounded-xl backdrop-blur-md
          ${selectedCard === club.id ? 'border-green-500 text-green-500 border-4 shadow-xl bg-green-900/20' : 'text-white border-gray-300 border'
            }`}
          onClick={() => handleCardClick(club.id, club.name)}
        >
          <h2 className="text-lg font-bold whitespace-nowrap">{getSocietyNameType(club.name).name}</h2>
          <p className="mt-2">{"this is the clubs description"}</p>
        </div>
      ))}
    </div>
    </div>
  );
};

export default SocietySelector;
