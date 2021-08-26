import React from 'react'

export default function CreateTaskButton(props) {
  return (
    <button className="open-menu" onClick={props.openMenu}>
      <img src={`${process.env.PUBLIC_URL}/${props.icon}.png`} alt={props.icon}/>
    </button>
  )
}
