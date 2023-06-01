

const TaskCard = ({
  task,
  selected
}: {
  task: { name: string; points: number; id: string },
  selected: boolean
}) => {
  return (
    <div className={`w-40 h-40 rounded-xl p-2 
    ${selected ? 
      'border-green-500 text-green-500 border-4 shadow-xl bg-green-900/20' 
    : 'text-white border-gray-300 border'}
    `}>
      <h1 className="text-lg font-bold">{task.name}</h1>
      <p className="">{task.points} Points Upon Completion</p>
    </div>
  );
};
export default TaskCard;

// make a regular card without all this weird stuff
