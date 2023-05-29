import { type TaskType } from "@prisma/client";
import { type ClubNamesType } from "../types/clubs";
/*
 * returns full club name and type given a club_name_handle_string in O(1) time complexity.
 */
export const getSocietyNameType = (
  clubStr: ClubNamesType
): { name: string; type: TaskType } => {
  const clubNamesFull = {
    PCS: "PCSoc: Computers and Tech",
    ES: "Esports Club",
    RS: "Riot Games Society",
    KS: "Mechanical Keyboards Society",
    FGS: "Fighting Games Society",
    RGS: "Rhythm Games Society",
    VRS: "Virtual Reality Society",
    GS: "Genshin Impact Society",
    MCS: "Minecraft Society",
    PS: "Pokemon Society",
    SBS: "Smash Brothers Society",
    GDS: "Game Development Society",
    SPONSOR: "Sponsors",
    COSPLAY: "Cosplay",
  };
  const name = clubNamesFull[clubStr];
  let type: TaskType = "SOCIETY";
  if (name === "SPONSOR") type = "SOCIAL";
  if (name === "COSPLAY") type = "COSPLAY";
  return { name, type };
};
