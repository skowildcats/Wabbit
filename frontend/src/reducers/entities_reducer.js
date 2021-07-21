import { combineReducers } from "redux";
import taskReducer from "./tasks_reducer";
import metricsReducer from './metrics_reducer'

const entitiesReducer = combineReducers({
  tasks: taskReducer,
  metrics: metricsReducer
});

export default entitiesReducer