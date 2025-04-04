import React, { useState } from 'react'
import { useTheme } from '../context/themeContext';
import { toast } from 'react-toastify';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import Form from './form';

function AddForm() {

    const { setOpen } = useTheme();

    const [errors, setErrors] = useState({});

    // React Query Client
    const queryClient = useQueryClient();

    // GET Employee list
    const { data: empData = [] } = useQuery({
        queryKey: ['employee'],
        queryFn: () =>
            fetch("http://localhost:5000/emp/all")
                .then(res => res.json())
                .then(data => data?.data || [])
                .catch(() => {
                    toast.error("Failed to fetch Employee");
                    return [];
                })
    });

    // React Query Mutation for Adding Task
    const addTaskMutation = useMutation({
        mutationFn: (newTask) =>
            fetch("http://localhost:5000/task/add", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(newTask)
            }),
        onSuccess: () => {
            toast.success("Task added successfully");
            queryClient.invalidateQueries(['tasks']);
        },
        onError: () => {
            toast.error("Failed to add task");
        }
    });

    // Form validation
    const validateForm = (formData) => {
        const newErrors = {};
        const { task_id, task_name } = formData;

        if (task_id.length < 3) newErrors.task_id = "Must be at least 3 characters";
        if (task_name.length < 5) newErrors.task_name = "Must be at least 5 characters";

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = (e, data) => {
        e.preventDefault();

        if (!validateForm(data)) {
            toast.error("Please fill all the fields correctly.");
            return;
        }

        addTaskMutation.mutate(data);
        setErrors(null)
        setOpen(false);
    }

    const fields = [
        { name: 'task_id', type: 'text', placeholder: 'Task ID', required: true },
        { name: 'task_name', type: 'text', placeholder: 'Task Name', required: true },
        { name: 'assign', type: 'autocomplete', placeholder: 'Assign To', required: true },
        { name: 'deadline', type: 'date', placeholder: 'Deadline', required: true },
        {
            name: 'priority', type: 'select', placeholder: 'Select Priority', required: true, options: [
                { value: 'Low', label: '🟢 Low' },
                { value: 'Medium', label: '🟡 Medium' },
                { value: 'High', label: '🔴 High' }
            ]
        },
        {
            name: 'status', type: 'select', placeholder: 'Todo', required: true, defaultValue: 'Todo', options: [
                { value: 'Todo', label: '🟡 Todo' },
            ]
        },
        { name: 'description', type: 'textarea', placeholder: 'Description', required: true }
    ];

    return (
        <Form
            title={'Add Task Form'}
            btn={"Add Task"}
            fields={fields}
            onSubmit={handleSubmit}
            empData={empData}
            validateForm={validateForm}
            errors={errors}
        />
    )
}

export default AddForm
