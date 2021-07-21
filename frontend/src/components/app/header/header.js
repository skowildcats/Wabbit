import React, { useState } from 'react'
import CreateTaskButton from './create_task/create_task_button'
import CreateTaskMenuContainer from './create_task/create_task_menu_container'

export default function Header(props){
  const [menuOpen, setMenuOpen] = useState(false)
  return(
    <>
      <div className="app-header">
          <CreateTaskButton openMenu={() => setMenuOpen(true)} />
      </div>
      <CreateTaskMenuContainer closeMenu={() => setMenuOpen(false)} open={menuOpen}/>
    </>
  )
}
