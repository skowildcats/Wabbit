import { connect } from "react-redux";
import UsersSettings from "./users_settings";
import { patchUser } from "../../actions/session_actions";

const mDTP = dispatch => ({
  patchUser: userData => dispatch(patchUser(userData))
});

const UsersSettingsContainer = connect(null, mDTP)(UsersSettings);
export default UsersSettingsContainer;