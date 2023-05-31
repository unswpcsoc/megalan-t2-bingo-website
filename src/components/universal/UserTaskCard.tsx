const UserTaskCard = ({
  task,
}: {
  task: { name: string; points: number; id: string };
}) => {
  return (
    <div className="rounded-xl border border-white bg-white/10 p-4 text-white backdrop-blur-md">
      <h1 className="text-lg font-bold">{task.name}</h1>
      <p className="">{task.points} Points Upon Completion</p>
    </div>
  );
};
export default UserTaskCard;
