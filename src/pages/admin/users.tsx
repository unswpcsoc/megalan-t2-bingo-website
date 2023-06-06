import { type NextPage } from "next";
import Layout from "../_layout";
import { useSession } from "next-auth/react";
import AddAdminForm from "~/components/forms/AddAdminForm";
import { api } from "~/utils/api";
import { useState } from "react";
import { PlusIcon, InformationCircleIcon } from "@heroicons/react/24/solid";
import AllClubAdmins from "~/components/AllClubAdmins";
import LoadingSpinner from "~/components/LoadingSpinner";
import NotLoggedIn from "~/components/NotLoggedIn";
import NotAdmin from "~/components/notAdmin";

/**
 * Page to manage societies admins as an admin
 */
const Users: NextPage = () => {
  const [showForm, setShowForm] = useState(false);
  const { data: session } = useSession();
  const { data: clubList } = api.quests.getAdminClubs.useQuery({
    userID: session ? session.id : "",
  });

  if (!session) return <NotLoggedIn />;
  if (session.type !== "ADMIN") return <NotAdmin />;

  return (
    <Layout>
      <main className="flex min-h-screen w-full flex-col items-center">
        <div className="container mt-6 flex flex-col items-center justify-center gap-8 px-4 py-16 ">
          {/* Header */}
          <h1 className="text-center text-5xl font-extrabold tracking-tight text-white sm:text-[5rem]">
            Manage Admins 🔱
          </h1>
          {/* Page Content */}
          <div className="w-full">
            {/*  Admin Sub Heading */}
            <div className="flex w-full flex-row justify-between">
              <div className="px-2 text-white">
                <h1 className="text-4xl font-bold">
                  {showForm ? "Adding Admin" : "Societies"}
                </h1>
              </div>
              {/* Add Admin Button */}
              {!showForm && (
                <button
                  className="mx-2 flex h-fit flex-row space-x-2 rounded-lg border border-green-500 bg-green-900/40 p-2 text-green-500"
                  onClick={() => setShowForm(true)}
                >
                  <h1>Add Admin</h1>
                  <PlusIcon className="h-6 w-6" />
                </button>
              )}
            </div>
            {/* Reload Info Sentence */}
            <div className="flex flex-row space-x-2 pt-2 text-white">
              <InformationCircleIcon className="h-6 w-6" />
              <p>
                Reload the Page if you aren&apos;t seeing your admin updates
              </p>
            </div>
            {showForm && (
              <AddAdminForm
                doClose={() => setShowForm(false)}
                sessionId={session.id}
              />
            )}
            {!showForm && (
              <>
                {clubList ? (
                  <>
                    {clubList.clubs.map((clubName, index) => {
                      return (
                        <AllClubAdmins
                          key={index}
                          societyName={clubName.name}
                        />
                      );
                    })}
                  </>
                ) : (
                  <LoadingSpinner />
                )}
              </>
            )}
          </div>
        </div>
      </main>
    </Layout>
  );
};

export default Users;
