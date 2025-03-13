import React, { useEffect, useState } from 'react'
import { useTheme } from '../context/themeContext'
import axios from 'axios';
import rightArrow from '../assets/rightAr.png'

function TaskList({ searchValue }) {

    const { open } = useTheme();

    const [taskData, setTaskData] = useState([]);

    const getData = () => {
        axios.get("https://run.mocky.io/v3/1e884ea1-e41e-42c1-8d00-ea5ec85e4502")
            .then(response => {
                console.log("API Response:", response.data); // Debugging
                setTaskData(response.data); // No need to parse
            })
            .catch(error => {
                console.log("Fetch error:", error);
            });
    };

    useEffect(() => {
        getData()
    }, [open])

    const filteredTasks = taskData.filter((task) =>
        task.task_name.toLowerCase().includes(searchValue.toLowerCase())
      );

    //   console.log("filteredTasks", filteredTasks)

    const stProgress = () => {

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
                                    <button onClick={stProgress}>
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
                    {filteredTasks
                        .filter(task => task.status === "In progress")
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
                    {filteredTasks
                        .filter(task => task.status === "Done")
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