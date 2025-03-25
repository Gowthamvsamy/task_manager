import React, { useEffect, useReducer, useState } from 'react'
import { Menu, MenuButton, MenuItem, MenuItems } from '@headlessui/react'
import { useTheme } from '../context/themeContext'
import { toast } from 'react-toastify';
import EditForm from './editForm';
import { BsThreeDotsVertical } from "react-icons/bs";
import { BiSolidEdit } from "react-icons/bi";
import { GoArrowRight } from "react-icons/go";
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';


// Initial state
const initialState = "Todo";

//Reducer function
const reducer = (state, action) => ({
    "INPROGRESS": "In Progress",
    "DONE": "Done"
}[action.type] || state);


function TaskList({ searchValue, filterValue }) {

    // context
    const { open, setOpen, theme } = useTheme();

    // state
    const [editlist, setEditlist] = useState();
    const [editForm, setEditForm] = useState(false);
    const [Updated, setUpdated] = useState(false)

    // useReducer Hook
    const [, dispatchStatus] = useReducer(reducer, initialState);

    // React Query Client
    const queryClient = useQueryClient();

    // get all data using API
    const { data: taskData = [], refetch } = useQuery({
        queryKey: ['tasks'],
        queryFn: () =>
            fetch("http://localhost:5000/task/all")
                .then(res => res.json())
                .then(data => data?.data || [])
                .catch(() => {
                    toast.error("Failed to fetch tasks");
                    return [];
                })
    });

    // Mutation for updating task status
    const updateTaskMutation = useMutation({
        mutationFn: ({ id, newStatus }) =>
            fetch(`http://localhost:5000/task/update/${id}`, {
                method: "PATCH",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ status: newStatus })
            }),
        onSuccess: () => {
            toast.success("Task Updated Successfully");
            queryClient.invalidateQueries(['tasks']);
        },
        onError: () => {
            toast.error("Task Changing Error");
        }
    });

    // use to Search and Filter the task
    const filteredTasks = Array.isArray(taskData)
        ? taskData
            .filter((task) =>
                (task?.task_name || "").toLowerCase().includes(searchValue.toLowerCase())
            )
            .filter((task) => {
                if (!Array.isArray(filterValue) || filterValue.includes("All")) {
                    return true; 
                }
    
                // Check if task priority matches any selected filters
                return filterValue.some((value) => 
                    (task?.priority || "").toLowerCase().includes(value.toLowerCase())
                );
            })
        : [];
    
    // Move task to In Progress or Done
    const moveToInProgress = (id, newStatus) => {
        updateTaskMutation.mutate({ id, newStatus });
        dispatchStatus({ type: newStatus.toUpperCase().replace(" ", "") });
    };

    // Edit task function
    const viewEdite = (task) => {
        setEditlist(task)
        setEditForm(true)
    }

    // Open Add Task form
    const openForm = () => {
        setOpen(true);
    }

     // Refetch tasks when opening the form
     useEffect(() => {
        if (open) {
            refetch();
        }
    }, [open, refetch]);

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
                                    <p className='card-title'>{task.task_id} : {task.task_name}</p>
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
                                    <p className='card-title'>{task.task_id} : {task.task_name}</p>
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
                                    <p className='card-title'>{task.task_id} : {task.task_name}</p>

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