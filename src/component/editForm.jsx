import React, { useState } from 'react'
import close from '../assets/close.png'
import axios from 'axios';
import { toast } from 'react-toastify';


function EditForm({ task, onClose, setUpdated }) {

    const [updatedTask, setUpdatedTask] = useState(task);

    const handleChange = (event) => {
        const { name, value } = event.target;
        setUpdatedTask((prevTask) => ({
            ...prevTask,
            [name]: value,
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        const isConfirmed = window.confirm("Are you sure you want to update this task?");
        if (isConfirmed) {
            axios.patch(`http://localhost:4000/task/update/${updatedTask._id}`, updatedTask)
                .then(() => {
                    toast.success("Task updated successfully");
                    onClose(false);
                    setUpdated(true)
                })
                .catch((error) => {
                    console.error("Error updating task:", error);
                    toast.error("Failed to update task");
                });
        }
    };

    

    return (
        <>
            <div className='h-[96%] w-[96%] backdrop-saturate-125 bg-white/80 flex justify-center items-center top-0 absolute'>
                <div className='bg-white p-10 border rounded shadow-lg'>
                    <form className='flex flex-col gap-5' onSubmit={handleSubmit}>
                        <button className='border rounded p-1 w-fit ms-auto cursor-pointer' onClick={() => onClose(false)} >
                            <img src={close} alt="404" className='w-6' />
                        </button>
                        <div className='flex gap-5'>
                            <div className='flex flex-col'>
                                <label htmlFor="id">Task ID</label>
                                <input
                                    type="text"
                                    name="task_id"
                                    value={updatedTask.task_id}
                                    className="task-input"
                                    disabled
                                />
                            </div>
                            <div className='flex flex-col'>
                                <label htmlFor="name">Task Name</label>
                                <input
                                    type="text"
                                    name="task_name"
                                    value={updatedTask.task_name}
                                    className="task-input"
                                    disabled
                                />
                            </div>
                        </div>

                        <div className='flex gap-5'>
                            <div className='flex flex-col'>
                                <label htmlFor="deadline">Deadline</label>
                                <input
                                    type="date"
                                    name="deadline"
                                    value={updatedTask.deadline}
                                    onChange={handleChange}
                                    className='task-input' />
                            </div>
                            <div className='flex flex-col w-full'>
                                <label htmlFor="assign">Assign To</label>
                                <select
                                    className='task-input'
                                    name='assign'
                                    value={updatedTask.assign}
                                    onChange={handleChange}
                                >
                                    <option value="">Select an Employe</option>
                                    <option value="employe1">Employer 1</option>
                                    <option value="employe2">Employer 2</option>
                                    <option value="employe3">Employer 3</option>
                                    <option value="employe4">Employer 4</option>
                                    <option value="employe5">Employer 5</option>
                                </select>
                            </div>
                            <div className='flex flex-col w-full'>
                                <label htmlFor="status">Status</label>
                                <select
                                    className='task-input'
                                    name='status'
                                    value={updatedTask.status}
                                    onChange={handleChange}
                                >
                                    <option value="Todo">Todo</option>
                                    <option value="In Progress">In Progress</option>
                                    <option value="Done">Done</option>
                                </select>
                            </div>
                        </div>

                        <div className='flex flex-col'>
                            <label htmlFor="Description">Description</label>
                            <textarea
                                className='task-input'
                                rows={4}
                                name="description"
                                value={updatedTask.description}
                                onChange={handleChange}
                            ></textarea>
                        </div>
                        <button type="submit" className='button'>Update&nbsp;Task</button>
                    </form>
                </div>
            </div>
        </>
    )
}

export default EditForm