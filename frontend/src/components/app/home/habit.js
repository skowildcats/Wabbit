import React from 'react';
import DeleteHabitButton from './buttons/delete_habit_button';

export default class Habit extends React.Component {
  constructor(props) {
    super(props)
  }

  repeatingDays() {
    const {recurrence, daysOfMonth} = this.props.habit;
    const habitDays = this.props.habit.daysOfTheWeek;
    if (recurrence === "Daily") return "day";
    if (recurrence === "Monthly") return ""; // need to revisit
    if (habitDays === "MTWTF__") return "weekday";
    if (habitDays === "_____SS") return "weekend";

    const days = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"];
    const repeatingDays = [];
    for (let i in habitDays.split("")) {
      if (habitDays[i] !== "_") repeatingDays.push(days[i]);
    }
    return repeatingDays.join(", ");
  }

  render() {
    const {habit, id} = this.props
    return (
      <div className="habit" style={{background: habit.color}}>
        <div className="drag-handle">
          <i className="fas fa-ellipsis-h"></i>
        </div>
        <div className="habit-info">
          <p className="habit-title">{habit.title}</p>
          <p className="habit-description">{habit.description}</p>
          <p className="habit-days">{`every ${this.repeatingDays()}`}</p>
        </div>
        <DeleteHabitButton habitId={id}/>
        <img className="habit-icon" src={`${process.env.PUBLIC_URL}/icons/${habit.icon}.png`} alt="home-btn" />
      </div>
    );
  }
};