import React, { useState } from 'react';

const UserSearchBar: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [results, setResults] = useState<string[]>([]);

  const handleSearch = (event:React.SyntheticEvent) => {
    event.preventDefault();
    // Simulating an API call to fetch results
    // Replace this with your actual API call
    setTimeout(() => {
      const fetchedResults = ['Result 1', 'Result 2', 'Result 3'];
      setResults(fetchedResults);
    }, 1000);
  };

  return (
    <div>
      <form onSubmit={handleSearch} className="relative w-full flex flex-row" >
      <div className='rounded-l-md w-full bg-white border border-gray-300 '>
      <input
        type="text"
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value.toLowerCase())}
        // onSubmit={handleSearch}
        
        className="w-full px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
        placeholder="Search User"
      />
      </div>
      {results.length > 0 && (
        <div className="absolute z-10 mt-9 w-64 bg-white border border-gray-300 rounded-md shadow-lg">
          {results.map((result, index) => (
            <div key={index} className="px-4 py-2 hover:bg-gray-100">
              <button onClick={() => {
                setSearchQuery(result);
                setResults([]);
              }}>
                {result}
              </button>

            </div>
          ))}
        </div>
      )}
      <button
      type='submit'
        // onClick={handleSearch}
        className="w-1/4 px-4 bg-blue-500 text-white font-semibold rounded-r-md"
      >
        Search
      </button>
      </form>
    </div>
  );
};

export default UserSearchBar;
