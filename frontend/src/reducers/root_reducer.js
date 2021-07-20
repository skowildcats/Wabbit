import { combineReducers } from 'redux';
import session from './session_api_reducer';
import errors from './errors_reducer'
import files from './files_reducer'
import entities from './entities_reducer';
const RootReducer = combineReducers({
  session,
  errors,
  files,
  entities,
});

export default RootReducer;