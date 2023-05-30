

const TaskCard = ({
  task,
}: {
  task: { name: string; points: number; id: string };
}) => {
  return (
    <div className="rounded-xl border w-40 h-40 border-white bg-white/10 p-2 text-white backdrop-blur-md">
      <h1 className="text-lg font-bold">{task.name}</h1>
      <p className="">{task.points} Points Upon Completion</p>
    </div>
  );
};
export default TaskCard;
