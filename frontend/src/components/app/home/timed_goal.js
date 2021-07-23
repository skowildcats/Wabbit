import React,{useState} from 'react'
import moment from 'moment'
import Timer from './timer'
import { DeleteTaskButton } from './buttons/delete_task_button'
export default function TimedGoal(props) {
  const {task} = props
  console.log(task)
  const [time, setTime] = useState(moment(task.goalTime).toDate())
  console.log(time)
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
        <Timer expiryTimestamp={time} toggle={props.toggle}/>
        <DeleteTaskButton taskId={task._id} />
      </div>
    </div>
  )
}
