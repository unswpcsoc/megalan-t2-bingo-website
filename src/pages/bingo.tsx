import { type NextPage } from "next";
import { getSession, useSession } from "next-auth/react";
import Layout from "./_layout";
import NotLoggedIn from "~/components/universal/NotLoggedIn";
import { getToken } from "next-auth/jwt";

const Bingo: NextPage = () => {
  // display some profile
  const { data: session } = useSession({
    required: true,
  });

  // const t = getToken(session?.user)
  // if unauthenticated, redirect to login page
  if (!session) return <NotLoggedIn />;

  // const data = api.bingo.getBingoGrid.useQuery({ email: session?.user.email });
  const handleTaskCompletion = () => {
    console.log(session);
  };

  return (
    <Layout>
      <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
        <h1>{JSON.stringify(session, null, 2)}</h1>
        <button
          className="bg-black p-12 text-white"
          onClick={() => handleTaskCompletion()}
        >
          Click to Complete Task
        </button>
      </div>
    </Layout>
  );
};

export default Bingo;
