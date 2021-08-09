import React from 'react'
import { connect } from 'react-redux'
import { deleteTask } from '../../../../actions/task_actions'

const DeleteTaskButton = (props) => {
  return (
    <button className="delete-task" onClick={() => props.deleteTask(props.taskId)}>&times;</button>
  )
}


const mapDispatchToProps = dispatch => ({
  deleteTask: (taskId) => dispatch(deleteTask(taskId))
})

export default connect(null, mapDispatchToProps)(DeleteTaskButton);