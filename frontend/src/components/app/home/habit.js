import React from 'react';
import DeleteHabitButton from './buttons/delete_habit_button';

export default class Habit extends React.Component {
  constructor(props) {
    super(props)
  }

  render() {
    const {habit, id} = this.props
    return (
      <div className="habit" style={{background: habit.color}}>
        <div className="drag-handle">
          <i className="fas fa-ellipsis-h"></i>
        </div>
        <div className="todo-title">{habit.title}</div>
        <DeleteHabitButton habitId={id}/>
      </div>
    );
  }
};