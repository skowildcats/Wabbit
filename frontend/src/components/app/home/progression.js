import React from 'react'
import IncrementButton from './buttons/increment_button'
import DeleteTaskButton from './buttons/delete_task_button'
export default function Progression(props){
  const {task} = props
  return (
    <div className="task"> 
      <div className="drag-handle">
        <i className="fas fa-ellipsis-h"></i>
      </div>

      <div className="body-wrapper">
        <p id="todo-title">{task.title}</p>
        <p>{task.description}</p>
      </div>

      <div className="progress">
        <span className="total">{task.maxProgress}</span>
        <IncrementButton type="increment" task={task} />
        <span className="counter">{task.currentProgress}</span>
        <IncrementButton type="decrement" task={task} />
      </div>

      <DeleteTaskButton taskId={task._id}/>
    </div>
  )
}
