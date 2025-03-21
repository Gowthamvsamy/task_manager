// import
import { Menu, MenuButton, MenuItem, MenuItems } from '@headlessui/react'
import React from 'react'
import { RiArrowDropDownLine } from "react-icons/ri";
import { useTheme } from '../context/themeContext';

function Filter({ setFilterValue }) {

    // use context
    const { theme } = useTheme();

    // HandleClick for filter type
    const handleClick = (value) => {
        setFilterValue(value);
    }

    return (
        <>
            <Menu as="div" className="menuBox">
                {/* Filter Button */}
                <div className='menuBoxdiv'>
                    <MenuButton className={`menuButton rounded-md text-sm  shadow-md hover:bg-gray-50 ${theme ? 'text-gray-500' : 'text-white hover:text-gray-500'}`}>
                        Filter
                        <RiArrowDropDownLine aria-hidden="true" className="-mr-1 size-5" />
                    </MenuButton>
                </div>
                {/* Filter Items */}
                <MenuItems transition className="w-32 meniItems">
                    <div>
                        <MenuItem>
                            <button
                                value="all"
                                onClick={() => handleClick("all")}
                                className="filterMenu hover:text-gray-700"
                            >
                                All
                            </button>
                        </MenuItem>
                        <MenuItem>
                            <button
                                value="low"
                                onClick={() => handleClick("low")}
                                className="filterMenu hover:text-gray-700"
                            >
                                🟢 Low
                            </button>
                        </MenuItem>
                        <MenuItem>
                            <button
                                value="medium"
                                onClick={() => handleClick("medium")}
                                className="filterMenu hover:text-gray-700"
                            >
                                🟡 Medium
                            </button>
                        </MenuItem>
                        <MenuItem>
                            <button
                                value="high"
                                onClick={() => handleClick("high")}
                                className="filterMenu hover:text-gray-700"
                            >
                                🔴 High
                            </button>
                        </MenuItem>
                    </div>
                </MenuItems>
            </Menu>
        </>
    )
}

export default Filter