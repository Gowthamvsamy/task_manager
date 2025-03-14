import React, { useEffect, useState } from 'react'
import { useTheme } from '../context/themeContext'
import axios from 'axios';
import rightArrow from '../assets/rightAr.png'

function TaskList({ searchValue }) {

    const { open } = useTheme();

    const [taskData, setTaskData] = useState([]);

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

    const filteredTasks = Array.isArray(taskData) ? taskData.filter((task) =>
        task.task_name.toLowerCase().includes(searchValue.toLowerCase())
    ) : [];

    const moveToInProgress = (task) => {
        
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
                                    <button onClick={() => moveToInProgress(task.task_id)}>
                                        <img src={rightArrow} alt="404" className='w-5' />
                                    </button>
                                </div>
                                <div>{task.description}</div>
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
                    {filteredTasks.filter(task => task.status === "In progress")
                        .map(task => (
                            <div key={task.task_id} className='task-item progress'>
                                <div className='flex justify-between'>
                                    <p>{task.task_name}</p>
                                    <button>
                                        <img src={rightArrow} alt="404" className='w-5' />
                                    </button>
                                </div>
                                <div>{task.description}</div>
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
                                    <button>
                                        <img src={rightArrow} alt="404" className='w-5' />
                                    </button>
                                </div>
                                <div>{task.description}</div>
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
        </>
    )
}

export default TaskList