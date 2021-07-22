import { connect } from 'react-redux';
import { logout, getCurrentUser } from '../../actions/session_actions';

import NavBar from './navbar';

const mSTP = state => ({
  loggedIn: state.session.isAuthenticated
});


const mDTP = dispatch => ({
  logout: () => dispatch(logout())
});

const NavBarContainer = connect(mSTP, mDTP)(NavBar);
export default NavBarContainer;