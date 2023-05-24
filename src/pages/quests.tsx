import { type NextPage } from "next";
import { useSession } from "next-auth/react";
import Layout from "./_layout";
import { api } from "~/utils/api";
import NotLoggedIn from "~/components/universal/NotLoggedIn";

const Quests: NextPage = () => {
  // display some profile
  const { status, data: session } = useSession();
  // if unauthenticated, redirect to login page
  if (!session) return <NotLoggedIn />;

  const data = api.quests.getUserQuests.useQuery({ id: session.id });
  const handleTaskCompletion = () => {
    console.log(data);
  };

  if (status === "authenticated")
    return (
      <Layout>
        <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
          <h1>{JSON.stringify(session.user, null, 2)}</h1>
          <h1>USER ID : {JSON.stringify(session.id)}</h1>
          <button
            className="bg-black p-12 text-white"
            onClick={() => handleTaskCompletion()}
          >
            Click to Complete Task
          </button>
        </div>
      </Layout>
    );

  return <div>loading...</div>;
};

export default Quests;
