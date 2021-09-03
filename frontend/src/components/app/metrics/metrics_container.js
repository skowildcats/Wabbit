import { connect } from 'react-redux';
import { fetchMetrics } from '../../../actions/metrics_actions';
import { fetchHabits } from '../../../actions/habit_actions';
import { fetchTasks } from '../../../actions/task_actions';
import Metrics from './metrics';
import { getCurrentUser } from '../../../actions/session_actions';

const mSTP = state => ({
  userId: state.session.user.id,
  metrics: state.metrics,
  tasks: state.entities.tasks,
  habits: Object.values(state.entities.habits),
  colors: state.session.user.theme
})

const mDTP = (dispatch, ownProps) => ({
  fetchMetrics: (userId = ownProps.userId) => dispatch(fetchMetrics(userId)),
  fetchUser: (userId = ownProps.userId) => dispatch(getCurrentUser(userId)),
  fetchHabits: (userId) => dispatch(fetchHabits(userId)),
  fetchTasks: (userId) => dispatch(fetchTasks(userId))
})

export default connect(mSTP, mDTP)(Metrics)