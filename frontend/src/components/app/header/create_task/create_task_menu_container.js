import { connect } from 'react-redux'
<<<<<<< HEAD
import { createTask, updateTask,clearTaskError } from '../../../../actions/task_actions'
=======
import { createTask, updateTask, clearTaskError } from '../../../../actions/task_actions'
>>>>>>> e4bff4f53f646ef17d5c64d6969558df9b7b1469
import { createHabit } from '../../../../actions/habit_actions'

import CreateTaskMenu from './create_task_menu'

const mapStateToProps = (state) => ({
  userId: state.session.user.id,
  errors: state.errors.session
})

const mapDispatchToProps = dispatch => ({
  createTask: task => dispatch(createTask(task)),
  createHabit: habit => dispatch(createHabit(habit)),
  updateTask: task => dispatch(updateTask(task)),
  clearError: () => dispatch(clearTaskError)
})

export default connect(mapStateToProps, mapDispatchToProps)(CreateTaskMenu)
