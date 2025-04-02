import React, { useState } from 'react'
import Form from './form'
import { toast } from 'react-toastify';
import { useMutation, useQueryClient } from '@tanstack/react-query';

function AddEmployee() {

    const [errors, setErrors] = useState({});

    const queryClient = useQueryClient();

    // Create new Employee
    const addEmployeeMutation = useMutation({
        mutationFn: (newEmp) =>
            fetch("http://localhost:5000/emp/add", {
                method: "post",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(newEmp)
            }),
        onSuccess: () => {
            toast.success("Employee added successfully");
            queryClient.invalidateQueries(['Employee']);
        },
        onError: () => {
            toast.error("Failed to add Employee");
        }
    })

    const validateForm = (formData) => {
        const newErrors = {};
        const { emp_id, emp_name } = formData;

        if (!emp_id) newErrors.emp_id = "Please fill the Employee ID";
        if (!emp_name) newErrors.emp_name = "Please fill the Employee Name";

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    }

    const fields = [
        { name: 'emp_id', type: 'text', placeholder: 'Employee ID', required: true },
        { name: 'emp_name', type: 'text', placeholder: 'Employee Name', required: true }
    ];

    const formatName = (name) => {
        return name.charAt(0).toUpperCase() + name.slice(1).toLowerCase();
    };

    const handleSubmit = (e, data) => {
        e.preventDefault();

        if (!validateForm(data)) {
            toast.error("Please fill all the fields correctly.");
            return;
        }

        const formattedData = { emp_name: formatName(data.emp_name), emp_id: data.emp_id };

        addEmployeeMutation.mutate(formattedData);
    }


    return (
        <>
            <Form
                title={'Add Employee Form'}
                btn={"Add Employee"}
                fields={fields}
                onSubmit={handleSubmit}
                validateForm={validateForm}
                errors={errors}
            />
        </>
    )
}

export default AddEmployee