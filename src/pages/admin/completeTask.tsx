import { type NextPage } from "next";
import { useSession } from "next-auth/react";
import Layout from "../_layout";
import NotLoggedIn from "~/components/universal/NotLoggedIn";
import { useState } from "react";
import { type ClubNamesType } from "~/components/types/clubs";
import SubmitButton from "~/components/universal/SubmitButton";
import { type Task } from "@prisma/client";
import UserSearchBar from "~/components/universal/UserSearchBar";
import SocietySelector from "~/components/universal/societySelector";
import TaskSelector from "~/components/universal/taskSelector";


const CompleteTask: NextPage = () => {
  // display some profile
  const { data: session } = useSession();
  const [task, setTask] = useState<Task | null>(null);
  const [societyId, setSocietyId] = useState<ClubNamesType| null>(null);
  const [userId, setUserId] = useState('');

  const refresh = () => {
  window.location.reload();
  }


  // if unauthenticated, redirect to login page
  if (!session) return <NotLoggedIn />;

  // First step: Pick User

  // Second Step Pick Society

  // Third Step Pick Task
  return (
    <Layout>
      <main className="flex min-h-screen flex-col items-center ">
        <div className="container h-full mt-20 flex flex-col justify-center items-center px-4 py-2 ">
          <h1 className="text-center text-5xl font-extrabold tracking-tight text-white sm:text-[5rem]">
            Complete Quests 🔱
          </h1>
          <div className="flex w-full flex-col justify-start items-stretch h-full py-5">
            <UserSearchBar setUserID={setUserId}/>
            <SocietySelector setSocietyId={setSocietyId} session={session}/>
            {societyId === null || userId === "" ? <></> : <TaskSelector userId={userId} setTask={setTask} societyId={societyId}/>}
            <SubmitButton taskId={task?.id} userId={userId} taskPoints={task?.points} refresh={refresh}/>
          </div>
        </div>
      </main>


    </Layout>
  );
};

export default CompleteTask;
