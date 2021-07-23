import React from 'react';
import MarkCompletedButton from './buttons/mark_completed_button'
import DeleteTaskButton from './buttons/delete_task_button'
import UpdateHabitMenu from '../menus/update_habit_menu';
import MyStopwatch from './stop_watch';

class Task extends React.Component {
  constructor(props) {
    super(props)
  }

  render() {
    const {task} = this.props

    return (
      <div>
        <div className="drag-handle">
          <i className="fas fa-ellipsis-h"></i>
        </div>

        <div className="body-wrapper">
          <p id="todo-title">{task.title}</p>
          <p>{task.description}</p>
        </div>
        <MyStopwatch />
        <div id="complete-delete">
          <MarkCompletedButton task={task}/>
          <DeleteTaskButton taskId={task._id}/>
        </div>
      </div>
    );
  }
}

export default Task;