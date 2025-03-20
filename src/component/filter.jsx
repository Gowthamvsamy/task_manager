import { Menu, MenuButton, MenuItem, MenuItems } from '@headlessui/react'
import React from 'react'
import { RiArrowDropDownLine } from "react-icons/ri";
import { useTheme } from '../context/themeContext';

function Filter({ setFilterValue }) {

    // use context
    const { theme } = useTheme();

    const handleClick = (value) => {
        setFilterValue(value);
    }

    return (
        <>
            <Menu as="div" className="relative text-left ">
                <div className='text-gray-500 bg-gray-50/20'>
                    <MenuButton className={`inline-flex w-full justify-center gap-x-1.5 rounded-md px-3 py-2 text-sm  shadow-md hover:bg-gray-50 ${theme ? 'text-gray-500' : 'text-white hover:text-gray-500'}`}>
                        Filter
                        <RiArrowDropDownLine aria-hidden="true" className="-mr-1 size-5" />
                    </MenuButton>
                </div>
                <MenuItems transition className="absolute right-0 z-10 mt-2 w-32 origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black/5 transition focus:outline-none data-[closed]:scale-95 data-[closed]:transform data-[closed]:opacity-0 data-[enter]:duration-100 data-[leave]:duration-75 data-[enter]:ease-out data-[leave]:ease-in">
                    <div>
                        <MenuItem>
                            <button
                                value="low"
                                onClick={() => handleClick("all")}
                                className="block border-b w-full px-4 py-2 text-sm text-gray-700 data-[focus]:bg-green-500/60 data-[focus]:text-white data-[focus]:outline-none"
                            >
                                All
                            </button>
                        </MenuItem>
                        <MenuItem>
                            <button
                                value="low"
                                onClick={() => handleClick("low")}
                                className="block border-b w-full px-4 py-2 text-sm text-gray-700 data-[focus]:bg-green-500/60 data-[focus]:text-white data-[focus]:outline-none"
                            >
                                Low
                            </button>
                        </MenuItem>
                        <MenuItem>
                            <button
                                value="medium"
                                onClick={() => handleClick("medium")}
                                className="block border-b w-full px-4 py-2 text-sm text-gray-700 data-[focus]:bg-yellow-500/60 data-[focus]:text-white data-[focus]:outline-none"
                            >
                                Medium
                            </button>
                        </MenuItem>
                        <MenuItem>
                            <button
                                value="high"
                                onClick={() => handleClick("high")}
                                className="block w-full px-4 py-2 text-sm text-gray-700 data-[focus]:bg-red-500/60 data-[focus]:text-white data-[focus]:outline-none"
                            >
                                High
                            </button>
                        </MenuItem>
                    </div>
                </MenuItems>
            </Menu>
        </>
    )
}

export default Filter