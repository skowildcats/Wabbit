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
import Walkthrough from './walkthrough/walkthrough';
import {updateTaskOrder} from '../../../util/tasks_util';
import {updateHabitOrder} from '../../../util/habit_util'

class HomePage extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      loading: true,
      menuOpen: false,
      actionType: null,
      menuText: '',
      walkthroughOpen: !this.props.user.walkthrough,
    }
    this.setMenuOpen = this.setMenuOpen.bind(this);
    this.setWalkthrough = this.setWalkthrough.bind(this)
  }

  //sets menu open with actionType corresponding to whether its making a task or a habit
  setMenuOpen(val, type, text){
    this.setState({
      menuOpen: val,
      actionType: type,
      menuText: text
    })
  }

  setWalkthrough(val){
    this.setState({
      walkthroughOpen: val
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
    window.$(".sortable-habit").sortable({
      items: "> div:not(.menu-btn-container)",
      handle: ".drag-handle > i",
      helper: "clone",
      opacity: 0.7,
      revert: 200,
      delay: 50,
      tolerance: "pointer",
      containment: "parent",
      update: function(e, ui) {
        let data = window.$(this).sortable('toArray')
        console.log(data)
        updateHabitOrder({"habits": data}) 
      }
    })
    window.$(".sortable-task").sortable({
      items: "> div:not(.menu-btn-container)",
      handle: ".drag-handle > i",
      helper: "clone",
      opacity: 0.7,
      revert: 200,
      delay: 50,
      tolerance: "pointer",
      containment: "parent",
      update: function(e, ui) {
        let data = window.$(this).sortable('toArray')
        updateTaskOrder({"tasks": data})
      }
    })
    // window.$( "#sortable" ).disableSelection();
  }

  componentWillUnmount() {
    window.$(".sortable-task").sortable("destroy")
    window.$(".sortable-habit").sortable("destroy")
  }

  _toggle(task){
    return ()=>{
      task.paused = !task.paused
      this.props.updateTask(task)
    }
  }

  sort_object(obj) {
    let items = Object.keys(obj).map(function(key) {
      return [key, obj[key]];
    });
    items.sort(function(first, second) {
      return first[1].index - second[1].index;
    });
    console.log(items)
    let arr = []
    items.forEach(el => {
      arr.push(el[1])
    })
    return arr
  } 

  render() {
    if (this.state.loading) return <div id="loading"><Loader /></div>;

    const tasks = this.sort_object(this.props.tasks).map(task => {
      switch(task.type){
        case 'progress':
          return <Progression task={task} key={task._id} id={task._id}/>
        case 'countdown':
          if(moment(task.dueDate) < moment()) return null;
          return <Countdown task={task} key={task._id} id={task._id}/>
        case 'task':
          return <Task task={task} key={task._id} id={task._id}/>
        case 'timedGoal':
          return <TimedGoal task={task} key={task._id} id={task._id}/>
        default: 
        return null;
      }
    })

    return (
      <>
        { !this.props.user.walkthrough ? <Walkthrough setWalkthrough={this.setWalkthrough} open={true}/> : null}
        <div id="home-page">
          <ul id="button-list">
            <OpenMenuButton openMenu={() => this.setMenuOpen(true, "task", "TASK")} text={"NEW TASK"}/>
            <OpenMenuButton openMenu={() => this.setMenuOpen(true, "countdown", "COUNTDOWN")} text={"NEW COUNTDOWN"}/>
            <OpenMenuButton openMenu={() => this.setMenuOpen(true, "timedGoal", "TIMER")} text={"NEW TIMER"}/>
            <OpenMenuButton openMenu={() => this.setMenuOpen(true, "progress", "TRACKER")} text={"NEW TRACKER"}/>
          </ul>
          <ul id="habits" className="sortable-habit">
            {this.sort_object(this.props.habits).map(habit => {
              return <Habit habit={habit} key={habit._id} id={habit._id}/>
            })}
          </ul>
          <ul id="tasks" className="sortable-task">
            {tasks}
          </ul>
        </div>
        <CreateTaskMenuContainer menuText={this.state.menuText} actionType={this.state.actionType} open={this.state.menuOpen} closeMenu={() => this.setMenuOpen(false)}/>
      </>
    );
  }
}

export default HomePage;