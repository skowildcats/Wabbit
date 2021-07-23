import React from 'react';
import ToggleCompletedButton from './buttons/toggle_completed_button'
import DeleteTaskButton from './buttons/delete_task_button'
import MyStopwatch from './stop_watch';

class Habit extends React.Component {
  constructor(props) {
    super(props)
  }

  render() {
    const {habit} = this.props

    return (
      <div>
        <div className="drag-handle">
          <i className="fas fa-ellipsis-h"></i>
        </div>
        <div id="todo-title">{habit.title}</div>
        <div id="complete-delete">
          {/* <ToggleCompletedButton task={habit}/> */}
          {/* <DeleteTaskButton taskId={habit._id}/> */}
        </div>
      </div>
    );
  }
}

export default Habit;