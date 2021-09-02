import { connect } from "react-redux";
import UserSettings from "./user_settings";
import { logout, patchUser, updateTheme } from "../../actions/session_actions";
import { withRouter } from "react-router-dom";

const mSTP = state => ({
  currentUser: state.session.user
});

const mDTP = dispatch => ({
  logout: () => dispatch(logout()),
  patchUser: userData => dispatch(patchUser(userData)),
  changeTheme: userData => dispatch(updateTheme(userData))
});

const UsersSettingContainer = withRouter(connect(mSTP, mDTP)(UserSettings));
export default UsersSettingContainer;