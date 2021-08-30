import React from 'react'
export default (props) => {
  const { type } = props.task
  let config;
  switch(type){
    case 'task':
      config = ['task', "TASK"]
      break;
    case 'countdown':
      config = ['countdown', "COUNTDOWN"]
      break
    case 'progress':
      config = ['progress', "TRACKER"]
      break
    case 'timedGoal':
      config = ["timedGoal", "TIMER"]
      break;
  }

  return (
    // <img className="edit-task-btn" onClick={() => {props.setMenuOpen(true, "edit", props.task)}} src={process.env.PUBLIC_URL + "/edit-icon.svg"} alt="Edit" />
    <img className="edit-task-btn" onClick={() => {props.setMenuOpen(true, config[0], config[1], "edit", props.task); props.toggleRunning(false)}} src={process.env.PUBLIC_URL + "/edit-icon.svg"} alt="Edit" />
  )
}
