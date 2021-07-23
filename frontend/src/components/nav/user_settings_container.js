import { connect } from "react-redux";
import UserSettings from "./user_settings";
import { logout, patchUser } from "../../actions/session_actions";
import { withRouter } from "react-router-dom";

const mSTP = state => ({
  currentUser: state.session.user
});

const mDTP = dispatch => ({
  logout: () => dispatch(logout()),
  patchUser: userData => dispatch(patchUser(userData))
});

const UsersSettingContainer = withRouter(connect(mSTP, mDTP)(UserSettings));
export default UsersSettingContainer;