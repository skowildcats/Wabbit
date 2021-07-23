import React from 'react';
import Task from './task'
import Habit from './habit';
import Countdown from './countdown';
import Progression from './progression'
import TimedGoal from './timed_goal';
import CreateTaskMenuContainer from '../header/create_task/create_task_menu_container';
import OpenMenuButton from './buttons/create_task_button';
import Loader from './loader';
import moment from 'moment'

class HomePage extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      loading: true,
      menuOpen: false,
      actionType: null,
      menuText: ''
    }
    this.setMenuOpen.bind(this);
  }

  //sets menu open with actionType corresponding to whether its making a task or a habit
  setMenuOpen(val, type, text){
    this.setState({
      menuOpen: val,
      actionType: type,
      menuText: text
    })
  }

  componentDidMount() {
    //wait until all fetching is complete before setting loading to false
    setTimeout(() => {
    Promise.allSettled([this.props.fetchTasks(this.props.userId), this.props.fetchHabits(this.props.userId)])
    .then(data => {
      //hold data in this object for debugging purposes
      this.setState({
        loading: false
      })
    })}, 1500)
  }

  componentDidUpdate() {
    window.$(".sortable").sortable({
      items: "> div:not(.menu-btn-container)",
      handle: ".drag-handle > i",
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
    if (this.state.loading) return <div id="loading"><Loader /></div>;

    //unecessary
    // const {todos} = this.props 
    // let habits = [], tasks = []

    const tasks = this.props.tasks.map(task => {
      switch(task.type){
        case 'progress':
          return <Progression task={task} key={task._id} />
        case 'countdown':
          if(moment(task.dueDate) < moment()) return null;
          return <Countdown task={task} key={task._id} />
        case 'task':
          return <Task task={task} key={task._id} />
        case 'timedGoal':
          return <TimedGoal task={task} key={task._id} />
        default: 
        return null;
      }
    })
    return (
      <>
        <div id="home-page">
          <ul id="button-list">
            <OpenMenuButton openMenu={() => this.setMenuOpen(true, "task", "TASK")} text={"NEW TASK"}/>
            <OpenMenuButton openMenu={() => this.setMenuOpen(true, "countdown", "COUNTDOWN")} text={"NEW COUNTDOWN"}/>
            <OpenMenuButton openMenu={() => this.setMenuOpen(true, "timedGoal", "TIMER")} text={"NEW TIMER"}/>
            <OpenMenuButton openMenu={() => this.setMenuOpen(true, "progress", "TRACKER")} text={"NEW TRACKER"}/>
          </ul>
          <ul id="habits" className="sortable">
            {this.props.habits.map(habit => {
              return <Habit habit={habit} key={habit._id} />
            })}
          </ul>
          <ul id="tasks" className="sortable">
            {tasks}
          </ul>
        </div>
        <CreateTaskMenuContainer menuText={this.state.menuText} actionType={this.state.actionType} open={this.state.menuOpen} closeMenu={() => this.setMenuOpen(false)}/>
      </>
    );
  }
}

export default HomePage;