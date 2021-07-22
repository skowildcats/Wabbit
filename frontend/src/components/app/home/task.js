import React from 'react';
import MarkCompletedButton from './buttons/mark_completed_button'
import DeleteTaskButton from './buttons/delete_task_button'
class Task extends React.Component {
  constructor(props) {
    super(props)
  }

  render() {
    const {task} = this.props

    return (
      <div>
        <div className="drag-handle">drag handle</div>
        <div>{task.title}</div>
        <MarkCompletedButton task={task}/>
        <DeleteTaskButton taskId={task._id}/>
      </div>
    );
  }
}

export default Task;