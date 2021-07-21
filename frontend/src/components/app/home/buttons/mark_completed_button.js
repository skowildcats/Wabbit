import React from 'react'
import { connect } from 'react-redux'
import { updateTask } from '../../../../actions/task_actions'
export const MarkCompletedButton = (props) => {
  return (
    <button>Done</button>
  )
}

const mapDispatchToProps = dispatch => ({
  updateTask: task => dispatch(updateTask(task))
})

export default connect(null, mapDispatchToProps)(MarkCompletedButton)
