import { api } from "~/utils/api";
import Layout from "../_layout";
import LoadingSpinner from "~/components/universal/LoadingSpinner";
import React, { useEffect, useState } from "react";
import Confetti from 'canvas-confetti';
import { TaskType } from "@prisma/client";




// const Test = () => {
//   const { data: winner } = api.prize.getWinner.useQuery({
//     category: "SOCIETY",
//   });

//   if (!winner) return <LoadingSpinner />;
//   return (
//     <Layout>
//       <main className="flex h-full w-full flex-col justify-center text-white">
//         <h1>Hello</h1>
//         <h1>{JSON.stringify(winner, null, 4)}</h1>
//       </main>
//     </Layout>
//   );
// };
// export default Test;



const RafflePage = () => {

  

  const [category, setCategory]= useState<TaskType | undefined>(undefined);




  const confettiSettings = {
    particleCount: 500,
    spread: 160,
    startVelocity: 60,
    gravity: 0.1,
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

  return (
        <Layout>
          <main className="flex h-full w-full flex-col justify-center text-white">
            <h1>Hello</h1>
            <h1>{JSON.stringify("vishnu", null, 4)}</h1>
          </main>
        </Layout>
      );

  // // void Confetti(confettiSettings);
  // useEffect(() => {
  //   // Initialize confetti
  //   // Clean up confetti when component is unmounted
  //   return () => {
  //     Confetti.reset();
  //   };
  // }, []);

  // list of three cards 

  return (
    <Layout>
    <div className="h-screen flex items-center justify-center">
    





     
    </div>
    </Layout>
  );
};

export default RafflePage;


