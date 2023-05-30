import { type NextPage } from "next";
import { useSession } from "next-auth/react";
import Layout from "../_layout";
import { api } from "~/utils/api";
import NotLoggedIn from "~/components/universal/NotLoggedIn";
import UserSearchBar from "~/components/universal/userSearchBar";
import { useState } from "react";
import SocietySelector from "~/components/universal/societySelector";
import TaskSelector from "~/components/universal/taskSelector";
import { ClubType } from "@prisma/client";
import { ClubNamesType } from "~/components/types/clubs";
import UserCompletedTask from "~/components/universal/userSocietyCompletedTasks";

const CompleteTask: NextPage = () => {
  // display some profile
  const { status, data: session } = useSession();
  const [taskId, setTaskId] = useState('');
  const [societyId, setSocietyId] = useState<ClubNamesType| null>(null);
  const [userId, setUserID] = useState('');

  // if unauthenticated, redirect to login page
  if (!session) return <NotLoggedIn />;

  // First step: Pick User

  // Second Step Pick Society

  // Third Step Pick Task

  console.log(societyId);



  return (
    <Layout>
      <main className="flex min-h-screen h-screen flex-col items-center ">
        <div className="container h-full mt-16 flex flex-col justify-center items-center px-4 py-2 ">
          <h1 className="text-center text-5xl font-extrabold tracking-tight text-white sm:text-[5rem]">
            Complete Quests 🔱
          </h1>

          <div className="flex w-full flex-col justify-evenly h-full py-5">
            <UserSearchBar setUserID={setUserID}/>

            <SocietySelector setSocietyId={setSocietyId} session={session}/>
            
            {societyId === null ? <>{societyId} </> : <TaskSelector societyId={societyId}/>}
            {societyId === null || userId === "" ? <></> : <UserCompletedTask userId={userId} societyId={societyId}/>}
          </div>
        </div>
      </main>


    </Layout>
  );

  return <div>loading...</div>;
};

export default CompleteTask;
