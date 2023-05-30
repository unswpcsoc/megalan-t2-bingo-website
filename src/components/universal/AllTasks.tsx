import { api } from "~/utils/api";
import { type ClubNamesType } from "../types/clubs";
import LoadingSpinner from "./LoadingSpinner";
import TaskCard from "./TaskCard";

const AllTasks = ({
  showDelete,
  deleteTask,
  societyNames,
}: {
  showDelete: boolean;
  deleteTask: FunctionStringCallback;
  societyNames: ClubNamesType[];
}) => {
  const { data: taskData } = api.quests.getSocietyTasks.useQuery({
    societyNames,
  });

  // if the tasks havent loaded yet then show loading spinner
  if (!taskData) return <LoadingSpinner />;

  // if no tasks were found then let the user know
  if (taskData.tasks.length === 0)
    return (
      <h1 className="my-8 p-24 text-center text-2xl font-normal text-white">
        Your society doesn&apos;t have any tasks yet, add some with the create
        task button
      </h1>
    );

  // return all task cards
  return (
    <>
      {/* List of all Existing Tasks */}
      {taskData.tasks.map((task, index) => {
        return (
          <TaskCard
            key={index}
            showDelete={showDelete}
            task={task}
            doDelete={(id: string) => deleteTask(id)}
          />
        );
      })}
    </>
  );
};
export default AllTasks;
