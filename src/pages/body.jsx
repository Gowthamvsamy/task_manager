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
                        <form className='flex flex-col gap-5'>
                            <div className='flex gap-5'>
                                <div className='flex flex-col'>
                                    <label htmlFor="id">Task ID</label>
                                    <input type="text" className='task-input'/>
                                </div>
                                <div className='flex flex-col'>
                                    <label htmlFor="name">Task Name</label>
                                    <input 
                                        type="text" 
                                        className='task-input'
                                        name=''
                                    />
                                </div>
                            </div>

                            <div className='flex gap-5'>
                                <div className='flex flex-col'>
                                    <label htmlFor="deadline">Deadline</label>
                                    <input type="text" className='task-input' />
                                </div>
                                <div className='flex flex-col w-full'>
                                    <label htmlFor="assign">Assign To</label>
                                    <select className='task-input'>
                                        <option value=""></option>
                                        <option value=""></option>
                                        <option value=""></option>
                                        <option value=""></option>
                                        <option value=""></option>
                                    </select>
                                </div>
                            </div>

                            <div className='flex flex-col'>
                                <label htmlFor="Description">Description</label>
                                <textarea className='task-input' rows={4}></textarea>
                            </div>
                            <button className='button'>Add&nbsp;Task</button>
                        </form>
                    </div>
                </div>
            ) : null}
        </>
    )
}

export default Body