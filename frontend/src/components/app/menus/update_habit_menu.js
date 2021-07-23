import React from 'react'
import ReactDOM from 'react-dom'

export default function UpdateHabitMenu(props) {
  return ReactDOM.createPortal(
    <>
      <div className="overlay"></div>
      <div className="update-habit">
        
      </div>
    </>, document.getElementById('portal')
  )
}
