import { type NextPage } from "next";
import Layout from "./_layout";

const Leaderboard: NextPage = () => {
  return (
    <Layout>
      <main className="flex h-full w-full flex-col px-2 pt-24">
        <h3 className="text-center text-2xl font-bold text-white">
          Quests Leaderboards 🦈
        </h3>
        <div className="mt-8 w-full overflow-hidden rounded-lg border">
          <table className=" w-full divide-y divide-white/40 text-white">
            <thead className="w-full bg-white/10 backdrop-blur-lg">
              <tr className="text-left text-base font-semibold sm:text-xl">
                <th className="px-2 py-2 text-center sm:px-4">Rank</th>
                <th className="px-2 py-2 sm:px-4">User</th>
                <th className="px-2 py-2 sm:px-4">Points</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/10 text-left text-sm sm:text-lg">
              <tr className="py-2">
                <td className="white-space-nowrap px-2 py-2 text-center sm:px-4">
                  {1}
                </td>
                <td className="white-space-nowrap px-2 py-2 sm:px-4">
                  {"hari"}
                </td>
                <td className="white-space-nowrap px-2 py-2 sm:px-4">{10}</td>
              </tr>
              <tr className="py-2">
                <td className="white-space-nowrap px-2 py-2 text-center sm:px-4">
                  {2}
                </td>
                <td className="white-space-nowrap px-2 py-2 sm:px-4">
                  {"hari"}
                </td>
                <td className="white-space-nowrap px-2 py-2 sm:px-4">{10}</td>
              </tr>
              <tr className="py-2">
                <td className="white-space-nowrap px-2 py-2 text-center sm:px-4">
                  {3}
                </td>
                <td className="white-space-nowrap px-2 py-2 sm:px-4">
                  {"hari"}
                </td>
                <td className="white-space-nowrap px-2 py-2 sm:px-4">{10}</td>
              </tr>
              <tr className="py-2">
                <td className="white-space-nowrap px-2 py-2 text-center sm:px-4">
                  {4}
                </td>
                <td className="white-space-nowrap px-2 py-2 sm:px-4">
                  {"hari"}
                </td>
                <td className="white-space-nowrap px-2 py-2 sm:px-4">{10}</td>
              </tr>
            </tbody>
          </table>
        </div>
      </main>
    </Layout>
  );
};

export default Leaderboard;
