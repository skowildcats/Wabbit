import { connect } from 'react-redux';
import { fetchTasks } from '../../../actions/task_actions';

import HomePage from './home_page';

const mapStateToProps = (state) => ({
  todos: Object.values(state.entities.tasks),
  userId: state.session.user.id
});

const mapDispatchToProps = dispatch => ({
  fetchTasks: userId => dispatch(fetchTasks(userId)),
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(HomePage);