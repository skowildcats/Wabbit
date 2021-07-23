import React from 'react'
import { connect } from 'react-redux'
import { updateTask } from '../../../../actions/task_actions'

export const IncrementButton = (props) => {
  //pass in task as a prop
  //pass in type to tell it whether to increment or decrement
  function update(increment = 1){
    increment = (props.type === 'increment' ? 1 : -1)
    let updated = props.task
    updated.currentProgress += increment;
    props.updateTask(updated).then(el => {
      console.log(el)
    })
  }
  return (
    <button onClick={update}>{props.type === "increment" ? "+" : "-" }</button>
  )
}

const mapDispatchToProps = dispatch => ({
  updateTask: (task) => dispatch(updateTask(task))
})

export default connect(null, mapDispatchToProps)(IncrementButton)