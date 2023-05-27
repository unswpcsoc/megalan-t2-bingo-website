import { type NextPage } from "next";
import Layout from "../_layout";
import { PlusIcon, TrashIcon } from "@heroicons/react/24/solid";
import CreateTaskForm from "~/components/forms/CreateTaskForm";
import { useState } from "react";

const AdminTasks: NextPage = () => {
  const [showCreateTask, setShowCreateTask] = useState(false);
  const handleTaskDelete = (id: string) => {
    console.log("taskID", id);
  };

  const handleTaskCreate = (task: { name: string; points: number }) => {
    console.log("created task details", task);
  };

  return (
    <Layout>
      <main className="flex min-h-screen flex-col items-center">
        <div className="container mt-6 flex flex-col items-center justify-center gap-8 px-4 py-16 ">
          {/* Title */}
          <h1 className="text-center text-4xl font-extrabold tracking-tight text-white sm:text-5xl sm:text-[5rem]">
            {"Rhythm Game Society's"} 🔱
          </h1>

          {/* Header Section + Create Task Button */}
          <div className="w-full gap-4 space-y-4">
            {showCreateTask ? (
              <h1 className="px-2 text-2xl font-bold text-white">
                Creating New Task
              </h1>
            ) : (
              <div className="flex w-full flex-row justify-between">
                <h1 className="px-2 text-4xl font-bold text-white">Tasks</h1>
                <button
                  className="mx-2 flex flex-row space-x-2 rounded-lg border border-green-500 bg-green-900/40 p-2 text-green-500"
                  onClick={() => setShowCreateTask(!showCreateTask)}
                >
                  <h1>Create Task</h1>
                  <PlusIcon className="h-6 w-6 " />
                </button>
              </div>
            )}
            {showCreateTask ? (
              <CreateTaskForm
                onChange={(res: false | { name: string; points: number }) => {
                  !res
                    ? console.log("canceled creation")
                    : handleTaskCreate(res);
                  setShowCreateTask(false);
                }}
              />
            ) : (
              <>
                {/* List of all Existing Tasks */}
                {DummyTasks.map((task, index) => {
                  return (
                    <Task
                      key={index}
                      task={{
                        name: "Complete a level 15 svdx with your friend.",
                        points: 100,
                      }}
                      doDelete={() => handleTaskDelete(task.id)}
                    />
                  );
                })}
              </>
            )}
          </div>
        </div>
      </main>
    </Layout>
  );
};

const Task = ({
  task,
  doDelete,
}: {
  task: { name: string; points: number };
  doDelete: CallableFunction;
}) => {
  const handleClick = () => {
    doDelete();
  };
  return (
    <div className="rounded-xl border border-white bg-white/10 p-4 text-white backdrop-blur-md">
      <h1 className="text-lg font-bold">{task.name}</h1>
      <p className="">{task.points} Points Upon Completion</p>
      <div className="flex w-full flex-row justify-end">
        <button
          className="mt-6 flex h-fit w-fit flex-row space-x-2 rounded-lg border border-red-500 bg-red-900/20 p-2 text-red-500 "
          onClick={handleClick}
        >
          <h1>Delete Task</h1>
          <TrashIcon className="h-6 w-6" />
        </button>
      </div>
    </div>
  );
};

const DummyTasks = [
  {
    name: "Complete a level 15 svdx with your friend.",
    points: 100,
    id: "qweuqw9r797qrhajw",
  },
  {
    name: "Complete a level 15 svdx with your friend.",
    points: 100,
    id: "qweuqw9r797qrhajw",
  },
  {
    name: "Complete a level 15 svdx with your friend.",
    points: 100,
    id: "qweuqw9r797qrhajw",
  },
  {
    name: "Complete a level 15 svdx with your friend.",
    points: 100,
    id: "qweuqw9r797qrhajw",
  },
  {
    name: "Complete a level 15 svdx with your friend.",
    points: 100,
    id: "qweuqw9r797qrhajw",
  },
];

export default AdminTasks;
