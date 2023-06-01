import { type NextPage } from "next";
import Layout from "../_layout";
import { useSession } from "next-auth/react";
import NotLoggedIn from "~/components/universal/NotLoggedIn";
import NotAdmin from "~/components/universal/notAdmin";
import Link from "next/link";
import { api } from "~/utils/api";
import { getSocietyNameType } from "~/components/functions/getSocietyNameType";
import { type ClubNamesType } from "~/components/types/clubs";

const AdminDashboard: NextPage = () => {
  const { data: session } = useSession();

  const { data: clubList } = api.quests.getAdminClubs.useQuery({
    userID: session ? session.id : "",
  });

  if (!session) return <NotLoggedIn />;
  if (session.type !== "ADMIN") return <NotAdmin />;

  return (
    <Layout>
      <main className="flex min-h-screen flex-col items-center">
        <div className="container mt-6 flex flex-col items-center justify-center gap-8 px-4 py-16 ">
          <h1 className="text-center text-5xl font-extrabold tracking-tight text-white sm:text-[5rem]">
            {session.user.name}&apos;s Admin Dashboard 🦈
          </h1>
        </div>
        <div className="pb-8 text-2xl font-bold text-white">
          <h3>You are club admin for:</h3>
          {clubList?.clubs.map(
            (club: { name: ClubNamesType; id: string }, index) => {
              return (
                <li key={index} className="text-lg">
                  {getSocietyNameType(club.name).name}
                </li>
              );
            }
          )}
        </div>
        <div className="grid grid-cols-1 gap-4 md:grid-cols-3 md:gap-8">
          <Link
            className="flex max-w-md flex-col gap-4 rounded-xl border border-white bg-white/10 p-4 text-white backdrop-blur-lg"
            href="/admin/completeTask"
          >
            <h3 className="text-2xl font-bold">Complete Task →</h3>
            <p className="text-lg">Authorise a completed task for a user.</p>
          </Link>
          <Link
            className="flex max-w-md flex-col gap-4 rounded-xl border border-white bg-white/10 p-4 text-white backdrop-blur-lg"
            href="/admin/tasks"
          >
            <h3 className="text-2xl font-bold">Manage Tasks →</h3>
            <p className="text-lg">Add or delete tasks</p>
          </Link>
          <Link
            className="flex max-w-md flex-col gap-4 rounded-xl border border-white bg-white/10 p-4 text-white backdrop-blur-lg"
            href="/admin/users"
          >
            <h3 className="text-2xl font-bold">Manage Society Admins →</h3>
            <p className="text-lg">Add or remove Admins from a Society</p>
          </Link>
        </div>
      </main>
    </Layout>
  );
};

export default AdminDashboard;
