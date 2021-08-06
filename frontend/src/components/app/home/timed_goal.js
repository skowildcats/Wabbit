import React,{useState,useEffect} from 'react'
import Timer from './timer'
import DeleteTaskButton from './buttons/delete_task_button'
export default function TimedGoal(props) {
  const {task,toggle,id,minusOneSecond} = props
  const [secondsLeft, setTime] = useState(task.secondsLeft)
  useEffect(()=>{
    setTime(task.secondsLeft)
  },[task.secondsLeft])
  return (
    <div className="task" id={`${id}`}>
      <div className="drag-handle">
        <i className="fas fa-ellipsis-h"></i>
      </div>
      <div className="body-wrapper">
        <p className="todo-title">{task.title}</p>
        <p className="todo-description">{task.description}</p>
      </div>
      <div className="time">
        <Timer secondsLeft={task.secondsLeft} minusOneSecond={minusOneSecond}/>
        <DeleteTaskButton taskId={task._id} />
      </div>
    </div>
  )
}
