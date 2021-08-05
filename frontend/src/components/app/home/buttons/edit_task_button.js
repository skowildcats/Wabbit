import React, { useState } from 'react'
import { connect } from 'react-redux'
import { updateTask } from '../../../../actions/task_actions'
import CreateTaskMenu from '../../header/create_task/create_task_menu_container'
export const EditTaskButton = (props) => {
  const [open, setOpen] = useState(false);
  return (
    <>
      <div>
        <img onClick={() => setOpen(true)} src={process.env.PUBLIC_URL + "/edit-icon.svg"} alt="Edit" />
      </div>
      <CreateTaskMenu task={props.task} menuText={props.task.type.toUpperCase()} action="edit" open={open} closeMenu={() => setOpen(false)}/>
    </>
  )
}

const mapStateToProps = (state) => ({
  
})

const mapDispatchToProps = dispatch => ({
  updateTask: (task) => dispatch(updateTask(task))
})

export default connect(mapStateToProps, mapDispatchToProps)(EditTaskButton)
