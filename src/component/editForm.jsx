// import
import React, { useState } from 'react'
import close from '../assets/close.png'
import axios from 'axios';
import { toast } from 'react-toastify';
import { useTheme } from '../context/themeContext';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { Autocomplete } from '@mui/material';
import items from '../component/employee.json';


function EditForm({ task, onClose, setUpdated }) {

    // state
    const [updatedTask, setUpdatedTask] = useState(task);

    // use context
    const { theme } = useTheme();

    // Input listener
    const handleChange = (event) => {
        const { name, value } = event.target;
        setUpdatedTask((prevTask) => ({
            ...prevTask,
            [name]: value,
        }));
    };

    // Date picker lisener
    const handleDateChange = (date) => {
        setUpdatedTask((prevTask) => ({
            ...prevTask,
            deadline: date.toISOString().split('T')[0],
        }));
    };

    // Update the task using PATCH
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
            <div className={`edit-form h-[96%] w-[96%] ${theme ? 'bg-white/80' : 'bg-black/80'}`}>
                <div className='formBg'>
                    <form className='form-div gap-5' onSubmit={handleSubmit}>
                        <button className='formClose' onClick={() => onClose(false)} >
                            <img src={close} alt="404" className='w-6' />
                        </button>
                        <p className='form-title'>Edit Task Form</p>
                        <div className='flex gap-5'>
                            {/* Task ID */}
                            <div className='form-div'>
                                <input
                                    type="text"
                                    name="task_id"
                                    value={updatedTask.task_id}
                                    className="task-input"
                                    disabled
                                />
                            </div>
                            {/* Task Name */}
                            <div className='form-div'>
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
                            {/* Date Picker */}
                            <div className='form-div'>
                                <DatePicker
                                    selected={updatedTask.deadline ? new Date(updatedTask.deadline) : null}
                                    dateFormat="yyyy-MM-dd"
                                    onChange={handleDateChange}
                                    className="placeholder:pl-6 task-input"
                                    minDate={new Date()}
                                />
                            </div>
                            {/* Task assign to */}
                            <div className='form-div w-[48%]'>
                                {/* <select
                                    className='task-input'
                                    name='assign'
                                    value={updatedTask.assign}
                                    onChange={handleChange}
                                >
                                    <option value="" disabled>Select an Employe</option>
                                    <option value="employe1">Employer 1</option>
                                    <option value="employe2">Employer 2</option>
                                    <option value="employe3">Employer 3</option>
                                    <option value="employe4">Employer 4</option>
                                    <option value="employe5">Employer 5</option>
                                </select> */}

                                <Autocomplete
                                    options={items}
                                    getOptionLabel={(option) => option.label}
                                    value={items.find((item) => item.label === updatedTask.assign) || null}
                                    onChange={(_, newValue) => {
                                        setUpdatedTask((prevTask) => ({
                                            ...prevTask,
                                            assign: newValue ? newValue.label : ''
                                        }));
                                    }}
                                    renderInput={(params) => (
                                        <div ref={params.InputProps.ref} className="task-input">
                                            <input
                                                {...params.inputProps}
                                                placeholder="Select an Employee"
                                                className="autocomplete-input"
                                                required
                                            />
                                        </div>
                                    )}
                                />
                            </div>
                        </div>
                        <div className='flex gap-5'>
                            {/* Task Status */}
                            <div className='form-div w-full'>
                                <select
                                    className='task-input'
                                    name='status'
                                    value={updatedTask.status}
                                    onChange={handleChange}
                                >
                                    <option value="Todo">🟡 Todo</option>
                                    <option value="In Progress">🔵 In Progress</option>
                                    <option value="Done">🟢 Done</option>
                                </select>
                            </div>
                            <div className='w-full'>
                                {/* Task Priority */}
                                <select
                                    className={`task-input ${updatedTask.priority ? 'text-black' : 'text-gray-400'}`}
                                    name='priority'
                                    value={updatedTask.priority}
                                    onChange={handleChange}
                                    required
                                >
                                    <option value="" disabled>Select an priority</option>
                                    <option value="Low">🟢 Low</option>
                                    <option value="Medium">🟡 Medium</option>
                                    <option value="High">🔴 High</option>
                                </select>
                            </div>
                        </div>

                        <div className='form-div'>
                            {/* Description box */}
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