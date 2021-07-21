import React from 'react';

class Task extends React.Component {
  constructor(props) {
    super(props)
  }

  render() {
    const {task} = this.props

    return (
      <div>
        <div className="sort-handle">sort handle</div>
        <div>{task.title}</div>
      </div>
    );
  }
}

export default Task;