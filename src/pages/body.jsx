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
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { MdCalendarToday } from 'react-icons/md';
import Filter from '../component/filter';
import items from '../component/employee.json'
import { Autocomplete } from '@mui/material';



function Body() {

    // State
    const [searchValue, setSearchValue] = useState("");
    const [filterValue, setFilterValue] = useState("");

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
        priority: '',
        status: 'Todo',
    });

    // Listener for Form Data
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    // Listener for Date Picker
    const handleDateChange = (date) => {
        setFormData({ ...formData, deadline: date });
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
            priority: '',
        });

        setOpen(false);
    }

    return (
        <>
            {/* Body */}
            <div className={`h-screen relative ${theme ? 'bg-gradient-to-bl from-[#e9e5da] to-[#d5e2ce]' : 'bg-gradient-to-bl from-[#635e57] to-[#697265]'}`}>
                <ToastContainer />
                <div className='navbar'>
                    <div className='navContent'>
                        <img src={logo} alt="404" className='w-10' />
                        <p className={`heading ${theme ? 'text-black' : 'text-white'}`}>Task Manager</p>
                    </div>

                    <div className='navContent'>
                        <div className='my-6 flex gap-3'>
                            <Search setSearchValue={setSearchValue} />
                        </div>
                        <div>
                            <Filter setFilterValue={setFilterValue} />
                        </div>
                        <button onClick={toggleTheme} className={`theme-box group  ${theme ? 'shadow-black' : 'shadow-white bg-gray-50/20'}`}>{theme ? <GoSun /> : <GoMoon className='text-white moon' />}</button>
                    </div>
                </div>

                <div className='px-10'>
                    <TaskList searchValue={searchValue} filterValue={filterValue} />
                </div>
                <div className='relative group'>
                    <div className='extenal-addTask' onClick={openForm}>+</div>
                    <span className="newTask">
                        Add a new task
                    </span>
                </div>
            </div>

            {open ? (
                <div className={`h-screen w-screen edit-form ${theme ? 'bg-white/80' : 'bg-black/80'}`}>
                    <div className='formBg'>
                        <form className='form-div gap-5' onSubmit={handleSubmit}>
                            <button className='formClose' onClick={clearInput}>
                                <img src={close} alt="404" className='w-6' />
                            </button>
                            <p className='form-title'>Add Task Form</p>
                            <div className='flex gap-5'>
                                {/* Task ID */}
                                <div className='form-div'>
                                    <input
                                        type="text"
                                        name="task_id"
                                        value={formData.id}
                                        onChange={handleChange}
                                        className="task-input"
                                        placeholder='Task ID'
                                        required
                                    />
                                </div>
                                {/* Task Name */}
                                <div className='form-div'>
                                    <input
                                        type="text"
                                        name="task_name"
                                        value={formData.name}
                                        onChange={handleChange}
                                        className="task-input"
                                        placeholder='Task Name'
                                        required
                                    />
                                </div>
                            </div>

                            <div className='flex gap-5'>
                                {/* Date Picker */}
                                <div className='form-div relative'>
                                    <DatePicker
                                        selected={formData.deadline ? new Date(formData.deadline) : null}
                                        onChange={handleDateChange}
                                        dateFormat="yyyy-MM-dd"
                                        placeholderText="Select a date"
                                        className="placeholder:pl-6 task-input"
                                        minDate={new Date()}
                                        isClearable
                                        required
                                    />
                                    {!formData.deadline && (
                                        <MdCalendarToday className="datePicker-icon" />
                                    )}
                                </div>

                                {/* Task assign to */}
                                <div className='form-div w-[48%]'>
                                    {/* <select
                                        className={`task-input ${formData.assign ? 'text-black' : 'text-gray-400'}`}
                                        name='assign'
                                        value={formData.assign}
                                        onChange={handleChange}
                                        required
                                    >
                                        <option value="" disabled>Select an Employee</option>
                                        <option value="employe1">Employee 1</option>
                                        <option value="employe2">Employee 2</option>
                                        <option value="employe3">Employee 3</option>
                                        <option value="employe4">Employee 4</option>
                                        <option value="employe5">Employee 5</option>
                                    </select> */}

                                    <Autocomplete
                                        options={items}
                                        getOptionLabel={(option) => option.label}
                                        value={items.find((item) => item.label === formData.assign) || null}
                                        onChange={(_, newValue) => {
                                            setFormData({
                                                ...formData,
                                                assign: newValue ? newValue.label : ''
                                            });
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
                            <div>
                                {/* Task Priority */}
                                <select
                                    className={`task-input ${formData.priority ? 'text-black' : 'text-gray-400'}`}
                                    name='priority'
                                    value={formData.priority}
                                    onChange={handleChange}
                                    required
                                >
                                    <option value="" disabled>Select an priority</option>
                                    <option className="text-black" value="Low">🟢 Low</option>
                                    <option className="text-black" value="Medium">🟡 Medium</option>
                                    <option className="text-black" value="High">🔴 High</option>
                                </select>
                            </div>
                            {/* Task Description */}
                            <div className='form-div'>
                                <textarea
                                    className='task-input'
                                    rows={4}
                                    name="description"
                                    value={formData.description}
                                    onChange={handleChange}
                                    placeholder='Description'
                                    required
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