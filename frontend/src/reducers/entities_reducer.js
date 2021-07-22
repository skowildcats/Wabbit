import { combineReducers } from "redux";
import tasksReducer from "./tasks_reducer";
import habitsReducer from "./habits_reducer";

const entitiesReducer = combineReducers({
  tasks: tasksReducer,
  habits: habitsReducer,
});

export default entitiesReducer