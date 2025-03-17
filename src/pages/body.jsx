// import files
import React, { useState } from 'react'
import Search from '../component/search'
import { GoSun, GoMoon } from "react-icons/go";
import { useTheme } from '../context/themeContext';
import TaskList from '../component/taskList';
import { ToastContainer, toast } from 'react-toastify';
import axios from 'axios';
import close from '../assets/close.png';


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

    const handleSubmit = async (e) => {
        e.preventDefault();

        axios.post("http://localhost:4000/task/add", formData, {
            headers: {
                "content-Type": "application/json",
            },
        })
            .then((response) => {
                console.log(response.data.message);
                toast.success("Task added successfully");
            })
            .catch((error) => {
                console.error("Error submitting form:", error);
                toast.error(error.response?.data?.message || "Failed to add task");
            })
            .finally(() => {
                clearInput();
            });
    };

    const clearInput = () => {
        var allInputs = document.querySelectorAll('input');
        allInputs.forEach(singleInput => singleInput.value = '');

        setOpen(false);
    }

    return (
        <>
            <div className={`main-screen ${theme ? 'bg-gray-400' : 'bg-white'}`}>
                <ToastContainer />
                <div className='flex justify-between items-center'>
                    <p className='heading'>Tsak Manager</p>
                    <button onClick={toggleTheme} className={`theme-box`}>{theme ? <GoSun /> : <GoMoon />}</button>
                </div>
                <div className='my-6 flex gap-5 w-full'>
                    <Search setSearchValue={setSearchValue} />
                    <button className='button' onClick={openForm}>Add&nbsp;Task</button>
                </div>
                <div>
                    <TaskList searchValue={searchValue} />
                </div>
            </div>
            {open ? (
                <div className='h-screen w-screen backdrop-saturate-125 bg-white/80 flex justify-center items-center top-0 absolute'>
                    <div className='bg-white p-10 border rounded shadow-lg'>
                        <form className='flex flex-col gap-5' onSubmit={() => {
                            handleSubmit
                            clearInput
                        }}>
                            <button className='border rounded p-1 w-fit ms-auto cursor-pointer' onClick={clearInput}>
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
                                    />
                                </div>
                            </div>

                            <div className='flex gap-5'>
                                <div className='flex flex-col'>
                                    <label htmlFor="deadline">Deadline</label>
                                    <input
                                        type="text"
                                        name="deadline"
                                        value={formData.deadline}
                                        onChange={handleChange}
                                        className='task-input' />
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