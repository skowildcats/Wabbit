import React from 'react'
import { connect } from 'react-redux'
import { updateTask } from '../../../../actions/task_actions'
export const MarkCompletedButton = (props) => {
  function markCompleted(){
    let updatedTask = props.task
    updatedTask.completed = "true";
    props.updateTask(updatedTask).then(task => {
      console.log(task)
    })
  }
  return (
    <button onClick={markCompleted}>Mark as completed</button>
  )
}

const mapDispatchToProps = dispatch => ({
  updateTask: task => dispatch(updateTask(task))
})

export default connect(null, mapDispatchToProps)(MarkCompletedButton)
