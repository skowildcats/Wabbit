import { connect } from 'react-redux';
import { fetchTasks } from '../../../actions/task_actions';
import { fetchHabits } from '../../../actions/habit_actions';
import HomePage from './home_page';

const mapStateToProps = (state) => ({
  todos: Object.values(state.entities.tasks),
  habits: Object.values(state.entities.habits),
  userId: state.session.user.id
});

const mapDispatchToProps = dispatch => ({
  fetchTasks: userId => dispatch(fetchTasks(userId)),
  fetchHabits: userId => dispatch(fetchHabits(userId))
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(HomePage);