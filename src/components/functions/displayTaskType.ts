import { type TaskType } from "@prisma/client";

export const DisplayTaskType = (category: TaskType) => {
  const data = {
    SOCIAL: "Social Media",
    SOCIETY: "Society Quests",
    COSPLAY: "Cosplay",
  };
  return data[category];
};
