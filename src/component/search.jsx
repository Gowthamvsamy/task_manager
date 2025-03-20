import React from 'react'
import { useTheme } from '../context/themeContext';
import { GoSearch } from "react-icons/go";

function Search({ setSearchValue }) {

  const { theme } = useTheme();

  const handleSearch = (e) => {
    setSearchValue(e.target.value);
  };

  return (
    <>
      <div className={`searchBox group ${theme ? "shadow-black" : "shadow-white"}`}>
        <input
          type="search"
          className={`search-box ${theme ? "placeholder-gray-500" : 'placeholder-white group-hover:placeholder-gray-500'}`}
          name="search"
          onChange={handleSearch}
          placeholder='Search for the name...'
        />
        <span alt="404" className={`w-7 py-3 pe-3 ${theme ? 'text-gray-500' : 'text-white group-hover:text-gray-500'}`}><GoSearch /></span>
      </div>
    </>
  )
}

export default Search