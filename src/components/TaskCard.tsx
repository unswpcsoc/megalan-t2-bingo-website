/**
 * Single task card with with selected option for admin task card selection screen
 */
const TaskCard = ({
  task,
  selected,
}: {
  task: { name: string; points: number; id: string };
  selected: boolean;
}) => {
  return (
    <div
      className={`h-40 w-40 rounded-xl p-2 
    ${
      selected
        ? "border-4 border-green-500 bg-green-900/20 text-green-500 shadow-xl"
        : "border border-gray-300 text-white"
    }
    `}
    >
      <h1 className="text-lg font-bold">{task.name}</h1>
      <p className="">{task.points} Points Upon Completion</p>
    </div>
  );
};
export default TaskCard;
