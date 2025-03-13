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
      <div className={`flex items-center pl-3 border rounded-md w-full ${theme ? "bg-white border-white" : "bg-gray-100 border-black"}`}>
        <input
          type="search"
          className='search-box'
          name="search"
          onChange={handleSearch}
        />
        <img src={search} alt="" className='w-7 py-3 pe-3' />
      </div>
    </>
  )
}

export default Search