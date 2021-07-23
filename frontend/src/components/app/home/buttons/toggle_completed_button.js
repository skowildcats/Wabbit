import React from 'react'
import { connect } from 'react-redux'
import { updateTask } from '../../../../actions/task_actions'
export const ToggleCompletedButton = (props) => {
  function toggleCompleted() {
    let updatedTask = props.task
    updatedTask.completed = !props.task.completed;
    props.updateTask(updatedTask)
  };

  return (
    <button id="toggle-completed" onClick={toggleCompleted}>{
      props.task.completed ? (
        <img src={process.env.PUBLIC_URL + "/checked.png"} alt="checkmark" />
      ) : (
        <img src={process.env.PUBLIC_URL + "/unchecked.png"} alt="checkmark" />

      )
    }</button>
  )
}

const mapDispatchToProps = dispatch => ({
  updateTask: task => dispatch(updateTask(task))
})

export default connect(null, mapDispatchToProps)(ToggleCompletedButton)
