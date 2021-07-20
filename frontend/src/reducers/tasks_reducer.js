import { RECEIVE_USER_TASKS, RECEIVE_TASK, REMOVE_TASK } from "../actions/task_actions";
export default function(state = {}, action){
  Object.freeze(state)
  const newState = Object.assign({}, state)
  switch(action.type){
    case RECEIVE_USER_TASKS:
      //need to get _id pointing to the task in state
      action.tasks.forEach(task => newState[task._id] = task);
      return newState
    case RECEIVE_TASK:
      debugger
      newState[action.task._id] = action.task
      return newState;
    case REMOVE_TASK:
      delete newState[action.taskId]
      return newState;
    default:
      return state
  }
}