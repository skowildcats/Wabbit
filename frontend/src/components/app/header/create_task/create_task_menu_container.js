import { connect } from 'react-redux'
import { createTask, updateTask, clearTaskError } from '../../../../actions/task_actions'
import { createHabit } from '../../../../actions/habit_actions'
import CreateTaskMenu from './create_task_menu'

const mapStateToProps = (state) => ({
  user: state.session.user,
  errors: state.errors.session
})

const mapDispatchToProps = dispatch => ({
  createTask: task => dispatch(createTask(task)),
  createHabit: habit => dispatch(createHabit(habit)),
  updateTask: task => dispatch(updateTask(task)),
  clearError: () => dispatch(clearTaskError)
})

export default connect(mapStateToProps, mapDispatchToProps)(CreateTaskMenu)
