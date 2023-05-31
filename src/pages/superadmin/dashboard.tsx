import { type NextPage } from "next";
import Layout from "../_layout";
import { useEffect, useState } from "react";
import { type TaskType } from "@prisma/client";
import Winner from "~/components/modal/winner";

const Dashboard: NextPage = () => {
  const [prizeType, setPrizeType] = useState<TaskType>("SOCIETY");
  const [showWinner, setShowWinner] = useState(false);

  // display the winner for 5 seconds

  useEffect(() => {
    // setDisplayWinner(true);
  }, [prizeType]);

  return (
    <Layout>
      <Winner show={showWinner} onClose={() => setShowWinner(false)} />
      <main className="flex min-h-screen flex-col items-center">
        <div className="container mt-6 flex flex-col items-center justify-center gap-8 px-4 py-16 ">
          <h1 className="text-center text-5xl font-extrabold tracking-tight text-white sm:text-[5rem]">
            Prizes 🎣
          </h1>
        </div>
        <div className="grid grid-cols-3 gap-8 ">
          <button
            onClick={() => {
              setPrizeType("SOCIAL");
              setShowWinner(true);
            }}
            className={`flex max-w-md flex-col gap-4 rounded-xl p-4 text-white ${
              prizeType === "SOCIAL"
                ? "bg-white/20"
                : "bg-white/10 hover:bg-white/20"
            }`}
          >
            <h3 className="text-2xl font-bold">Social Media Quests</h3>
          </button>
          <button
            onClick={() => {
              setPrizeType("COSPLAY");
              setShowWinner(true);
            }}
            className={`flex max-w-md flex-col gap-4 rounded-xl p-4 text-white ${
              prizeType === "COSPLAY"
                ? "bg-white/20"
                : "bg-white/10 hover:bg-white/20"
            }`}
          >
            <h3 className="text-2xl font-bold">Cosplay Quests</h3>
          </button>
          <button
            onClick={() => {
              setPrizeType("SOCIETY");
              setShowWinner(true);
            }}
            className={`flex max-w-md flex-col gap-4 rounded-xl p-4 text-white ${
              prizeType === "SOCIETY"
                ? "bg-white/20"
                : "bg-white/10 hover:bg-white/20"
            }`}
          >
            <h3 className="text-2xl font-bold">Society Quests</h3>
          </button>
        </div>
      </main>
    </Layout>
  );
};

export default Dashboard;
