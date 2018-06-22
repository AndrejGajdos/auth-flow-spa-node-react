import { put, takeLatest } from 'redux-saga/effects';
import * as ActionTypes from 'constants/actionTypes';

function* toggleModal(action) {
  const { newState } = action;
  if (!newState) {
    // if login modal is closed, reset error
    yield put({ type: ActionTypes.LOGIN_FAILED, error: null });
  }
  yield put({ type: ActionTypes.TOGGLE_MODAL_SUCCEEDED, newState });
}

export default function* watchToggleModal() {
  yield takeLatest(ActionTypes.TOGGLE_MODAL_REQUESTED, toggleModal);
}
