import { RECEIVE_METRICS } from "../actions/metrics_actions";

export default (state = {}, action) => {
  Object.freeze(state)
  // const newState = Object.assign({}, state); not necessary as of yet
  switch(action.type){
    case RECEIVE_METRICS:
      return action.metrics.data  //axios holds relevant response data in a data property
    default:
      return state
  }
}