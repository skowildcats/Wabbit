import React from 'react';
// import MarkCompletedButton from './buttons/mark_completed_button'
// import DeleteTaskButton from './buttons/delete_task_button'

class Habit extends React.Component {
  constructor(props) {
    super(props)
  }

  render() {
    const {habit} = this.props

    return (
      <div>
        <div className="drag-handle">drag handle</div>
        <div>{habit.title}</div>
        {/* <MarkCompletedButton habit={habit}/>
        <DeletehabitButton habitId={habit._id}/> */}
      </div>
    );
  }
}

export default Habit;