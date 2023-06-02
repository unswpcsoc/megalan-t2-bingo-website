import { type MouseEventHandler } from "react";
import { type TaskType } from "@prisma/client";
import { DisplayTaskType } from "../functions/displayTaskType";

const Winner = ({
  show,
  user,
  onClose,
}: {
  show: boolean;
  user: { name: string; category: TaskType };
  onClose: MouseEventHandler;
}) => {
  if (show === false) return <></>;
  return (
    <div
      id="background"
      className="absolute z-40 flex h-screen w-screen flex-col items-center justify-center text-white backdrop-blur-sm"
      onClick={onClose}
    >
      <div
        id="modal"
        className="relative z-50 space-y-12 rounded-2xl border border-white bg-teal-900/20 p-24 backdrop-blur-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        <h1 className="text-center text-6xl font-bold">👑 {user.name} 👑</h1>
        <h3 className="text-4xl">
          Won the{" "}
          <span className="font-bold">{DisplayTaskType(user.category)}</span>{" "}
          Category!!
        </h3>
        <button className="float-right text-lg" onClick={onClose}>
          Close
        </button>
      </div>
    </div>
  );
};
export default Winner;
