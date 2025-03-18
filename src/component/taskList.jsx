import React, { useEffect, useReducer, useState } from 'react'
import { useTheme } from '../context/themeContext'
import axios from 'axios';
import rightArrow from '../assets/rightAr.png'
import { toast } from 'react-toastify';
import EditForm from './editForm';
import edit from '../assets/edit-icon.png'

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
        // case "RSDONE":
        //     return "In Progress";
    }
}


function TaskList({ searchValue }) {

    const { open } = useTheme();

    const [taskData, setTaskData] = useState([]);
    const [editlist, setEditlist] = useState();
    const [editForm, setEditForm] = useState(false);
    const [Updated, setUpdated] = useState(false)

    // useReducer Hook
    const [, dispatchStatus] = useReducer(reducer, initialState);

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
                console.log("Fetch error:", error);
                setTaskData([]);
            });
    };
    

    useEffect(() => {
        getData()
    }, [open])

    useEffect(() => {
        if(Updated){
            getData()
            setUpdated(false)
        }
        
    }, [Updated])

    console.log("Updated", Updated);


    const filteredTasks = Array.isArray(taskData) ? taskData.filter((task) =>
        task.task_name.toLowerCase().includes(searchValue.toLowerCase())
    ) : [];

    const moveToInProgress = (id, newStatus) => {

        axios.patch(`http://localhost:4000/task/update/${id}`, { status: newStatus }, {
            headers: {
                "content-Type": "application/json",
            },
        })
            .then((response) => {
                console.log(response.data.message);
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

    const viewEdite = (task) => {
        setEditlist(task)
        setEditForm(true)
    }

    return (
        <>
            <div className='task'>
                <div className='task-list'>
                    <p>Todo</p>
                    {filteredTasks.filter(task => task.status === "Todo")
                        .map(task => (
                            <div key={task.task_id} className='task-item todo'>
                                <div className='flex justify-between'>
                                    <p>{task.task_name}</p>
                                    <div className='flex gap-2'>
                                        <button onClick={() => viewEdite(task)}>
                                            <img src={edit} alt="404" className='w-[19px]' />
                                        </button>
                                        <button onClick={() => {
                                            moveToInProgress(task._id, "In Progress")
                                            dispatchStatus({ type: "In Progress" })
                                        }}>
                                            <img src={rightArrow} alt="404" className='w-5' />
                                        </button>
                                    </div>
                                </div>
                                <div className='my-3'>{task.description}</div>
                                <div className='flex justify-between '>
                                    <div>{task.deadline}</div>
                                    <div className='flex gap-3'>
                                        <p>{task.task_id}</p>
                                        <p>{task.assign}</p>
                                    </div>
                                </div>
                            </div>
                        ))
                    }
                </div>
                <div className='task-list'>
                    <p>In progress</p>
                    {filteredTasks.filter(task => task.status === "In Progress")
                        .map(task => (
                            <div key={task.task_id} className='task-item progress'>
                                <div className='flex justify-between'>
                                    <p>{task.task_name}</p>
                                    <div className='flex gap-2'>
                                        <button onClick={() => viewEdite(task)}>
                                            <img src={edit} alt="404" className='w-[19px]' />
                                        </button>
                                        <button onClick={() => {
                                            moveToInProgress(task._id, "Done")
                                            dispatchStatus({ type: "Done" })
                                        }}>
                                            <img src={rightArrow} alt="404" className='w-5' />
                                        </button>
                                    </div>

                                </div>
                                <div className='my-3'>{task.description}</div>
                                <div className='flex justify-between '>
                                    <div>{task.deadline}</div>
                                    <div className='flex gap-3'>
                                        <p>{task.task_id}</p>
                                        <p>{task.assign}</p>
                                    </div>
                                </div>
                            </div>
                        ))
                    }
                </div>
                <div className='task-list'>
                    <p>Done</p>
                    {filteredTasks.filter(task => task.status === "Done")
                        .map(task => (
                            <div key={task.task_id} className='task-item done'>
                                <div className='flex justify-between'>
                                    <p>{task.task_name}</p>
                                    <button onClick={() => viewEdite(task)}>
                                        <img src={edit} alt="404" className='w-[19px]' />
                                    </button>
                                </div>
                                <div className='my-3'>{task.description}</div>
                                <div className='flex justify-between '>
                                    <div>{task.deadline}</div>
                                    <div className='flex gap-3'>
                                        <p>{task.task_id}</p>
                                        <p>{task.assign}</p>
                                    </div>
                                </div>
                            </div>
                        ))
                    }
                </div>
            </div>
            {editForm && (
                <EditForm setUpdated={setUpdated} task={editlist} onClose={() => setEditForm(false)} />
            )}
        </>
    )
}

export default TaskList