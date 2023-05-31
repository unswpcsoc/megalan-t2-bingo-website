import React, { useState } from "react";
import { api } from "~/utils/api";
import { type ClubNamesType } from "../types/clubs";
import TaskCard from "./TaskCard";

const TaskSelector = ({societyId, setTaskId}: {societyId: ClubNamesType, setTaskId: CallableFunction}) => {


  // present a list of tasks in the society.

  const [selectedTask, setSelectedTask] = useState('');

  const { data: taskList } = api.quests.getSocietyTasks.useQuery({
    societyNames: [societyId]
  })

  const handleClick = (taskId: string) => {
    if (selectedTask === taskId) {
      setTaskId("");
      setSelectedTask("");

    } else {
      setTaskId(taskId);
      setSelectedTask(taskId);
    } 
  }
  return (
  <div className=" w-full flex flex-row overflow-y-scroll items-center border-2 border-black">
    {taskList?.tasks.map((task: {id: string, name: string, points: number, societyId: string | null;}, index) => {
      return (
      <div key={index} className=" p-1 m-2">
        <div className={`  ${selectedTask === task.id ? 'border-4 border-green-500': ''}`} >
        <button onClick={() => {handleClick(task.id)}}>
          <TaskCard task={task}/>
        </button>
        </div>
      </div>
      );
    })}

  </div>
  );



}


export default TaskSelector;