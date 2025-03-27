import { useQuery } from '@tanstack/react-query';
import React, { useState } from 'react';
import { toast } from 'react-toastify';
import Select from 'react-select';
import { useTheme } from '../context/themeContext';

function EmpFilter({ setEmpLabels }) {

    // State
    const [selectedEmp, setSelectedEmp] = useState([]);

    const { theme } = useTheme();

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

    // Handle selection with max limit
    const handleChange = (selectedOptions) => {

        const Emp = selectedOptions.map((emp) => emp.label)

        if (selectedOptions.length <= MAX_SELECTION) {
            setSelectedEmp(selectedOptions);
            setEmpLabels(Emp);
        } else {
            toast.warn(`You can only select up to ${MAX_SELECTION} employees`);
        }
    };

    return (
        <>
            <div>
                <Select
                    isMulti
                    name="employees"
                    options={empData.map(emp => ({
                        value: emp.emp_id, 
                        label: emp.emp_name
                    }))}
                    value={selectedEmp}
                    onChange={handleChange}
                    className={`basic-multi-select !rounded-md ${theme === 'light' ? 'bg-transparent' : 'bg-gray-50/20 light'}`}
                    classNamePrefix="select"
                    placeholder="Select Employee"
                    maxMenuHeight={"200px"}
                />
            </div>
        </>
    );
}

export default EmpFilter;
