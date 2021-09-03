import React from 'react'
import IncrementButton from './buttons/increment_button'
import DeleteTaskButton from './buttons/delete_task_button'
import EditTaskButton from './buttons/edit_task_button';


export default function Progression(props){
  const {task, id} = props
  let style = getComputedStyle(document.getElementById("app"));

  return (
    <div className="task" id={`${id}`}> 
      <div className="drag-handle" style={{background: style.getPropertyValue(`--task-color-${task.color}`)}}>
        <i className="fas fa-ellipsis-h"></i>
      </div>

      <div className="body-wrapper">
        <p className="todo-title">{task.title}</p>
        <p className="todo-description">{task.description}</p>
      </div>

      <div className="progress">
        <span className="counter">{task.currentProgress} / {task.maxProgress}</span>
        <div className="counter-buttons">
          <IncrementButton type="increment" task={task} />
          <IncrementButton type="decrement" task={task} />
        </div>
      </div>

      <DeleteTaskButton taskId={task._id}/>
      <img className="task-icon" src={`${process.env.PUBLIC_URL}/icons/${task.icon}.png`} alt="home-btn" />
      <EditTaskButton setMenuOpen={props.setMenuOpen} task={task}/>
    </div>
  )
}
