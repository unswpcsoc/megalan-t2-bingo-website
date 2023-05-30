import { type NextPage } from "next";
import { useSession } from "next-auth/react";
import Layout from "../_layout";
import { api } from "~/utils/api";
import NotLoggedIn from "~/components/universal/NotLoggedIn";
import UserSearchBar from "~/components/userSearchBar";
import { useState } from "react";

const CompleteTask: NextPage = () => {
  // display some profile
  const { status, data: session } = useSession();
  const [taskId, setTaskId] = useState('');
  const [societyId, setSocietyId] = useState('');
  const [userId, setUserID] = useState('');

  // if unauthenticated, redirect to login page
  if (!session) return <NotLoggedIn />;

  // First step: Pick User

  // Second Step Pick Society

  // Third Step Pick Task



  return (
    <Layout>
      <main className="flex min-h-screen flex-col items-center ">
        <div className="container  mt-6 flex flex-col justify-center items-center px-4 py-16 ">
          <h1 className="text-center text-5xl  font-extrabold tracking-tight text-white sm:text-[5rem]">
            Complete Quests 🔱
          </h1>

          <div className="flex w-full flex-col h-full justify-evenly py-5">
            <div>Pick Participant</div>
            <UserSearchBar setUserID={setUserID}/>
            

            <div className="h-20 overflow-scroll">


            </div>
          </div>
        </div>
      </main>


    </Layout>
  );

  return <div>loading...</div>;
};

export default CompleteTask;
