import React, { useState } from "react";
import { api } from "~/utils/api";
import { type ClubNamesType } from "./types/clubs";
import { getSocietyNameType } from "./functions/getSocietyNameType";

const SocietySelector = ({
sessionId,
  setSocietyId,
}: {
  sessionId: string;
  setSocietyId: CallableFunction;
}) => {
  // get all the societies the logged in user is an admin of.
  const { data: clubList } = api.quests.getAdminClubs.useQuery({
    userID: sessionId,
  });
  const [selectedCard, setSelectedCard] = useState<string>("");

  const handleCardClick = (id: string, name: string) => {
    if (id === selectedCard) {
      setSelectedCard("");
      setSocietyId(null);
    } else {
      setSelectedCard(id);
      setSocietyId(name);
    }
  };

  return (
    <div className="mb-2 mt-4">
      <div className="w-full items-center text-center text-xl text-white md:text-left">
        Select Society
      </div>
      <div className="flex flex-row items-center justify-start overflow-x-auto align-middle ">
        {clubList?.clubs.map(
          (club: { name: ClubNamesType; id: string }, index) => (
            <div
              key={index}
              className={`m-2 rounded-xl p-4 backdrop-blur-md w-fit h-
          ${
            selectedCard === club.id
              ? "border-4 border-green-500 bg-green-900/20 text-green-500 shadow-xl"
              : "border border-gray-300 bg-white/5 text-white"
          }`}
              onClick={() => handleCardClick(club.id, club.name)}
            >
              <h2 className="whitespace-nowrap text-lg font-bold">
                {getSocietyNameType(club.name).name}
              </h2>
              {/* <p className="mt-2">{"this is the clubs d}</p> */}
            </div>
          )
        )}
      </div>
    </div>
  );
};

export default SocietySelector;
