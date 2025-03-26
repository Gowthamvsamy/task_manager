import { useQuery } from '@tanstack/react-query';
// import Multiselect from 'multiselect-react-dropdown';
import React, { useState } from 'react';
import { toast } from 'react-toastify';
import Select from 'react-select';

function EmpFilter() {

    // State
    const [selectedEmp, setSelectedEmp] = useState([]);

    const MAX_SELECTION = 3;

    // GET Employee list
    const { data: empData = [] } = useQuery({
        queryKey: ['employee'],
        queryFn: () =>
            fetch("http://localhost:5000/emp")
                .then(res => res.json())
                .then(data => data?.data || [])
                .catch(() => {
                    toast.error("Failed to fetch Employee");
                    return [];
                })
    });

    // // Handle Selection
    // const handleSelect = (selectedList) => {
    //     setSelectedEmp(selectedList);
    //     console.log('Selected Employees:', selectedList);
    // };

    // const handleRemove = (selectedList) => {
    //     setSelectedEmp(selectedList);
    //     console.log('After Remove:', selectedList);
    // };


     // Handle selection with max limit
     const handleChange = (selectedOptions) => {
        if (selectedOptions.length <= MAX_SELECTION) {
            setSelectedEmp(selectedOptions);
        } else {
            toast.warn(`You can only select up to ${MAX_SELECTION} employees`);
        }
    };


    return (
        // <div className='border-none w-full'>
        //     <Multiselect
        //         options={empData.map(emp => ({
        //             id: emp.emp_id, 
        //             name: emp.emp_name
        //         }))}
        //         selectedValues={selectedEmp}
        //         onSelect={handleSelect}
        //         onRemove={handleRemove}
        //         displayValue="name"          // Display the selected names
        //         placeholder="Select Employee"
        //         className="w-full"
        //         showCheckbox
        //         closeIcon="circle" 
        //         style={{
        //             multiselectContainer: { color: '#374151' },  // Text color
        //             chips: { background: '#3b82f6', color: '#fff' },  // Blue chips
        //             searchBox: { 
        //                 minHeight: '40px',
        //                 border: '1px solid #d1d5db', 
        //                 padding: '10px'
        //             }
        //         }}
        //     />
        // </div>


        <>
            <div className='p-4'>
                <Select
                    isMulti
                    name="employees"
                    options={empData.map(emp => ({
                        value: emp.emp_id,    // Use value for ID
                        label: emp.emp_name   // Use label for name display
                    }))}
                    value={selectedEmp}
                    onChange={handleChange}
                    className="basic-multi-select"
                    classNamePrefix="select "
                    placeholder="Select Employee"
                    maxMenuHeight={"200px"}
                />
            </div>
        </>
    );
}

export default EmpFilter;
