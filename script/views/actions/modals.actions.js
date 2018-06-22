import * as ActionTypes from 'constants/actionTypes';

const toggleLogin = newState => ({
  type: ActionTypes.TOGGLE_MODAL_REQUESTED,
  newState,
});

export default toggleLogin;
