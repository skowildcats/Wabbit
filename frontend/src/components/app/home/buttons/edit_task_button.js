import React from 'react'
export default (props) => {
  return (
    <img className="edit-task-btn" onClick={() => {props.setMenuOpen(true, "edit", props.task);}} src={process.env.PUBLIC_URL + "/edit-icon.svg"} alt="Edit" />
  )
}
