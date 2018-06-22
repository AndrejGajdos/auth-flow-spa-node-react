import * as ActionTypes from '../constants/actionTypes';

export default function toggleModal(state = { login: false }, action) {
  switch (action.type) {
    case ActionTypes.TOGGLE_MODAL_SUCCEEDED:
      return { login: action.newState };
    default:
      return state;
  }
}
