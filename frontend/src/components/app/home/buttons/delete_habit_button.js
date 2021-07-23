
import React from 'react'
import { connect } from 'react-redux'
import { deleteHabit } from '../../../../actions/habit_actions'
export const DeleteHabitButton = (props) => {
  return (
    <button onClick={() => props.deleteHabit(props.habitId)}>&times;</button>
  )
}

const mapDispatchToProps = dispatch => ({
  deleteHabit: (habitId) => dispatch(deleteHabit(habitId))
})

export default connect(null, mapDispatchToProps)(DeleteHabitButton)
