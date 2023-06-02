import { api } from "~/utils/api";


const SearchResultsAdmin = ({searchString, setSearchQuery, setResults, setUserID }: {searchString: string, setSearchQuery: CallableFunction, setResults: CallableFunction, setUserID: CallableFunction}) => {



const resultUsers = api.quests.getAllUsers.useQuery({name: searchString});
  return (
    <div>
      {resultUsers.data?.map((result, index) => (
        <div key={index} className="px-4 py-2 text-gray-800 hover:bg-gray-200">
          <button onClick={() => {
            setSearchQuery(result.name);
            setResults([]);
            setUserID(result.id);
          }}>
            {result.name}
          </button>

        </div>
      ))}
    </div>
  );

};


export default SearchResultsAdmin;


