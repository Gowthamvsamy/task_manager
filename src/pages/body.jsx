// import files
import React, { useState } from 'react'
import Search from '../component/search'
import { GoSun, GoMoon } from "react-icons/go";
import { useTheme } from '../context/themeContext';
import TaskList from '../component/taskList';
import { ToastContainer, toast } from 'react-toastify';
import close from '../assets/close.png';
import logo from '../assets/logo.png'
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { MdCalendarToday } from 'react-icons/md';
import Filter from '../component/filter';
import { Autocomplete } from '@mui/material';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import EmpFilter from '../component/empFilter';

function Body() {

    // State
    const [searchValue, setSearchValue] = useState("");
    const [filterValue, setFilterValue] = useState("");
    const [errors, setErrors] = useState({});
    const [empLabels, setEmpLabels] = useState([]);

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

    // use context
    const { theme, toggleTheme, open, setOpen } = useTheme();

    // React Query Client
    const queryClient = useQueryClient();

    // Form validation
    const validateForm = () => {
        const newErrors = {};
        const { task_id, task_name, deadline, assign, priority, description } = formData;

        if (task_id.length < 3) newErrors.task_id = "Task ID must be at least 3 characters";
        if (task_name.length < 5) newErrors.task_name = "Task name must be at least 5 characters";
        if (!deadline) newErrors.deadline = "Please select a deadline";
        if (!assign) newErrors.assign = "Please assign an employee";
        if (!priority) newErrors.priority = "Please select a priority";
        if (description.length < 10) newErrors.description = "Description must be at least 10 characters";

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

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
            clearInput();
            queryClient.invalidateQueries(['tasks']);
        },
        onError: () => {
            toast.error("Failed to add task");
        }
    });

    // GET Employee list
    const { data: empData = [] } = useQuery({
        queryKey: ['employee'],
        queryFn: () =>
            fetch("http://localhost:5000/emp")
                .then(res => res.json())
                .then(data => data?.data || [])
                .catch(() => {
                    toast.error("Failed to fetch Employee");
                    return [];
                })
    });

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
        setErrors({});
        setOpen(false);
    }

    // Open Add Task form
    const openForm = () => {
        setOpen(true);
    }

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

        if (!validateForm()) {
            toast.error("Please fill all the fields correctly.");
            return;
        }

        addTaskMutation.mutate(formData);
    };

    return (
        <>
            {/* Body */}
            <div className={`h-screen relative ${theme === 'light' ? 'body-light' : 'body-dark'}`}>
                <ToastContainer />
                <div className='navbar'>
                    <div className='navContent'>
                        <img src={logo} alt="404" className='w-10' />
                        <p className={`heading ${theme === 'light' ? 'text-black' : 'text-white'}`}>Task Manager</p>
                    </div>

                    <div className='navContent'>
                        <div className='my-6 flex gap-3'>
                            <Search setSearchValue={setSearchValue} />
                        </div>
                        <div>
                            <Filter setFilterValue={setFilterValue} />
                        </div>
                        <div>
                            <EmpFilter setEmpLabels={setEmpLabels} />
                        </div>
                        <button onClick={toggleTheme} className={`theme-box ${theme === 'light' ? 'bg-transparent' : 'bg-gray-50/20'} group`}>
                            {theme === 'light' ? <GoSun /> : <GoMoon className='moon' />}
                        </button>
                    </div>
                </div>

                <div className='px-10'>
                    <TaskList searchValue={searchValue} filterValue={filterValue} empLabels={empLabels} />
                </div>
                <div className='relative group'>
                    <div className='extenal-addTask' onClick={openForm}>+</div>
                    <span className="newTask">
                        Add a new task
                    </span>
                </div>
            </div>

            {open ? (
                <div className={`h-screen w-screen edit-form ${theme === 'light' ? 'bg-white/80' : 'bg-black/80'}`}>
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
                                    {errors.task_id && <span className="validation-error">{errors.task_id}</span>}
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
                                    {errors.task_name && <span className="validation-error">{errors.task_name}</span>}
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
                                    {errors.deadline && <span className="validation-error">{errors.deadline}</span>}
                                    {!formData.deadline && (
                                        <MdCalendarToday className="datePicker-icon" />
                                    )}
                                </div>


                                {/* Task assign to */}
                                <div className='form-div'>
                                    <Autocomplete
                                        options={empData.map((emp) => ({
                                            label: emp.emp_name
                                        }))}
                                        getOptionLabel={(option) => option.label}
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
                                    {errors.assign && <span className="validation-error">{errors.assign}</span>}
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
                                    <option value="Low">🟢 Low</option>
                                    <option value="Medium">🟡 Medium</option>
                                    <option value="High">🔴 High</option>
                                </select>
                                {errors.priority && <span className="validation-error">{errors.priority}</span>}
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
                                {errors.description && <span className="validation-error">{errors.description}</span>}
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