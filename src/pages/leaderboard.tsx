/* eslint-disable @typescript-eslint/no-unsafe-call */
import { type NextPage } from "next";
import Layout from "./_layout";

const Leaderboard: NextPage = () => {
  return (
    <Layout>
      <main className="container flex h-full w-full flex-col items-center pt-24">
        <h3 className="text-center text-2xl font-bold text-white">
          Quests Leaderboards
        </h3>
        <div className="">
          <table className=" divide-y divide-white/40  text-white">
            <thead className="bg-white/10 ">
              <tr className="text-left text-xl font-semibold">
                <th className="px-4 py-2">Rank</th>
                <th className="px-4 py-2">User</th>
                <th className="px-4 py-2">Points</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/10  text-center text-lg">
              <tr className="py-2">
                <td className="white-space-nowrap px-4 py-2">{1}</td>
                <td className="white-space-nowrap px-4 py-2 text-left">
                  {"hari"}
                </td>
                <td className="white-space-nowrap px-4 py-2">{10}</td>
              </tr>
              <tr className="py-2">
                <td className="white-space-nowrap px-4 py-2 ">{2}</td>
                <td className="white-space-nowrap px-4 py-2 text-left">
                  {"hari"}
                </td>
                <td className="white-space-nowrap px-4 py-2 text-center">
                  {10}
                </td>
              </tr>
              <tr className="py-2">
                <td className="white-space-nowrap px-4 py-2">{3}</td>
                <td className="white-space-nowrap px-4 py-2 text-left">
                  {
                    "ASFOUHAISUFHAKSHFKALSJHFKLAJSHFLKAJSHFLKAJSHFLKJAHSFLKJAHSLFKJHASLKJH"
                  }
                </td>
                <td className="white-space-nowrap px-4 py-2">{10}</td>
              </tr>
              {/* {data.map(
                  (user: { name: string; points: number }, index: number) => {
                    return (
                      <tr className="py-2" key={index}>
                        <td className="white-space-nowrap">{index + 1}</td>
                        <td className="white-space-nowrap">{user.name}</td>
                        <td className="white-space-nowrap">{user.points}</td>
                      </tr>
                    );
                  }
                )} */}
            </tbody>
          </table>
        </div>
      </main>
    </Layout>
  );
};

export default Leaderboard;
