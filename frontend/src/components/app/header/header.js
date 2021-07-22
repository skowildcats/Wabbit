import React, { useState } from 'react'
import CreateTaskButton from './create_task/create_task_button'
import CreateTaskMenuContainer from './create_task/create_task_menu_container'

export default function Header(props){
  const [menuOpen, setMenuOpen] = useState(false)
  function openMenu(){
    setMenuOpen(true);
  }
  return(
    <>
      <div className="app-header">
          <CreateTaskButton openMenu={openMenu} />
      </div>
      <CreateTaskMenuContainer closeMenu={() => setMenuOpen(false)} open={menuOpen}/>
    </>
  )
}
