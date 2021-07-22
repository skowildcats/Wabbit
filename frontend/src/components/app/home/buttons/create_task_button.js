import React from 'react'

export default function CreateTaskButton(props) {
  return (
    <button className="open-menu" onClick={props.openMenu}>{props.text}</button>
  )
}
