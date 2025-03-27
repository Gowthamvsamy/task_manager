import React from 'react'
import { useTheme } from '../context/themeContext';
import { GoSearch } from "react-icons/go";

function Search({ setSearchValue }) {

  // Context
  const { theme } = useTheme();

  // Search lisener
  const handleSearch = (e) => {
    setSearchValue(e.target.value);
  };

  return (
    <>
    {/* Search Input */}
      <div className={`searchBox group`}>
        <input
          type="search"
          className={`search-box ${theme === 'light' ? "placeholder-gray-500" : 'placeholder-white group-hover:placeholder-gray-500'}`}
          name="search"
          onChange={handleSearch}
          placeholder='Search for the name...'
        />
        <span alt="404" className={`w-7 py-3 pe-3 ${theme === 'light' ? 'text-gray-500' : 'text-white group-hover:text-gray-500'}`}><GoSearch /></span>
      </div>
    </>
  )
}

export default Search