import { type NextPage } from "next";
import { useSession } from "next-auth/react";
import Layout from "../_layout";
import { api } from "~/utils/api";
import NotLoggedIn from "~/components/universal/NotLoggedIn";
import UserSearchBar from "~/components/userSearchBar";
const CompleteTask: NextPage = () => {
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

        <div className="flex min-h-full flex-1 flex-col justify-start px-6 py-12 lg:px-8">
          <div className="h-32"></div>
          <div className="flex flex-col h-full justify-evenly"></div>
          <div>Pick User</div>
          <UserSearchBar />
        </div>
      </Layout>
    );

  return <div>loading...</div>;
};

export default CompleteTask;
