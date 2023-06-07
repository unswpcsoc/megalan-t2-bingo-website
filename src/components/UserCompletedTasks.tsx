import React from "react";
import TaskCard from "./TaskCard";
import { type Task } from "@prisma/client";

/**
 * Horizontal scrolling List of tasks the user has already completed
 * for admin task completion screen
 */
const UserCompletedTask = ({
  completedTasks,
}: {
  completedTasks: Task[] | undefined;
}) => {
  if (completedTasks === undefined || completedTasks.length === 0) {
    return <></>;
  }

  return (
    <div className=" flex flex-row overflow-y-scroll">
      {completedTasks.map(
        (
          task: {
            id: string;
            name: string;
            points: number;
            societyId: string | null;
          },
          index
        ) => {
          return (
            <div key={index} className="p-4">
              <TaskCard task={task} selected={false} />
            </div>
          );
        }
      )}
    </div>
  );
};

export default UserCompletedTask;
