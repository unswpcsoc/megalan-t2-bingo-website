import { getSocietyNameType } from "../functions/getSocietyNameType";
import { type ClubNamesType } from "../types/clubs";

const UserTaskCard = ({
  task,
}: {
  task: { name: string; points: number; id: string; societyName: ClubNamesType| undefined };
}) => {
  return (
    <div className="rounded-xl border border-white bg-white/10 p-4 text-white backdrop-blur-md">
      <h1 className="text-lg font-bold">{task.name}</h1>
      {task.societyName && 
      <h2 className="text-base"> {getSocietyNameType(task.societyName).name}</h2> }
      <p className="">{task.points} Points Upon Completion</p>
    </div>
  );
};
export default UserTaskCard;
