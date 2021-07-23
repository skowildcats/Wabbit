import React from 'react';
import MarkCompletedButton from './buttons/mark_completed_button'
import DeleteTaskButton from './buttons/delete_task_button'
import UpdateHabitMenu from '../menus/update_habit_menu';
class Task extends React.Component {
  constructor(props) {
    super(props)
  }

  render() {
    const {task} = this.props

    return (
      <div>
        <div className="drag-handle">
          <div>
            Three dots here
          </div>
        </div>

        <div className="body-wrapper">
          <p id="todo-title">{task.title}</p>
          <p>{task.description}</p>
        </div>

          <div>
            <MarkCompletedButton task={task}/>
            <DeleteTaskButton taskId={task._id}/>
          </div>
      </div>
    );
  }
}

export default Task;