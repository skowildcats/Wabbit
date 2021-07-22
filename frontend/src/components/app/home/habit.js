import React from 'react';
import MarkCompletedButton from './buttons/mark_completed_button'
import DeleteTaskButton from './buttons/delete_task_button'

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
        <div>{habit.title}</div>
        <MarkCompletedButton task={habit}/>
        <DeleteTaskButton taskId={habit._id}/>
      </div>
    );
  }
}

export default Habit;