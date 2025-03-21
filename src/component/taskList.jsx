import React, { useEffect, useReducer, useState } from 'react'
import { Menu, MenuButton, MenuItem, MenuItems } from '@headlessui/react'
import { useTheme } from '../context/themeContext'
import axios from 'axios';
import { toast } from 'react-toastify';
import EditForm from './editForm';
import { BsThreeDotsVertical } from "react-icons/bs";
import { BiSolidEdit } from "react-icons/bi";
import { GoArrowRight } from "react-icons/go";


// Initial state
const initialState = "Todo";

//Reducer function
const reducer = (status, action) => {
    switch (action.type) {
        case "INPROGRESS":
            return "In Progress";
        case "DONE":
            return "Done";
        case "DELETE":
            return " ";
    }
}


function TaskList({ searchValue, filterValue }) {

    // context
    const { open, setOpen, theme } = useTheme();

    // state
    const [taskData, setTaskData] = useState([]);
    const [editlist, setEditlist] = useState();
    const [editForm, setEditForm] = useState(false);
    const [Updated, setUpdated] = useState(false)

    // useReducer Hook
    const [, dispatchStatus] = useReducer(reducer, initialState);

    // get all data using API
    const getData = () => {
        axios.get("http://localhost:4000/task/all")
            .then(response => {

                if (response.data && Array.isArray(response.data.data)) {
                    setTaskData(response.data.data);
                } else {
                    console.error("Unexpected response format:", response.data);
                    setTaskData([]);
                }
            })
            .catch(error => {
                console.error("Fetch error:", error);
                setTaskData([]);
            });
    };

    // useEffect for GET method
    useEffect(() => {
        getData()
    }, [open])

    // useEffect for updated task
    useEffect(() => {
        if (Updated) {
            getData()
            setUpdated(false)
        }

    }, [Updated])

    // use to Search and Filter the task
    const filteredTasks = Array.isArray(taskData)
        ? taskData
            .filter((task) =>
                (task?.task_name || "").toLowerCase().includes(searchValue.toLowerCase())
            )
            .filter((task) =>
                filterValue.toLowerCase() === "all" || (task?.priority || "").toLowerCase().includes(filterValue.toLowerCase())
            )
        : [];

    // PATCH method for update taske
    const moveToInProgress = (id, newStatus) => {

        axios.patch(`http://localhost:4000/task/update/${id}`, { status: newStatus }, {
            headers: {
                "content-Type": "application/json",
            },
        })
            .then(() => {
                toast.success("Task Updated Successfully");
                dispatchStatus({ type: newStatus.toUpperCase().replace(" ", "") });
            })
            .catch((error) => {
                console.error("Error changing task:", error)
                toast.error("Task Changing Error")
            })
            .finally(() => {
                getData()
            });
    }

    // Edit task function
    const viewEdite = (task) => {
        setEditlist(task)
        setEditForm(true)
    }

    // Open Add Task form
    const openForm = () => {
        setOpen(true);
    }


    return (
        <>
            <div className='task'>
                {/* Todo List */}
                <div className='task-list'>
                    <div className='task-heading todo'>
                        <p>Todo</p>
                    </div>
                    {filteredTasks.filter(task => task.status === "Todo")
                        .map(task => (
                            <div key={task.task_id} className={`task-item ${theme ? "bg-white/90" : "bg-gray-300"}`}>
                                <div className='flex justify-between'>
                                    <p className='card-title'>{task.task_name}</p>
                                    <div className='flex gap-2'>
                                        <Menu as="div" className="menuBox">
                                            <div>
                                                <MenuButton className="menuButton">
                                                    <BsThreeDotsVertical className='text-xl cursor-pointer' />
                                                </MenuButton>
                                            </div>
                                            <MenuItems transition className="meniItems">
                                                <div className=' form-div gap-y-2 py-2'>
                                                    <MenuItem>
                                                        <button onClick={() => viewEdite(task)} className='menuItem'>
                                                            <BiSolidEdit />
                                                            <p className=''>Edit</p>
                                                        </button>
                                                    </MenuItem>
                                                    <MenuItem>
                                                        <button onClick={() => {
                                                            moveToInProgress(task._id, "In Progress")
                                                            dispatchStatus({ type: "In Progress" })
                                                        }} className='menuItem'>
                                                            <GoArrowRight />
                                                            <p>Move</p>
                                                        </button>
                                                    </MenuItem>
                                                </div>
                                            </MenuItems>
                                        </Menu>
                                    </div>
                                </div>
                                <div className='mb-3'>{task.description}</div>
                                <div className='flex justify-between '>
                                    <div>{new Date(task.deadline).toISOString().split('T')[0]}</div>
                                    <div className='flex gap-3'>
                                        <p className={`taskList-priority ${task.priority === "Low" ? "bg-green-500" : task.priority === "Medium" ? "bg-yellow-500" : "bg-red-500"}`}></p>
                                        <p>{task.task_id}</p>
                                        <p>{task.assign}</p>
                                    </div>
                                </div>
                            </div>
                        ))
                    }
                    <div className='task-footer' onClick={openForm}>
                        <button >+ New Task</button>
                    </div>
                </div>

                {/* In Progress List */}
                <div className='task-list'>
                    <div className='task-heading progress'>
                        <p>In Progress</p>
                    </div>
                    {filteredTasks.filter(task => task.status === "In Progress")
                        .map(task => (
                            <div key={task.task_id} className={`task-item ${theme ? "bg-white/90" : "bg-gray-300"}`}>
                                <div className='flex justify-between'>
                                    <p className='card-title'>{task.task_name}</p>
                                    <div className='flex gap-2'>
                                        <Menu as="div" className="menuBox">
                                            <div>
                                                <MenuButton className="menuButton">
                                                    <BsThreeDotsVertical className='text-xl cursor-pointer' />
                                                </MenuButton>
                                            </div>
                                            <MenuItems transition className="meniItems">
                                                <div className=' form-div gap-y-2 py-2'>
                                                    <MenuItem>
                                                        <button onClick={() => viewEdite(task)} className='menuItem'>
                                                            <BiSolidEdit />
                                                            <p className=''>Edit</p>
                                                        </button>
                                                    </MenuItem>
                                                    <MenuItem>
                                                        <button onClick={() => {
                                                            moveToInProgress(task._id, "Done")
                                                            dispatchStatus({ type: "Done" })
                                                        }} className='menuItem'>
                                                            <GoArrowRight />
                                                            <p>Move</p>
                                                        </button>
                                                    </MenuItem>
                                                </div>
                                            </MenuItems>
                                        </Menu>
                                    </div>
                                </div>
                                <div className='mb-3'>{task.description}</div>
                                <div className='flex justify-between '>
                                    <div>{new Date(task.deadline).toISOString().split('T')[0]}</div>
                                    <div className='flex gap-3'>
                                        <p className={`taskList-priority ${task.priority === "Low" ? "bg-green-500" : task.priority === "Medium" ? "bg-yellow-500" : "bg-red-500"}`}></p>
                                        <p>{task.task_id}</p>
                                        <p>{task.assign}</p>
                                    </div>
                                </div>
                            </div>
                        ))
                    }
                </div>

                {/* Done List */}
                <div className='task-list'>
                    <div className='task-heading done'>
                        <p>Done</p>
                    </div>
                    {filteredTasks.filter(task => task.status === "Done")
                        .map(task => (
                            <div key={task.task_id} className={`task-item ${theme ? "bg-white/90" : "bg-gray-300"}`}>
                                <div className='flex justify-between'>
                                    <p className='card-title'>{task.task_name}</p>

                                    <Menu as="div" className="menuBox">
                                        <div>
                                            <MenuButton className="menuButton">
                                                <BsThreeDotsVertical className='text-xl cursor-pointer' />
                                            </MenuButton>
                                        </div>
                                        <MenuItems transition className="meniItems">
                                            <div className=' form-div gap-y-2 py-2'>
                                                <MenuItem>
                                                    <button onClick={() => viewEdite(task)} className='menuItem'>
                                                        <BiSolidEdit />
                                                        <p className=''>Edit</p>
                                                    </button>
                                                </MenuItem>
                                            </div>
                                        </MenuItems>
                                    </Menu>
                                </div>
                                <div className='mb-3'>{task.description}</div>
                                <div className='flex justify-between '>
                                    <div>{new Date(task.deadline).toISOString().split('T')[0]}</div>
                                    <div className='flex gap-3'>
                                        <p className={`taskList-priority ${task.priority === "Low" ? "bg-green-500" : task.priority === "Medium" ? "bg-yellow-500" : "bg-red-500"}`}></p>
                                        <p>{task.task_id}</p>
                                        <p>{task.assign}</p>
                                    </div>
                                </div>
                            </div>
                        ))
                    }
                </div>
            </div>

            {/* Edit form call */}
            {editForm && (
                <EditForm setUpdated={setUpdated} task={editlist} onClose={() => setEditForm(false)} />
            )}
        </>
    )
}

export default TaskList