import React from 'react'
import { connect } from 'react-redux'
import { updateTask } from '../../../../actions/task_actions'

export const IncrementButton = (props) => {
  //pass in task as a prop
  //pass in type to tell it whether to increment or decrement
  function update(increment = 1){
    increment = (props.type === 'increment' ? props.task.increment : -props.task.increment)
    let updated = props.task
    if(updated.currentProgress + increment <= 0){
      updated.currentProgress = 0;
    } else{
      updated.currentProgress += increment;
    }
    if(updated.currentProgress >= updated.maxProgress){
      updated.completed = true;
    }
    props.updateTask(updated)
  }
  return (
    <button onClick={update}>{props.type === "increment" ? "+" : "–" }</button>
  )
}

const mapDispatchToProps = dispatch => ({
  updateTask: (task) => dispatch(updateTask(task))
})

export default connect(null, mapDispatchToProps)(IncrementButton)