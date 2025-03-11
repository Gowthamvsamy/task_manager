import React, { useState } from 'react'
import Search from '../component/search'
import { GoSun, GoMoon } from "react-icons/go";
import { useTheme } from '../context/themeContext';
import TaskList from '../component/taskList';


function Body() {

    const { theme, toggleTheme } = useTheme();
    const [open, setOpen] = useState(false);

    const openForm = () => {
        setOpen(true);
    }

    const [formData, setFormData] = useState({
        task_id: '',
        task_name: '',
        deadline: '',
        assign: '',
        description: '',
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    // const handleSubmit = async (e) => {
    //     e.preventDefault();

    //     // Add new task to your state or API here
    // }

    return (
        <>
            <div className={`main-screen ${theme ? 'bg-gray-400' : 'bg-white'}`}>
                <div className='flex justify-between items-center'>
                    <p className='heading'>Tsak Manager</p>
                    <button onClick={toggleTheme} className={`theme-box`}>{theme ? <GoSun /> : <GoMoon />}</button>
                </div>
                <div className='my-6 flex gap-5 w-full'>
                    <Search />
                    <button className='button' onClick={openForm}>Add&nbsp;Task</button>
                </div>
                <div>
                    <TaskList />
                </div>
            </div>
            {open ? (
                <div className='h-screen w-screen backdrop-saturate-125 bg-white/80 flex justify-center items-center top-0 absolute'>
                    <div className='bg-white p-10 border rounded shadow-lg'>
                        <form className='flex flex-col gap-5'> {/* onSubmit={handleSubmit} */}
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
                                    <select className='task-input'>
                                        <option name="assign" value={formData.assign}>Employer 1</option>
                                        <option name="assign" value={formData.assign}>Employer 2</option>
                                        <option name="assign" value={formData.assign}>Employer 3</option>
                                        <option name="assign" value={formData.assign}>Employer 4</option>
                                        <option name="assign" value={formData.assign}>Employer 5</option>
                                    </select>
                                </div>
                            </div>

                            <div className='flex flex-col'>
                                <label htmlFor="Description">Description</label>
                                <textarea
                                    className='task-input'
                                    rows={4}
                                    name="description"
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