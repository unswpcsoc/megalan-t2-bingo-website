import { type NextPage } from "next";
import Layout from "../_layout";
import { useSession } from "next-auth/react";
import NotLoggedIn from "~/components/universal/NotLoggedIn";
import AllUserTasks from "~/components/universal/AllUserTasks";
import NoAdminsAllowed from "~/components/universal/NoAdminsAllowed";

const Quests: NextPage = () => {
  const { data: session } = useSession();

  if (!session) return <NotLoggedIn />;

  if (session.type !== "PARTICIPANT") return <NoAdminsAllowed />;

  return (
    <Layout>
      <main className="flex min-h-screen flex-col items-center">
        <div className="container mt-6 flex flex-col items-center justify-center gap-8 px-4 py-16 ">
          {/* Header */}
          <h1 className="text-center text-5xl font-extrabold tracking-tight text-white sm:text-[5rem]">
            Quests 🐬
          </h1>
          {/* Leaderboard Table */}
          <div className="w-full rounded-lg">
            <AllUserTasks userId={session.user.id} />
          </div>
        </div>
      </main>
    </Layout>
  );
};
export default Quests;
