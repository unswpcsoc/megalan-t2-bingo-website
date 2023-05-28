import { type NextPage } from "next";
import Layout from "./_layout";
import { api } from "~/utils/api";
import { useSession } from "next-auth/react";
import { useState } from "react";

const Leaderboard: NextPage = () => {
  const { data: session } = useSession();
  const [rank, setRank] = useState(-1);
  const leaderboards = api.quests.getLeaderboardStats.useQuery();
  if (!leaderboards.data) return <h1>Loading ...</h1>;
  console.log("i", leaderboards.data.userIndex);
  if (leaderboards.data.userIndex) {
    console.log(leaderboards.data.userIndex);
    setRank(leaderboards.data.userIndex);
  }

  return (
    <Layout>
      <main className="flex min-h-screen flex-col items-center">
        <div className="container mt-6 flex flex-col items-center justify-center gap-8 px-4 py-16 ">
          <h1 className="text-center text-5xl font-extrabold tracking-tight text-white sm:text-[5rem]">
            Leaderboards 🦈
          </h1>
          {session && (
            <h1 className="text-4xl font-bold text-white">
              @{session.user.name} #{rank}
            </h1>
          )}
          <div className="grid w-full grid-cols-1 gap-4 overflow-hidden rounded-lg border md:gap-8">
            <table className=" w-full divide-y divide-white/40 text-white">
              <thead className="w-full bg-white/10 backdrop-blur-lg">
                <tr className="text-center text-base font-semibold sm:text-xl">
                  <th className="px-2 py-2 sm:px-4">Rank</th>
                  <th className="px-2 py-2 sm:px-4">User</th>
                  <th className="px-2 py-2 sm:px-4">Points</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/10 text-center text-sm sm:text-lg">
                {leaderboards.data?.data.map((user, index) => {
                  return (
                    <tr
                      key={index}
                      className={`py-2 ${
                        index === rank
                          ? "border-2 border-green-500 bg-green-900/40 text-green-500"
                          : ""
                      }`}
                    >
                      <td className="white-space-nowrap px-2 py-2 sm:px-4">
                        {index + 1}
                      </td>
                      <td className="white-space-nowrap px-2 py-2 sm:px-4">
                        {user.name}
                      </td>
                      <td className="white-space-nowrap px-2 py-2 sm:px-4">
                        {user.points}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      </main>
    </Layout>
  );
};

export default Leaderboard;
