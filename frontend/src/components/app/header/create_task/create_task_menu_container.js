import { connect } from 'react-redux'
import { fetchImages } from '../../../../actions/file_actions'
import { createTask, updateTask, clearTaskError } from '../../../../actions/task_actions'
import { createHabit } from '../../../../actions/habit_actions'

import CreateTaskMenu from './create_task_menu'

const mapStateToProps = (state) => ({
  userId: state.session.user.id,
  images: state.files, 
  errors: state.errors.session
})

const mapDispatchToProps = dispatch => ({
  createTask: task => dispatch(createTask(task)),
  fetchImages: () => dispatch(fetchImages()),
  createHabit: habit => dispatch(createHabit(habit)),
  updateTask: task => dispatch(updateTask(task)),
  clearError: () => dispatch(clearTaskError)
})

export default connect(mapStateToProps, mapDispatchToProps)(CreateTaskMenu)
