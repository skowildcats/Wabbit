import { RECEIVE_CURRENT_USER, 
         RECEIVE_THEME, 
         RECEIVE_USER_LOGOUT } from '../actions/session_actions';

const initialState = {
  isAuthenticated: false,
  user: {}
};

export default function(state = initialState, action) {
  Object.freeze(state);
  
  switch (action.type) {
    case RECEIVE_CURRENT_USER:
      return {
        isAuthenticated: !!action.currentUser,
        user: Object.assign({}, state.user, action.currentUser.data ? action.currentUser.data : action.currentUser)
      };
    case RECEIVE_USER_LOGOUT:
      return {
        isAuthenticated: false,
        user: undefined
      };
    case RECEIVE_THEME:
      let user = Object.assign({}, state.user, action.currentUser.data ? action.currentUser.data : action.currentUser)
      user.theme = action.theme
      return {
        isAuthenticated: !!action.currentUser,
        user
      }
    default:
      return state;
  }
}