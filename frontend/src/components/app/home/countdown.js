import React from 'react'
import moment from 'moment'
import DeleteTaskButton from './buttons/delete_task_button'
export default function Countdown(props){
  let { task } = props
  function calcDiff(){
    let diffDays = moment(task.dueDate).diff(moment(), 'days')
    if(diffDays > 0) return diffDays + "days";
    let diffHrs = moment(task.dueDate).diff(moment(), 'hours');
    if(diffHrs > 0) return diffHrs + "hours";
    let diffMins = moment(task.dueDate).diff(moment(), 'minutes');
    return diffMins + "minutes";
  }
  return (
    <>
    <div className="task">
      <div className="drag-handle">
        <i className="fas fa-ellipsis-h"></i>
      </div>

      <div className="body-wrapper">
        <p>{task.title}</p>
        <p>{task.description}</p>
      </div>

      <div>
        {/* Days away from occuring */}
        <p>{calcDiff()} away</p>
      </div>
      <DeleteTaskButton taskId={task._id}/>
    </div>
    </>
  )
}
