// import files
import React, { useState } from 'react'
import Search from '../component/search'
import { GoSun, GoMoon } from "react-icons/go";
import { useTheme } from '../context/themeContext';
import TaskList from '../component/taskList';
import { ToastContainer, toast } from 'react-toastify';
import axios from 'axios';
import close from '../assets/close.png';
import logo from '../assets/logo.png'


function Body() {

    const [searchValue, setSearchValue] = useState("");

    // use context
    const { theme, toggleTheme, open, setOpen } = useTheme();

    // Open Add Task form
    const openForm = () => {
        setOpen(true);
    }

    // Form Data
    const [formData, setFormData] = useState({
        task_id: '',
        task_name: '',
        deadline: '',
        assign: '',
        description: '',
        status: 'Todo',
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    // Task creation
    const handleSubmit = (e) => {
        e.preventDefault();

        axios.post("http://localhost:4000/task/add", formData, {
            headers: {
                "Content-Type": "application/json",
            },
        })
            .then(() => {
                toast.success("Task added successfully");
                clearInput();
            })
            .catch((error) => {
                console.error("Error submitting form:", error);
                toast.error(error.response?.data?.message || "Failed to add task");
            });
    };

    // Clear form Input
    const clearInput = () => {
        setFormData({
            task_id: '',
            task_name: '',
            deadline: '',
            assign: '',
            description: '',
        });

        setOpen(false);
    }

    return (
        <>
            <div className={`main-screen ${theme ? 'bg-gradient-to-bl from-[#e9e5da] to-[#d5e2ce]' : 'bg-gradient-to-bl from-[#635e57] to-[#697265]'}`}>
                <ToastContainer />
                <div className='navbar'>
                    <div className='navContent'>
                        <img src={logo} alt="404" className='w-10' />
                        <p className={`heading ${theme ? 'text-black' : 'text-white'}`}>Task Manager</p>
                    </div>

                    <div className='navContent'>
                        <div className='my-6 flex gap-3'>
                            <Search setSearchValue={setSearchValue} />
                            <button className='button' onClick={openForm}>Add&nbsp;Task</button>
                        </div>
                        <button onClick={toggleTheme} className={`theme-box ${theme ? 'shadow-black' : 'shadow-white bg-gray-50/20'}`}>{theme ? <GoSun /> : <GoMoon className='text-white'/>}</button>
                    </div>
                </div>

                <div className='px-10'>
                    <TaskList searchValue={searchValue} />
                </div>
            </div>
            {open ? (
                <div className='h-screen w-screen edit-form'>
                    <div className='formBg'>
                        <form className='flex flex-col gap-5' onSubmit={handleSubmit}>
                            <button className='formClose' onClick={clearInput}>
                                <img src={close} alt="404" className='w-6' />
                            </button>
                            <div className='flex gap-5'>
                                <div className='flex flex-col'>
                                    <label htmlFor="id">Task ID</label>
                                    <input
                                        type="text"
                                        name="task_id"
                                        value={formData.id}
                                        onChange={handleChange}
                                        className="task-input"
                                        placeholder='eg: TS-1'
                                    />
                                </div>
                                <div className='flex flex-col'>
                                    <label htmlFor="name">Task Name</label>
                                    <input
                                        type="text"
                                        name="task_name"
                                        value={formData.name}
                                        onChange={handleChange}
                                        className="task-input"
                                        placeholder='eg: Button'
                                    />
                                </div>
                            </div>

                            <div className='flex gap-5'>
                                <div className='flex flex-col'>
                                    <label htmlFor="deadline">Deadline</label>
                                    <input
                                        type="date"
                                        name="deadline"
                                        value={formData.deadline}
                                        onChange={handleChange}
                                        className='task-input'
                                    />
                                </div>
                                <div className='flex flex-col w-full'>
                                    <label htmlFor="assign">Assign To</label>
                                    <select
                                        className='task-input'
                                        name='assign'
                                        value={formData.assign}
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
                            </div>

                            <div className='flex flex-col'>
                                <label htmlFor="Description">Description</label>
                                <textarea
                                    className='task-input'
                                    rows={4}
                                    name="description"
                                    value={formData.description}
                                    onChange={handleChange}
                                    placeholder='description'
                                ></textarea>
                            </div>
                            <button type="submit" className='button'>Add&nbsp;Task</button>
                        </form>
                    </div>
                </div>
            ) : null}
        </>
    )
}

export default Body