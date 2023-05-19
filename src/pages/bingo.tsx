import { type NextPage } from "next";
import { useSession } from "next-auth/react";
import Layout from "./_layout";
import { api } from "~/utils/api";
import Link from "next/link";
import NotLoggedIn from "~/components/universal/NotLoggedIn";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const Bingo: NextPage = () => {
  // display some profile
  const { status, data: session } = useSession();

  if (!session) return <NotLoggedIn />;
  const handleTaskCompletion = () => {
    console.log("completed");
  };

  if (status === "authenticated")
    return (
      <Layout>
        <h1>{JSON.stringify(session.user, null, 2)}</h1>
        <button
          className="bg-black p-12 text-white"
          onClick={() => handleTaskCompletion()}
        >
          Click to Complete Task
        </button>
      </Layout>
    );

  return <div>loading...</div>;
};

export default Bingo;
