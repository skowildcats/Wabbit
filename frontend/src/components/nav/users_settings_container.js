import { connect } from "react-redux";
import UsersSettings from "./users_settings";
import { patchUser, getCurrentUser } from "../../actions/session_actions";

const mSTP = state => ({
  currentUser: state.session.user
});

const mDTP = dispatch => ({
  getCurrentUser: currentUserId => getCurrentUser(currentUserId),
  patchUser: userData => patchUser(userData)
});

const UsersSettingsContainer = connect(mSTP, mDTP)(UsersSettings);
export default UsersSettingsContainer;