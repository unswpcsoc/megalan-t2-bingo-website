import { api } from "~/utils/api";
import LoadingSpinner from "./LoadingSpinner";
import UserTaskCard from "./UserTaskCard";

const AllUserTasks = ({ userId }: { userId: string }) => {
  // get users tasks
  const { data: taskData } = api.quests.getUserTasks.useQuery({
    userId,
  });

  // if the tasks havent loaded yet then show loading spinner
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
