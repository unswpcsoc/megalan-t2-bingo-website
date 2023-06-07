import { type TaskType } from "@prisma/client";

// returns the category based on taskType from the database
export const DisplayTaskType = (category: TaskType) => {
  const data = {
    SOCIAL: "Social Media",
    SOCIETY: "Society Quests",
    COSPLAY: "Cosplay",
  };
  return data[category];
};
