import { api } from "~/utils/api";

/**
 * Returns a list of users under a search bar
 */
const SearchResults = ({
  searchString,
  setSearchQuery,
  setResults,
  setUserID,
}: {
  searchString: string;
  setSearchQuery: CallableFunction;
  setResults: CallableFunction;
  setUserID: CallableFunction;
}) => {
  const resultUsers = api.quests.getUsers.useQuery({ name: searchString });
  return (
    <div>
      {resultUsers.data?.length === 0 && <> No users found!</>}
      {resultUsers.data?.map((result, index) => (
        <div key={index} className="px-4 py-2 hover:bg-gray-200">
          <button
            className="w-full"
            onClick={() => {
              setSearchQuery(result.name);
              setResults([]);
              setUserID(result.id);
            }}
          >
            {result.name}
          </button>
        </div>
      ))}
    </div>
  );
};

export default SearchResults;
