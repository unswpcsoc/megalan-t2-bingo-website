import { type NextPage } from "next";
import Layout from "./_layout";

const Leaderboard: NextPage = () => {
  return (
    <Layout>
      <main className="flex min-h-screen flex-col items-center">
        <div className="container mt-6 flex flex-col items-center justify-center gap-8 px-4 py-16 ">
          <h1 className="text-center text-5xl font-extrabold tracking-tight text-white sm:text-[5rem]">
            Leaderboards 🦈
          </h1>
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
                <tr className="py-2">
                  <td className="white-space-nowrap px-2 py-2 sm:px-4">{1}</td>
                  <td className="white-space-nowrap px-2 py-2 sm:px-4">
                    {"hari"}
                  </td>
                  <td className="white-space-nowrap px-2 py-2 sm:px-4">{10}</td>
                </tr>
                <tr className="py-2">
                  <td className="white-space-nowrap px-2 py-2 sm:px-4">{2}</td>
                  <td className="white-space-nowrap px-2 py-2 sm:px-4">
                    {"hari"}
                  </td>
                  <td className="white-space-nowrap px-2 py-2 sm:px-4">{10}</td>
                </tr>
                <tr className="py-2">
                  <td className="white-space-nowrap px-2 py-2 sm:px-4">{3}</td>
                  <td className="white-space-nowrap px-2 py-2 sm:px-4">
                    {"hari"}
                  </td>
                  <td className="white-space-nowrap px-2 py-2 sm:px-4">{10}</td>
                </tr>
                <tr className="py-2">
                  <td className="white-space-nowrap px-2 py-2 sm:px-4">{4}</td>
                  <td className="white-space-nowrap px-2 py-2 sm:px-4">
                    {"hari"}
                  </td>
                  <td className="white-space-nowrap px-2 py-2 sm:px-4">{10}</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </main>
    </Layout>
  );
};

export default Leaderboard;
