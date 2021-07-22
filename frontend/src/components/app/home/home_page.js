import React from 'react';
import Task from './task'
import HeaderContainer from '../header/header'
import Habit from './habit';


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
      items: "> div:not(.app-header)",
      handle: ".drag-handle",
      helper: "clone",
      opacity: 0.7,
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

    if (this.state.loading) {
      return null
    } else {
      const {todos} = this.props
      let habits = [], tasks = []

      todos.map(todo => {
        todo.recurrence !== "Never" ? habits.push(todo) : tasks.push(todo)
      })
      return (
        <>
          <div id="home-page">
            <ul id="habits" className="sortable">
              <HeaderContainer/> 
              {habits.map(habit => {
                return <Habit habit={habit} key={habit._id} />
              })}
            </ul>
            <ul id="tasks" className="sortable">
              {/* <HeaderContainer/>  */}
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