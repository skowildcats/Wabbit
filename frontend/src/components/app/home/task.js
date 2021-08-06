import React from 'react';
import ToggleCompletedButton from './buttons/toggle_completed_button'
import DeleteTaskButton from './buttons/delete_task_button'
import EditTaskButton from './buttons/edit_task_button'

export default function Task(props){
  const {task} = props

  return (
    <div className="task">
      <div className="drag-handle">
        <i className="fas fa-ellipsis-h"></i>
      </div>
      <div className="body-wrapper">
        <p className="todo-title">{task.title}</p>
        <p className="todo-description">{task.description}</p>
      </div>
      <div id="complete-delete">
        <ToggleCompletedButton task={task} />
        <DeleteTaskButton taskId={task._id} />
        <EditTaskButton setMenuOpen={props.setMenuOpen} task={task}/>
      </div>
    </div>
  );
}
