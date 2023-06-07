import React, { useState } from "react";
import { api } from "~/utils/api";
import { type ClubNamesType } from "./types/clubs";
import TaskCard from "./TaskCard";
import UserCompletedTask from "./UserCompletedTasks";
import { type Task } from "@prisma/client";

/**
 * Horizontal Scrolling Task card selector for admin task completion screen
 */
const TaskSelector = ({
  societyId,
  setTask,
  userId,
}: {
  societyId: ClubNamesType;
  setTask: CallableFunction;
  userId: string;
}) => {
  // present a list of tasks in the society.
  const [selectedTask, setSelectedTask] = useState("");

  const { data: taskList } = api.quests.getUserSocietyCompletedTasks.useQuery({
    societyName: societyId,
    userId: userId,
  });
  const handleClick = (task: Task) => {
    if (selectedTask === task.id) {
      setTask(null);
      setSelectedTask("");
    } else {
      setTask(task);
      setSelectedTask(task.id);
    }
  };

  return (
    <div className="mb-2 mt-2">
      <div className="w-full items-center text-center text-xl text-white">
        Select Task
      </div>
      <div className=" flex w-full flex-row items-center overflow-x-auto  ">
        {taskList?.incompleteTasks.map((task: Task, index) => {
          return (
            <div key={index} className=" m-2 p-1">
              <div>
                <button
                  onClick={() => {
                    handleClick(task);
                  }}
                >
                  {selectedTask === task.id ? (
                    <TaskCard task={task} selected={true} />
                  ) : (
                    <TaskCard task={task} selected={false} />
                  )}
                </button>
              </div>
            </div>
          );
        })}
      </div>
      <div className="mb-2"></div>
      <div className="w-full items-center text-center text-xl text-white">
        Completed Tasks
      </div>
      <UserCompletedTask completedTasks={taskList?.completedTasks} />
    </div>
  );
};

export default TaskSelector;
