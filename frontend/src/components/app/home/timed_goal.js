import React,{useState,useEffect} from 'react'
import Timer from './timer'
import DeleteTaskButton from './buttons/delete_task_button'
import EditTaskButton from './buttons/edit_task_button'

export default function TimedGoal(props) {
  
  let style = getComputedStyle(document.getElementById("app"));
  const {task,toggle,id,minusOneSecond} = props
  const [secondsLeft, setTime] = useState(task.secondsLeft)
  const[isRunning,toggleRunning] = useState(false)
  useEffect(()=>{
    setTime(task.secondsLeft)
  },[task.secondsLeft])

  return (
    <div className="task" id={`${props.id}`}>
      <div className="drag-handle" style={{background: style.getPropertyValue(`--task-color-${task.color}`)}}>
        <i className="fas fa-ellipsis-h"></i>
      </div>
      <div className="body-wrapper">
        <p className="todo-title">{task.title}</p>
        <p className="todo-description">{task.description}</p>
      </div>
      <div className="time">
        <Timer isRunning={isRunning} toggleRunning={toggleRunning} secondsLeft={task.secondsLeft} minusOneSecond={minusOneSecond}/>
      </div>
      <DeleteTaskButton taskId={task._id} />
      <img className="task-icon" src={`${process.env.PUBLIC_URL}/icons/${task.icon}.png`} alt="home-btn" />
      <EditTaskButton toggleRunning={toggleRunning} setMenuOpen={props.setMenuOpen} task={task}/>
    </div>
  )
}