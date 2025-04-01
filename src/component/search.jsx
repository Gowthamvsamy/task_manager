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
          className={`search-box ${theme === 'light' ? "light" : 'dark'}`}
          name="search"
          onChange={handleSearch}
          placeholder='Search for the name...'
        />
        <span alt="404" className={`search-icon ${theme === 'light' ? 'light' : 'dark'}`}><GoSearch /></span>
      </div>
    </>
  )
}

export default Search