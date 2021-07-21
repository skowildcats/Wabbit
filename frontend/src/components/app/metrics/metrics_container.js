import { connect } from 'react-redux';
import { fetchMetrics } from '../../../actions/metrics_actions';
import Metrics from './metrics';

const mSTP = state => ({
  userId: state.session.user.id
})

const mDTP = (dispatch, ownProps) => ({
  fetchMetrics: (userId = ownProps.userId) => dispatch(fetchMetrics(userId))
})

export default connect(mSTP, mDTP)(Metrics)