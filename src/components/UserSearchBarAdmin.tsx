import React, { useState, useRef, useEffect } from "react";
import SearchResultsAdmin from "./SearchResultsAdmin";

/**
 * Search Bar for admins to find PARTICIPANTS and ADMINS
 */
const UserSearchBarAdmin = ({ setUserID }: { setUserID: CallableFunction }) => {
  const [searchQuery, setSearchQuery] = useState("");
  const [results, setResults] = useState<string[]>([]);
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const handleSearch = (event: React.SyntheticEvent) => {
    event.preventDefault();

    setTimeout(() => {
      const fetchedResults = ["Result 1", "Result 2", "Result 3"];
      setResults(fetchedResults);
      setIsOpen(true);
    }, 1000);
  };

  const handleClickOutside = (event: MouseEvent) => {
    if (
      dropdownRef.current &&
      !dropdownRef.current.contains(event.target as Node)
    ) {
      setIsOpen(false);
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);
  return (
    <form onSubmit={handleSearch} className="h-1/5">
      <label
        htmlFor="default-search"
        className="sr-only mb-2 text-sm font-medium text-gray-900 dark:text-white"
      >
        Search
      </label>
      <div className="relative">
        {/* <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
          <svg aria-hidden="true" className="w-5 h-5 text-gray-500 dark:text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path></svg>
        </div> */}
        <input
          type="search"
          value={searchQuery}
          className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-4 pl-10 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500"
          onChange={(e) => setSearchQuery(e.target.value.toLowerCase())}
          required
          placeholder="Search User"
        />
        <button
          type="submit"
          className="absolute bottom-2.5 right-2.5 rounded-lg bg-blue-700 px-4 py-2 text-sm font-medium text-white hover:bg-blue-800 focus:outline-none focus:ring-4 focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
        >
          Search
        </button>
      </div>
      {results.length > 0 && isOpen && searchQuery !== "" && (
        <div
          ref={dropdownRef}
          className=" z-10 w-full rounded-md border border-gray-300 bg-white shadow-lg"
        >
          <SearchResultsAdmin
            setUserID={setUserID}
            searchString={searchQuery}
            setResults={setResults}
            setSearchQuery={setSearchQuery}
          />
        </div>
      )}
    </form>
  );
};
export default UserSearchBarAdmin;
