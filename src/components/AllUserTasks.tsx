import { api } from "~/utils/api";
import LoadingSpinner from "./LoadingSpinner";
import UserTaskCard from "./UserTaskCard";

/**
 * Displays all completed and incomplete tasks of a user
 */
const AllUserTasks = ({ userId }: { userId: string }) => {
  // get users tasks
  const { data: taskData } = api.quests.getUserTasks.useQuery({
    userId: userId,
  });

  // if the tasks haven't loaded yet then show loading spinner
  if (!taskData) return <LoadingSpinner />;

  // return all completed and incomplete tasks
  return (
    <>
      {/* List of all InCompleted Tasks */}
      <h1 className="px-2 text-2xl font-bold text-white">Incomplete Tasks</h1>
      <div className="space-y-4 py-4">
        {taskData.incomplete.map((task, index) => {
          return <UserTaskCard key={index} task={task} />;
        })}
      </div>
      {/* List of all Completed Tasks */}
      <h1 className="px-2 text-2xl font-bold text-white">Completed Tasks</h1>
      <div className="space-y-4 py-4">
        {taskData.complete.map((task, index) => {
          return <UserTaskCard key={index} task={task} />;
        })}
      </div>
    </>
  );
};
export default AllUserTasks;
