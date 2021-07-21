import React from 'react';
import Task from './task'
import HeaderContainer from '../header/header'
class HomePage extends React.Component {
  constructor(props) {
    super(props)
    this.state = {loading: true}
  }

  componentDidMount() {
    this.props.fetchTasks(this.props.userId).then(() => this.setState({loading: false}))
  }

  componentDidUpdate() {
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

  componentWillUnmount() {
    window.$(".sortable").sortable("destroy")
  }

  render() {
    const {tasks} = this.props

    if (this.state.loading) {
      return null
    } else {
      return (
        <>
          <HeaderContainer/>
          <div id="home-page">
            <ul id="habits">Habits
              {/* <button id="add-habit">Add habit</button> */}
            </ul>
            <ul id="tasks" className="sortable">
              {/* <button id="add-task">Add task</button> */}
              {tasks.map(task => {
                return <Task task={task} key={task._id} />
              })}
            </ul>
          </div>
        </>
      );
    }
  }
}

export default HomePage;