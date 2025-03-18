import React from 'react'
import search from '../assets/search.svg'
import { useTheme } from '../context/themeContext';

function Search({ setSearchValue }) {

  const { theme } = useTheme();

  const handleSearch = (e) => {
    setSearchValue(e.target.value);
  };

  return (
    <>
      <div className={`searchBox ${theme ? "shadow-black" : "shadow-white"}`}>
        <input
          type="search"
          className='search-box'
          name="search"
          onChange={handleSearch}
          placeholder='Search for the name...'
        />
        <img src={search} alt="404" className='w-7 py-3 pe-3' />
      </div>
    </>
  )
}

export default Search