import { useState, type MouseEventHandler } from "react";
import { type TaskType } from "@prisma/client";
import { DisplayTaskType } from "../functions/displayTaskType";
import { api } from "~/utils/api";
import Confetti from "canvas-confetti";
import LoadingSpinner from "../LoadingSpinner";


const Winner = ({
  show,
  category,
  onClose,
}: {
  show: boolean;
  category: TaskType;
  onClose: MouseEventHandler;
}) => {

  const [theWinner, setTheWinner] = useState<string>("");
  // if (!category) return <></>;
  const { data: winner } = api.prize.getWinner.useQuery({
    category: category,
  });



  const confettiSettings = {
    particleCount: 500,
    spread: 160,
    startVelocity: 60,
    gravity: 0.5,
    colors: ['#ff0000', '#00ff00', '#0000ff'],
    origin: {},
    angle: 0
  };

  const throwConfetti = () => {
    confettiSettings.origin = {x: 0, y: 1};
    confettiSettings.angle = 90;
    void Confetti(confettiSettings);
    confettiSettings.origin = {x: 1, y: 1};
    confettiSettings.angle = 160;
    void Confetti(confettiSettings);
    confettiSettings.origin = {x: 0, y: 0};
    confettiSettings.angle = 0;
    void Confetti(confettiSettings);
    confettiSettings.origin = {x: 1, y: 0};
    confettiSettings.angle = 180;
    void Confetti(confettiSettings);

  }


  if (show === false) return <></>;
  if (!category) return <></>;
  if (!winner?.user) {
    return(<> 
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
        No Users!
      </div>
      </div>
    </>);}

  // let wList: string[] = [] 
  const l = winner?.user.name;

  setTimeout(() => {
    if (l) {
      setTheWinner(l);
      // console.log(l[0])
      throwConfetti();
    }
  }, 1000);



  // setTimeout(() => {
  //   setWlist(winner?.winners);
  // }, 1000);

  
  // if (!wList) return <LoadingSpinner />;

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
        {!theWinner ? <LoadingSpinner /> :
         <>
        <h1 className="text-center text-6xl font-bold">👑 {theWinner} 👑</h1>
        <h3 className="text-4xl">
          Won the{" "}
          <span className="font-bold">{DisplayTaskType(category)}</span>{" "}
        Category!!
        </h3>
        <button className="float-right text-lg" onClick={(e) => {
          onClose(e);
          setTheWinner("");
          }}>
          Close
        </button>
        </>}
      </div>
    </div>
  );
};
export default Winner;