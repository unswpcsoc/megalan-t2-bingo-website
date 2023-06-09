import { api } from "~/utils/api";
import LoadingSpinner from "./LoadingSpinner";
import { getSocietyNameType } from "./functions/getSocietyNameType";
import { type ClubNamesType } from "./types/clubs";

/**
 * displays a list of admins of a club
 */
const AllClubAdmins = ({ societyName }: { societyName: ClubNamesType }) => {
  const { data: club } = api.admin.getAllAdminsOfClub.useQuery({
    societyName,
  });

  return (
    <div className="w-full py-2 text-white">
      <h1 className="py-2 text-xl">
        {getSocietyNameType(societyName).name}&apos;s Admins
      </h1>
      {club ? (
        <div className="grid-col-1 grid grid-flow-row gap-4 overflow-x-auto text-lg md:grid-cols-2 lg:grid-cols-4">
          {club.admins.map((admin, index) => {
            return (
              <>
                <div
                  key={index}
                  className="h-fit w-full truncate rounded-xl border border-white bg-white/10 px-2 py-2 text-center backdrop-blur-lg"
                >
                  {admin.name}
                </div>
              </>
            );
          })}
        </div>
      ) : (
        <LoadingSpinner />
      )}
    </div>
  );
};
export default AllClubAdmins;
