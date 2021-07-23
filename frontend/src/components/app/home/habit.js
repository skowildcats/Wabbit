import React from 'react';
import DeleteHabitButton from './buttons/delete_habit_button';
import ToggleCompletedButton from './buttons/toggle_completed_button'

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
        <div className="todo-title">{habit.title}</div>
        <div id="complete-delete">
          {/* <ToggleCompletedButton task={habit}/> */}
          <DeleteHabitButton habitId={habit._id}/>
        </div>
      </div>
    );
  }
}

export default Habit;