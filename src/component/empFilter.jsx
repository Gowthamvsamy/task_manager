import { useQuery } from '@tanstack/react-query';
import { MultiSelect } from 'primereact/multiselect'
import React, { useState } from 'react'
import { toast } from 'react-toastify';

function EmpFilter() {

    // state
    const [selectedEmp, setSelectedEmp] = useState(null);

    // GET Employee list
    const {data: empData = []} = useQuery({
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
    

    return (
        <div className='card flex justify-content-center'>
            <MultiSelect 
                value = {selectedEmp}
                onChange={(e) => setSelectedEmp(e.value)}
                options={empData.map((emp) => ({
                    label: emp.emp_name
                }))}
                placeholder="Select Employee"
                // maxSelectedLabels={3}
                className='w-full text-sm'
            />
        </div>
    )
}

export default EmpFilter