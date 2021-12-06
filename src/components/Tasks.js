import React from 'react'
import { Task } from './Task'

export const Tasks = ({ tasks, onDelete, onToggle }) => {

    return (
        <div>
            {tasks.map((task,index) => (
                <Task key={index} task={task} onDelete={onDelete} onToggle={onToggle} />
            ))}
        </div>
    )
}
