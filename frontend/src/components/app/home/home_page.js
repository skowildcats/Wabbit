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
import {updateHabitOrder} from '../../../util/habit_util'
import {updateTask, updateTaskOrder} from '../../../util/tasks_util';

class HomePage extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      loading: true,
      menuOpen: false,
      actionType: null,
      menuText: '',
      taskAction: 'create',
      walkthroughOpen: !this.props.user.walkthrough,
      task: null
    }
    this.setMenuOpen = this.setMenuOpen.bind(this);
    this.setWalkthrough = this.setWalkthrough.bind(this)
    this._minusOneSecond= this._minusOneSecond.bind(this)
  }

  //sets menu open with actionType corresponding to whether its making a task or a habit
  setMenuOpen(val, type, text, taskAction, task){
    this.setState({
      menuOpen: val,
      actionType: type,
      menuText: text,
      taskAction,
      task
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

  _minusOneSecond(task){
    task.secondsLeft--
    this.props.updateTask(task)
  }

  sort_object(obj) {
    let items = Object.keys(obj).map(function(key) {
      return [key, obj[key]];
    });
    items.sort(function(first, second) {
      return first[1].index - second[1].index;
    });
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
          return <Progression setMenuOpen={this.setMenuOpen} task={task} key={task._id} id={task._id}/>
        case 'countdown':
          if(moment(task.dueDate) < moment()) return null;
          return <Countdown setMenuOpen={this.setMenuOpen} task={task} key={task._id} id={task._id}/>
        case 'task':
          return <Task setMenuOpen={this.setMenuOpen} task={task} key={task._id} id={task._id}/>
        case 'timedGoal':
          return <TimedGoal setMenuOpen={this.setMenuOpen} task={task} key={task._id} id={task._id} minusOneSecond={()=>this._minusOneSecond(task)}/>
        default: 
        return null;
      }
    })
    return (
      <>
        { !this.props.user.walkthrough ? <Walkthrough setWalkthrough={this.setWalkthrough} open={true}/> : null}
        <ul id="habits" className="sortable-habit">
          <h3>HABITS</h3>
          {this.sort_object(this.props.habits).map(habit => {
            return <Habit habit={habit} key={habit._id} id={habit._id}/>
          })}
        </ul>
        <div id="home-page">
          <ul id="button-list">
            <OpenMenuButton openMenu={() => this.setMenuOpen(true)} icon={"add.png"}/>
            <OpenMenuButton openMenu={() => this.setMenuOpen(true, "task", "TASK", "create")} icon={"checked.png"}/>
            <OpenMenuButton openMenu={() => this.setMenuOpen(true, "countdown", "COUNTDOWN", "create")} icon={"calendar.png"}/>
            <OpenMenuButton openMenu={() => this.setMenuOpen(true, "timedGoal", "TIMER", "create")} icon={"stopwatch.png"}/>
            <OpenMenuButton openMenu={() => this.setMenuOpen(true, "progress", "TRACKER", "create")} icon={"tallies.png"}/>
          </ul>
          <ul id="tasks" className="sortable-task">
            {tasks}
          </ul>
        </div>
        <CreateTaskMenuContainer task={this.state.task} taskAction={this.state.taskAction} menuText={this.state.menuText} actionType={this.state.actionType} open={this.state.menuOpen} closeMenu={() => this.setMenuOpen(false)}/>
      </>
    );
  }
}

export default HomePage;