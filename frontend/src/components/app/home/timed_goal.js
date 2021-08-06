import React,{useState,useEffect} from 'react'
import Timer from './timer'
import DeleteTaskButton from './buttons/delete_task_button'
import EditTaskButton from './buttons/edit_task_button'

export default function TimedGoal(props) {
  const {task,toggle,id,minusOneSecond} = props
  const [secondsLeft, setTime] = useState(task.secondsLeft)
  const[isRunning,toggleRunning] = useState(false)
  useEffect(()=>{
    setTime(task.secondsLeft)
  },[task.secondsLeft])
  return (
    <div className="task" id={`task_${id}`}>
      <div className="drag-handle">
        <i className="fas fa-ellipsis-h"></i>
      </div>
      <div className="body-wrapper">
        <p className="todo-title">{task.title}</p>
        <p className="todo-description">{task.description}</p>
      </div>
      <div className="time">
        <Timer isRunning={isRunning} toggleRunning={toggleRunning} secondsLeft={task.secondsLeft} minusOneSecond={minusOneSecond}/>
        <DeleteTaskButton taskId={task._id} />
      </div>
      <EditTaskButton toggleRunning={toggleRunning} setMenuOpen={props.setMenuOpen} task={task}/>
    </div>
  )
}
