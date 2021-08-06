import React from 'react'
export default (props) => {
  return (
    <div className="edit-task-btn">
      <img onClick={() => props.setMenuOpen(true, "task", "TASK", "edit", props.task)} src={process.env.PUBLIC_URL + "/edit-icon.svg"} alt="Edit" />
    </div>
  )
}
