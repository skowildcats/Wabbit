import React from 'react';
import Task from './task'

class HomePage extends React.Component {
  constructor(props) {
    super(props)
    this.state = {loading: true}
  }

  componentDidMount() {
    this.props.fetchTasks(this.props.userId).then(() => this.setState({loading: false}))
  }

  componentDidUpdate() {
    if (window.$(".sortable").length > 0) {
      window.$(".sortable").sortable({
        handle: ".sort-handle",
        cursor: "move",
        helper: "clone",
        opacity: 0.5,
        revert: 200,
        delay: 50,
        tolerance: "pointer",
        containment: "parent",
      })
      window.$( "#sortable" ).disableSelection();
    } 
  }

  render() {
    const {tasks} = this.props

    if (this.state.loading) {
      return null
    } else {
      return (
        <div id="home-page">
          <ul id="tasks" className="sortable">
            {tasks.map(task => {
              return <Task task={task} key={task._id} />
            })}
          </ul>
        </div>
      );
    }
  }
}

export default HomePage;