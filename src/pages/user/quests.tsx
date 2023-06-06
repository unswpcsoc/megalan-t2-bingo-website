import { type NextPage } from "next";
import Layout from "../_layout";
import { useSession } from "next-auth/react";
import { useRouter } from "next/router";
import AllUserTasks from "~/components/AllUserTasks";
import NotLoggedIn from "~/components/NotLoggedIn";

/**
 * User Dashboard where users can see their completed and incomplete quests
 */
const Quests: NextPage = () => {
  const { data: session } = useSession();
  const router = useRouter();

  if (!session) return <NotLoggedIn />;
  // if the logged in user is an admin take them to their dashboard
  if (session.type === "ADMIN") {
    router
      .push("/admin/dashboard")
      .then((res) => console.log(res))
      .catch((err) => console.error(err));
    // return <NoAdminsAllowed />;
  }

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
            <AllUserTasks userId={session.id} />
          </div>
        </div>
      </main>
    </Layout>
  );
};
export default Quests;
