import React from 'react'
import { connect } from 'react-redux'
import { deleteTask } from '../../../../actions/task_actions'

export const DeleteTaskButton = (props) => {
  return (
    <button onClick={() => props.deleteTask(props.taskId)}>Delete Task</button>
  )
}

const mapDispatchToProps = dispatch => ({
  deleteTask: (taskId) => dispatch(deleteTask(taskId))
})

export default connect(null, mapDispatchToProps)(DeleteTaskButton)
