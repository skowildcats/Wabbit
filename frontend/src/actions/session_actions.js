import * as APIUtil from '../util/session_api_util';
import jwt_decode from 'jwt-decode';

export const RECEIVE_CURRENT_USER = "RECEIVE_CURRENT_USER";
export const RECEIVE_SESSION_ERRORS = "RECEIVE_SESSION_ERRORS";
export const RECEIVE_USER_LOGOUT = "RECEIVE_USER_LOGOUT";
export const CLEAR_ERROR = "CLEAR_ERROR"
export const RECEIVE_THEME = 'RECEIVE_THEME'
export const UPDATE_PASSWORD = 'UPDATE_PASSWORD'

// We'll dispatch this when our user signs in
export const receiveCurrentUser = currentUser => ({
    type: RECEIVE_CURRENT_USER,
    currentUser
});
  
// We dispatch this one to show authentication errors on the frontend
export const receiveErrors = errors => ({
    type: RECEIVE_SESSION_ERRORS,
    errors
});

export const receiveTheme = theme => ({
  type: RECEIVE_THEME,
  theme
})

// When our user is logged out, we will dispatch this action to set isAuthenticated to false
export const logoutUser = () => ({
    type: RECEIVE_USER_LOGOUT
});



const processData = data => {
  const { token } = data;
  localStorage.setItem("jwtToken", token);
  APIUtil.setAuthToken(token);
  const decoded = jwt_decode(token);
  const { email, firstName, lastName } = data;
  return { email, firstName, lastName, ...decoded };
}

export const updatePassword = (userData) => dispatch => (
  APIUtil.updatePassword(userData).then(() => "success")
  .catch((err) => dispatch(receiveErrors(err.response.data)))
)

// Upon signup, dispatch the approporiate action depending on which type of response we receieve from the backend
export const signup = (user) => (dispatch) => (
  APIUtil.signup(user)
    .then(({ data }) => dispatch(receiveCurrentUser(processData(data))))
    .catch((err) => dispatch(receiveErrors(err.response.data)))
);

// Upon login, set the session token and dispatch the current user. Dispatch errors on failure.
export const login = (user) => (dispatch) => (
  APIUtil.login(user)
    .then(({ data }) => dispatch(receiveCurrentUser(processData(data))))
    .catch((err) => dispatch(receiveErrors(err.response.data)))
);

// We wrote this one earlier
export const logout = () => dispatch => {
    localStorage.removeItem('jwtToken')
    APIUtil.setAuthToken(false)
    dispatch(logoutUser())
};

export const getCurrentUser = currentUserId => dispatch => (
  APIUtil.getCurrentUser(currentUserId)
    .then((currentUser) => dispatch(receiveCurrentUser(currentUser.data)))
);

export const patchUser = userData => dispatch => (
  APIUtil.patchUser(userData)
    .then(updatedUser => {
      alert('Saved')
      dispatch(receiveCurrentUser(updatedUser))
    })
    .catch(err=>{
      alert('Incorrect Password')
    })
);

export const updateTheme = userData => dispatch => (
  APIUtil.changeTheme(userData)
    .then(newTheme => dispatch(receiveTheme(newTheme)))
);