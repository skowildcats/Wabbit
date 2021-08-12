import { RECEIVE_HABIT } from "../actions/habit_actions";
import { RECEIVE_USER_TASKS, RECEIVE_TASK, REMOVE_TASK } from "../actions/task_actions";
export default function(state = {}, action){
  const mergedState = Object.assign({}, state)
  switch(action.type){
    case RECEIVE_USER_TASKS:
      let newState = {}
      //need to get _id pointing to the task in state
      action.tasks.forEach(task => newState[task._id] = task);
      return newState
    case RECEIVE_TASK:
      mergedState[action.task._id] = action.task
      return mergedState;
    case RECEIVE_HABIT:
      if(action.habit.task){
        const task = action.habit.task
        mergedState[task._id] = task
      }
      return mergedState
    case REMOVE_TASK:
      delete mergedState[action.taskId]
      return mergedState;
    default:
      return state
  }
}