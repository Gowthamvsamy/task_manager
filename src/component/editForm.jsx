// import
import React, { useState } from 'react';
import { toast } from 'react-toastify';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import Form from './form';

function EditForm({ task, onClose, setUpdated }) {


    // State to hold the task being edited
    const [updatedTask, setUpdatedTask] = useState(task);

    // React Query Client
    const queryClient = useQueryClient();

    // Mutation for updating task
    const updateTaskMutation = useMutation({
        mutationFn: (updatedTask) =>
            fetch(`http://localhost:5000/task/update/${updatedTask._id}`, {
                method: "PATCH",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(updatedTask)
            }),
        onSuccess: () => {
            toast.success("Task updated successfully");
            queryClient.invalidateQueries(['tasks']);  // Refetch tasks after update
            onClose(false);
            setUpdated(true);
        },
        onError: () => {
            toast.error("Failed to update task");
        }
    });

    // Handle form submission
    const handleSubmit = (e, formData) => {
        e.preventDefault();
    
        // Check if the form data is different from the original task data
        const hasChanges = Object.keys(formData).some(key => formData[key] !== updatedTask[key]);
    
        if (!hasChanges) {
            onClose(false);
            toast.info("No changes detected.");
            return;
        }
    
        const isConfirmed = window.confirm("Are you sure you want to update this task?");
        if (isConfirmed) {
            updateTaskMutation.mutate({ ...updatedTask, ...formData });
        }
    };
    

    // Fetch employee list
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
            name: 'status', type: 'select', placeholder: 'Select status', required: true, options: [
                { value: 'Todo', label: '🟡 Todo' },
                { value: 'In Progress', label: '🔵 In Progress' },
                { value: 'Done', label: '🟢 Done' }
            ]
        },
        { name: 'description', type: 'textarea', placeholder: 'Description', required: true }
    ];

    return (
        <>
            <Form
                title={'Edit Task Form'}
                fields={fields}
                onSubmit={handleSubmit}
                empData={empData}
                initialData={updatedTask}   // Pass the initial task data for pre-filling
                setUpdatedTask={setUpdatedTask}
            />
        </>
    )
}

export default EditForm;
