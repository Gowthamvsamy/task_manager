import React from 'react'

function TaskList() {
  return (
    <>
        <div className='task'>
            <div className='task-list'>
                <p>Todo</p>
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