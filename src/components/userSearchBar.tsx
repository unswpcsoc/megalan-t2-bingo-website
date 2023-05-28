import React, { useState, useRef, useEffect } from 'react';
import { api } from "~/utils/api";
// import { createReactQueryHooks } from '@trpc/react';
import { useRouter } from 'next/router';
import { useSession } from 'next-auth/react';
import SearchResults from './searchResults';



const UserSearchBar: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [results, setResults] = useState<string[]>([]);
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const {data: session} = useSession();
  

  const handleSearch = (event: React.SyntheticEvent) => {
    event.preventDefault();
    
    // Simulating an API call to fetch results
    // Replace this with your actual API call
    // if (searchQuery !== "")



// TODO:
// create input box that stores some searched value
// on submit of that display results component
// pass in search query into results component
// results component will take that query and make a api call on the first line
// then it will data.map the results
// ez pz
  
    setTimeout(() => {
      const fetchedResults = ['Result 1', 'Result 2', 'Result 3'];
      setResults(fetchedResults);
      setIsOpen(true);
    }, 1000);
  };

  const handleClickOutside = (event: MouseEvent) => {
    if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
      setIsOpen(false);
    }
  };

  useEffect(() => {
    document.addEventListener('mousedown', handleClickOutside);

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);
  return (

    <form onSubmit={handleSearch} >
      <label htmlFor="default-search"  className="mb-2 text-sm font-medium text-gray-900 sr-only dark:text-white">Search</label>
      <div className="relative">
        {/* <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
          <svg aria-hidden="true" className="w-5 h-5 text-gray-500 dark:text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path></svg>
        </div> */}
        <input type="search" 
        value={searchQuery}
        className="block w-full p-4 pl-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" 
        onChange={(e) => setSearchQuery(e.target.value.toLowerCase())}
        required 
        placeholder="Search User"
        />
        <button type="submit" className="text-white absolute right-2.5 bottom-2.5 bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Search</button>
      </div>
      {results.length > 0 && isOpen && (
          <div ref={dropdownRef} className=" z-10 w-full bg-white border border-gray-300 rounded-md shadow-lg">
            <SearchResults searchString={searchQuery} setResults={setResults} setSearchQuery={setSearchQuery}/>
            </div>
          )}
    </form>

  )
};
export default UserSearchBar;
