import { TrashIcon } from "@heroicons/react/24/outline";

const TaskCard = ({
  task,
  showDelete,
  doDelete,
}: {
  task: { name: string; points: number; id: string };
  showDelete: boolean;
  doDelete: FunctionStringCallback;
}) => {
  return (
    <div className="rounded-xl border border-white bg-white/10 p-4 text-white backdrop-blur-md">
      <h1 className="text-lg font-bold">{task.name}</h1>
      <p className="">{task.points} Points Upon Completion</p>
      {showDelete && (
        <div className="flex w-full flex-row justify-end">
          <button
            className="mt-6 flex h-fit w-fit flex-row space-x-2 rounded-lg border border-red-500 bg-red-900/20 p-2 text-red-500 "
            onClick={() => doDelete(task.id)}
          >
            <h1>Delete Task</h1>
            <TrashIcon className="h-6 w-6" />
          </button>
        </div>
      )}
    </div>
  );
};
export default TaskCard;
