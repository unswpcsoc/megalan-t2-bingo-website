import { NextComponentType } from "next";
import React, { Ref } from "react";
import { api } from "~/utils/api";


const SearchResults = ({searchString, setSearchQuery, setResults }: {searchString: string, setSearchQuery: CallableFunction, setResults: CallableFunction}) => {



const resultUsers = api.quests.getUsers.useQuery({name: searchString});
  return (
    <div>
      {resultUsers.data?.map((result, index) => (
        <div key={index} className="px-4 py-2 hover:bg-gray-100">
          <button onClick={() => {
            setSearchQuery(result);
            setResults([]);
          }}>
            {result.name}
          </button>

        </div>
      ))}
    </div>
  );

};


export default SearchResults;


