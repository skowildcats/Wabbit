import React, { useState } from 'react'
import { connect } from 'react-redux'
import { updateTask } from '../../../../actions/task_actions'
export const EditTaskButton = (props) => {
  const [open, setOpen] = useState(false);
  return (
    <>
      <div>
        <img onClick={() => props.setMenuOpen(true, "task", "TASK", "edit", props.task)} src={process.env.PUBLIC_URL + "/edit-icon.svg"} alt="Edit" />
      </div>
    </>
  )
}

const mapStateToProps = (state) => ({
  
})

const mapDispatchToProps = dispatch => ({
  updateTask: (task) => dispatch(updateTask(task))
})

export default connect(mapStateToProps, mapDispatchToProps)(EditTaskButton)
