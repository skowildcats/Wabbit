import { connect } from 'react-redux';
import { fetchMetrics } from '../../../actions/metrics_actions';
import { fetchHabits } from '../../../actions/habit_actions';
import { fetchTasks } from '../../../actions/task_actions';
import Metrics from './metrics';

const mSTP = state => ({
  userId: state.session.user.id,
  metrics: state.metrics,
  tasks: state.entities.tasks,
  habits: Object.values(state.entities.habits)
})

const mDTP = (dispatch, ownProps) => ({
  fetchMetrics: (userId = ownProps.userId) => dispatch(fetchMetrics(userId)),
  fetchHabits: (userId) => dispatch(fetchHabits(userId)),
  fetchTasks: (userId) => dispatch(fetchTasks(userId))
})

export default connect(mSTP, mDTP)(Metrics)