// import
import { Menu, MenuButton, MenuItem, MenuItems } from '@headlessui/react'
import React, { useState } from 'react'
import { RiArrowDropDownLine } from "react-icons/ri";
import { useTheme } from '../context/themeContext';

function Filter({ setFilterValue }) {

    // use context
    const { theme } = useTheme();

    // state
    const [selectedPriorities, setSelectedPriorities] = useState([])

    // HandleClick for multi-select
    const handleClick = (value) => {
        setSelectedPriorities((prev) => {
            let updatedSelection;
    
            if (value === "All") {
                // If "all" is selected, clear other selections
                updatedSelection = ["All"];
            } else {
                // Remove "all" if any other priority is selected
                updatedSelection = prev.includes("All")
                    ? [value]                    // Replace "all" with the selected value
                    : prev.includes(value) 
                        ? prev.filter((item) => item !== value)  // Remove if already selected
                        : [...prev, value];                      // Add if not selected
            }
    
            setFilterValue(updatedSelection);  // Pass the updated selection
            return updatedSelection;
        });
    };
    

    return (
        <>
            <Menu as="div" className="menuBox">
                {/* Filter Button */}
                <div className='menuBoxdiv'>
                    <MenuButton className={`menuButton rounded-md text-sm shadow-md hover:bg-gray-50 ${theme ? 'text-gray-500' : 'text-white hover:text-gray-500'}`}>
                        {selectedPriorities.length > 0 ? selectedPriorities.join(', ') : 'Priority'}
                        <RiArrowDropDownLine aria-hidden="true" className="-mr-1 size-5" />
                    </MenuButton>
                </div>

                {/* Filter Items */}
                <MenuItems className="meniItems">
                    <div>
                        {['All', 'Low', 'Medium', 'High'].map((priority) => (
                            <MenuItem key={priority}>
                                <div className="filterMenu">
                                    <input
                                        type="checkbox"
                                        checked={selectedPriorities.includes(priority)}
                                        onChange={() => handleClick(priority)}
                                        value={priority}
                                        className="cursor-pointer"
                                    />
                                    <label htmlFor="">
                                        {priority === "All" ? "All" : 
                                         priority === "Low" ? "🟢 Low" : 
                                         priority === "Medium" ? "🟡 Medium" : "🔴 High"}
                                    </label>
                                </div>
                            </MenuItem>
                        ))}
                    </div>
                </MenuItems>
            </Menu>
        </>
    )
}

export default Filter;
