import { connect } from 'react-redux';
import { fetchTasks, updateTask} from '../../../actions/task_actions';
import { fetchHabits } from '../../../actions/habit_actions';
import HomePage from './home_page';

const mapStateToProps = (state) => ({
  tasks: Object.values(state.entities.tasks),
  habits: Object.values(state.entities.habits),
  userId: state.session.user.id,
  user: state.session.user
});

const mapDispatchToProps = dispatch => ({
  fetchTasks: userId => dispatch(fetchTasks(userId)),
  fetchHabits: userId => dispatch(fetchHabits(userId)),
  updateTask: task => dispatch(updateTask(task)),
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(HomePage);