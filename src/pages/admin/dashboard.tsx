import { type NextPage } from "next";
import Layout from "../_layout";
import { useSession } from "next-auth/react";
import NotLoggedIn from "~/components/universal/NotLoggedIn";
// TODO: Uncomment this before deploying to Production
// import NotAdmin from "~/components/universal/notAdmin";
import Link from "next/link";

const AdminDashboard: NextPage = () => {
  const { data: session } = useSession({
    required: true,
  });
  if (!session) return <NotLoggedIn />;
  // TODO: Uncomment this before deploying to Production
  // if (session.type !== "ADMIN") return <NotAdmin />;

  return (
    <Layout>
      <main className="flex min-h-screen flex-col items-center">
        <div className="container mt-6 flex flex-col items-center justify-center gap-8 px-4 py-16 ">
          <h1 className="text-center text-5xl font-extrabold tracking-tight text-white sm:text-[5rem]">
            Society Admin Dashboard 🦈
          </h1>
        </div>
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2 md:gap-8">
          <Link
            className="flex max-w-md flex-col gap-4 rounded-xl bg-white/10 p-4 text-white hover:bg-white/20"
            href="/admin/tasks"
          >
            <h3 className="text-2xl font-bold">Manage Tasks →</h3>
            <p className="text-lg">Add or delete tasks</p>
          </Link>
          <Link
            className="flex max-w-md flex-col gap-4 rounded-xl bg-white/10 p-4 text-white hover:bg-white/20"
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
