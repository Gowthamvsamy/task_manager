import React, { useEffect, useState } from 'react'
import { useTheme } from '../context/themeContext'
import axios from 'axios';

function TaskList() {

    const { open } = useTheme();

    const [taskData, setTaskData] = useState(null);

    const getData = async () => {
        await axios.get("https://run.mocky.io/v3/62b7d715-8a7a-485f-8957-9e01f317733b")
            .then(response => { setTaskData(response.data) })
            .catch(error => { console.log(error) })
    };

    useEffect(() => {
        getData()
        console.log("fetch data")
    }, [open])

    return (
        <>
            <div className='task'>
                <div className='task-list'>
                    <p>Todo</p>
                    {taskData && (
                        <>
                            <p>{console.log(taskData)}</p>
                        </>
                    )}
                </div>
                <div className='task-list'>
                    <p>In progress</p>
                </div>
                <div className='task-list'>
                    <p>Done</p>
                </div>
            </div>
        </>
    )
}

export default TaskList