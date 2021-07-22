import React from 'react';
import Task from './task'
import Habit from './habit';
import CreateTaskMenuContainer from '../header/create_task/create_task_menu_container';
import OpenMenuButton from './buttons/create_task_button';
class HomePage extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      loading: true,
      menuOpen: false,
      actionType: null
    }
    this.setMenuOpen.bind(this);
  }

  //sets menu open with actionType corresponding to whether its making a task or a habit
  setMenuOpen(val, type){
    this.setState({
      menuOpen: val,
      actionType: type
    })
  }

  componentDidMount() {
    //wait until all fetching is complete before setting loading to false
    Promise.allSettled([this.props.fetchTasks(this.props.userId), this.props.fetchHabits(this.props.userId)])
    .then(data => {
      //hold data in this object for debugging purposes
      this.setState({
        loading: false
      })
    })
  }

  componentDidUpdate() {
    window.$(".sortable").sortable({
      items: "> div:not(.menu-btn-container)",
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
              <div className="menu-btn-container">
                <OpenMenuButton openMenu={() => this.setMenuOpen(true, "HABIT")}/>
              </div>
              {habits.map(habit => {
                return <Habit habit={habit} key={habit._id} />
              })}
            </ul>
            <ul id="tasks" className="sortable">
              <div className="menu-btn-container">
                <OpenMenuButton openMenu={() => this.setMenuOpen(true, "TASK")}/>
              </div>
              {tasks.map(task => {
                return <Task task={task} key={task._id} />
              })}
            </ul>
          </div>
          <CreateTaskMenuContainer actionType={this.state.actionType} open={this.state.menuOpen} closeMenu={() => this.setMenuOpen(false)}/>
        </>
      );
    }
  }
}

export default HomePage;