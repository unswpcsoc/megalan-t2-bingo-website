import { type MouseEventHandler, useState } from "react";
import { type ClubNamesType } from "../types/clubs";
import SocietySelector from "../universal/SocietySelector";
import { getSocietyNameType } from "src/components/functions/getSocietyNameType";
import { type Session } from "next-auth";
import { api } from "~/utils/api";
import UserSearchBarAdmin from "src/components/universal/UserSearchBarAdmin";
import { ExclamationCircleIcon } from "@heroicons/react/24/solid";

const AddAdminForm = ({ session, doClose }: { session: Session, doClose: MouseEventHandler }) => {
  const [userId, setUserId] = useState("");
  const [societyId, setSocietyId] = useState<ClubNamesType | "">("");
  const [validDetails, setValidDetails] = useState(false);
  const [formSent, setFormSent] = useState(false);
  const createAdminMutation = api.admin.addAdmin.useMutation();

  const handleSubmit = () => {
    setFormSent(true);
    // if all details aren't provided display error message
    if (!(userId && societyId)) {
      setValidDetails(false);
      return;
    }
    // else add admin to society
    setValidDetails(true);
    createAdminMutation
      .mutateAsync({
        adminId: session.id,
        userId: userId,
        societyName: societyId,
      })
      .then(() => doClose)
      .catch((err) => console.log(err));
  };

  return (
    <div className="space-y-8 py-4">
      <div className="rounded-xl border border-white bg-white/10 p-4 text-white">
        <h1 className="py-2 text-center text-xl md:text-left">Add New Admin</h1>
        {/* Search Bar for Finding Users */}
        <UserSearchBarAdmin setUserID={setUserId} />
        <SocietySelector session={session} setSocietyId={setSocietyId} />
        {/* Error Message if all details aren't entered */}
        {!validDetails && formSent && (
          <div className="flex flex-row space-x-2 rounded-lg border border-amber-500 bg-amber-900/40 px-4 py-4 text-amber-500">
            <ExclamationCircleIcon className="mt-[1px] h-6 w-6" />
            <h1 className="text-lg">Please Enter All the Details</h1>
          </div>
        )}
        <div className="flex flex-row items-end justify-end pt-4 space-x-4">
          <button
            onClick={doClose}
            className="w-fit rounded-xl border border-red-400 bg-red-800/40 px-4 py-2 text-red-400"
          >
            Cancel
          </button>
          <button
            onClick={handleSubmit}
            className="w-fit rounded-xl border border-green-400 bg-green-800/40 px-4 py-2 text-green-400"
          >
            Create Admin
          </button>
        </div>
      </div>
      {(userId || societyId) && (
        <div className="rounded-xl border border-white bg-white/10 p-4 text-white">
          <h1 className="py-2 text-2xl font-bold text-white">
            Preview Of Details
          </h1>
          <div className="w-full space-y-2 text-lg">
            <h1 className="font-bold">
              Name: <span className="font-normal">{userId}</span>
            </h1>
            <h1 className="font-bold">
              Society:{" "}
              {societyId ? (
                <span className="font-normal">
                  {getSocietyNameType(societyId).name}
                </span>
              ) : (
                <></>
              )}
            </h1>
          </div>
        </div>
      )}
    </div>
  );
};
export default AddAdminForm;
