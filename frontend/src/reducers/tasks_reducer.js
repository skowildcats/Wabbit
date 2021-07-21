import { RECEIVE_USER_TASKS, RECEIVE_TASK, REMOVE_TASK } from "../actions/task_actions";
export default function(state = {}, action){
  Object.freeze(state)
  const newState = Object.assign({}, state)
  switch(action.type){
    case RECEIVE_USER_TASKS:
      action.tasks.forEach(task => state[task._id] = task);
      return state
    case RECEIVE_TASK:
      newState[action.task._id] = action.task
      return newState;
    case REMOVE_TASK:
      delete newState[action.taskId]
      return newState;
    default:
      return state
  }
}