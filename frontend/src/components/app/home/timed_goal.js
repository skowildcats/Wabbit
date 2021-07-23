import React from 'react'
import moment from 'moment'
import Timer from './timer'
export default function TimedGoal(props) {
  window.moment = moment
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
      <div className="time">
        <Timer expiryTimestamp={moment(task.goalTime).toDate()}/>
      </div>
    </div>
  )
}
