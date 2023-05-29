import { type NextPage } from "next";
import Layout from "../_layout";
import { PlusIcon } from "@heroicons/react/24/solid";
import CreateTaskForm from "~/components/forms/CreateTaskForm";
import { useState } from "react";
import { useSession } from "next-auth/react";
import NotAdmin from "~/components/universal/notAdmin";
import NotLoggedIn from "~/components/universal/NotLoggedIn";
import { api } from "~/utils/api";
import {
  type CleanClubDataType,
  type ClubNamesType,
} from "~/components/types/clubs";
import { getSocietyNameType } from "~/components/functions/getSocietyNameType";
import AllTasks from "~/components/universal/AllTasks";
import { InformationCircleIcon } from "@heroicons/react/24/outline";

const AdminTasks: NextPage = () => {
  const { data: session } = useSession();
  const [showCreateTask, setShowCreateTask] = useState(false);

  // redundant and hacky way of making the AllTasks component reload

  const { data: clubList } = api.quests.getAdminClubs.useQuery({
    userID: session ? session.id : "",
  });

  const CreateTaskMutation = api.quests.createQuest.useMutation();
  const DeleteTaskMutation = api.quests.deleteQuest.useMutation();

  if (!session) return <NotLoggedIn />;
  if (session.type !== "ADMIN" || !clubList) return <NotAdmin />;

  const societyNames: ClubNamesType[] = clubList.clubs.map((c) => {
    return c.name;
  });

  const handleTaskDelete = async (id: string) => {
    await DeleteTaskMutation.mutateAsync({ taskId: id });
  };

  const handleTaskCreate = async (task: {
    name: string;
    points: number;
    society: ClubNamesType;
  }) => {
    await CreateTaskMutation.mutateAsync({
      name: task.name,
      points: Number(task.points),
      society: task.society,
    });
  };

  return (
    <Layout>
      <main className="flex min-h-screen flex-col items-center">
        <div className="container mt-6 flex flex-col items-center justify-center gap-8 px-4 py-16 ">
          {/* Title */}
          <h1 className="text-center text-4xl font-extrabold tracking-tight text-white sm:text-5xl sm:text-[5rem]">
            Task Manager 🔱
          </h1>

          {/* Header Section + Create Task Button */}
          <div className="h-full w-full gap-4 space-y-4">
            {showCreateTask ? (
              <h1 className="px-2 text-2xl font-bold text-white">
                Creating New Task
              </h1>
            ) : (
              <>
                <div className="flex w-full flex-col items-center text-2xl font-bold text-white">
                  <h3>Displaying Tasks for:</h3>
                  {clubList?.clubs.map((club: CleanClubDataType, index) => {
                    return (
                      <li key={index} className="text-lg">
                        {getSocietyNameType(club.name).name}
                      </li>
                    );
                  })}
                </div>
                <div className="flex w-full flex-row justify-between">
                  <div className="px-2 text-white">
                    <h1 className="text-4xl font-bold">Tasks</h1>
                    <div className="flex flex-row space-x-2 pt-2">
                      <InformationCircleIcon className="h-6 w-6" />
                      <p>
                        Reload the Page if you aren&apos;t seeing your task
                        changes
                      </p>
                    </div>
                  </div>
                  <button
                    className="mx-2 flex h-fit flex-row space-x-2 rounded-lg border border-green-500 bg-green-900/40 p-2 text-green-500"
                    onClick={() => setShowCreateTask(!showCreateTask)}
                  >
                    <h1>Create Task</h1>
                    <PlusIcon className="h-6 w-6 " />
                  </button>
                </div>
              </>
            )}

            {showCreateTask ? (
              <CreateTaskForm
                clubs={clubList.clubs}
                onChange={(
                  res:
                    | false
                    | { name: string; points: number; society: ClubNamesType }
                ) => {
                  void (!res
                    ? console.log("canceled creation")
                    : handleTaskCreate(res));
                  setShowCreateTask(false);
                }}
              />
            ) : (
              <AllTasks
                showDelete={true}
                deleteTask={(taskId: string) => void handleTaskDelete(taskId)}
                societyNames={societyNames}
              />
            )}
          </div>
        </div>
      </main>
    </Layout>
  );
};

export default AdminTasks;
