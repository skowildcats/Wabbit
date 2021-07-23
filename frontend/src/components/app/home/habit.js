import React from 'react';
import MarkCompletedButton from './buttons/mark_completed_button'
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
          <div>
            Three dots here
          </div>
        </div>
        <div id="todo-title">{habit.title}</div>
        <div id="complete-delete">
          <MarkCompletedButton task={habit}/>
          <DeleteTaskButton taskId={habit._id}/>
        </div>
      </div>
    );
  }
}

export default Habit;