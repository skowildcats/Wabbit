import { RECEIVE_HABITS, RECEIVE_HABIT, REMOVE_HABIT } from "../actions/habit_actions";

export default (state = {}, action) => {
  Object.freeze(state)
  const mergedState = Object.assign({}, state)
  switch(action.type){
    case RECEIVE_HABITS:
      let newState = {}
      action.habits.forEach(h => newState[h._id] = h)
      return newState;
    case RECEIVE_HABIT:
      mergedState[action.habit._id] = action.habit;
      return mergedState
    case REMOVE_HABIT:
      delete mergedState[action.habitId]
      return mergedState;
    default:
      return state
  }
}