import React from 'react'
import IncrementButton from './buttons/increment_button'
import DeleteTaskButton from './buttons/delete_task_button'
export default function Progression(props){
  const {task, id} = props
  return (
    <div className="task" id={`task_${id}`}> 
      <div className="drag-handle">
        <i className="fas fa-ellipsis-h"></i>
      </div>

      <div className="body-wrapper">
        <p className="todo-title">{task.title}</p>
        <p className="todo-description">{task.description}</p>
      </div>

      <div className="progress">
        <span className="counter">{task.currentProgress}/{task.maxProgress}</span>
        <div className="counter-buttons">
          <IncrementButton type="increment" task={task} />
          <IncrementButton type="decrement" task={task} />
        </div>
      </div>

      <DeleteTaskButton taskId={task._id}/>
    </div>
  )
}
