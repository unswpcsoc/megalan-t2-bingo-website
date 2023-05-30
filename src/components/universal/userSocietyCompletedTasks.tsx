import React from "react";
import { api } from "~/utils/api";
import { type ClubNamesType } from "../types/clubs";
import TaskCard from "./taskCard";

const UserCompletedTask = ({societyId, userId}: {societyId: ClubNamesType, userId: string}) => {


  // present a list of tasks in the society.

  const { data: taskList } = api.quests.getUserSocietyCompletedTasks.useQuery({
    userId: userId,
    societyName: societyId
  })

  if (taskList?.tasks === undefined) {
    return <></>;
  }

  return (
  <div className=" flex flex-row overflow-y-scroll border-2 border-black">
    {taskList?.tasks.map((task: {id: string, name: string, points: number, societyId: string | null;}, index) => {
      return (
      <div key={index} className="p-4">
        <TaskCard task={task}/>
      </div>
      );
    })}




  </div>
  );
}

export default UserCompletedTask;