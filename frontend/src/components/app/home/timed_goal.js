import React,{useState} from 'react'
import moment from 'moment'
import Timer from './timer'
import DeleteTaskButton from './buttons/delete_task_button'
export default function TimedGoal(props) {
  const {task,toggle} = props
  debugger
  const [time, setTime] = useState(task.goalTime)
  debugger
  return (
    <div className="task">
      <div className="drag-handle">
        <i className="fas fa-ellipsis-h"></i>
      </div>
      <div className="body-wrapper">
        <p className="todo-title">{task.title}</p>
        <p className="todo-description">{task.description}</p>
      </div>
      <div className="time">
        <Timer expiryTimestamp={time} toggle={toggle}/>
        <DeleteTaskButton taskId={task._id} />
      </div>
    </div>
  )
}
