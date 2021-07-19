import { RECEIVE_IMAGES } from "../actions/file_actions";

export default function(state = {}, action) {
  switch (action.type) {
    case RECEIVE_IMAGES:
        return action.imgs     
    default:
      return state;
  }
}