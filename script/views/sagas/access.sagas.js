import { put, call, takeLatest } from 'redux-saga/effects';
import Cookies from 'js-cookie';
import * as ActionTypes from 'constants/actionTypes';
import { get, post } from 'utils/api';
import lGet from 'lodash/get';

function* login(action) {
  const { email, password } = action;
  try {
    const response = yield call(
      post,
      '/login',
      { email, password },
    );
    const inOneWeek = new Date(new Date().getTime() + (1000 * 60 * 60 * 24 * 7));
    Cookies.set('auth__flow__spa__loggedUserObj', response.data, { expires: inOneWeek });
    yield put({ type: ActionTypes.LOGIN_SUCCEEDED, user: response.data });
  } catch (error) {
    if (lGet(error.response, 'data')) {
      yield put({ type: ActionTypes.LOGIN_FAILED, error: error.response.data });
    } else {
      yield put({ type: ActionTypes.LOGIN_FAILED, error });
    }
  }
}

export function* watchLogin() {
  yield takeLatest(ActionTypes.LOGIN_REQUESTED, login);
}

function* logout() {
  try {
    yield call(
      get,
      '/logout',
    );
    Cookies.remove('auth__flow__spa__loggedUserObj');
    yield put({ type: ActionTypes.LOGOUT_SUCCEEDED });
  } catch (error) {
    if (lGet(error.response, 'data')) {
      yield put({ type: ActionTypes.LOGOUT_FAILED, error: error.response.data });
    } else {
      yield put({ type: ActionTypes.LOGOUT_FAILED, error: error.response });
    }
  }
}

export function* watchLogout() {
  yield takeLatest(ActionTypes.LOGOUT_REQUESTED, logout);
}

function* getProfile() {
  try {
    const response = yield call(
      get,
      '/users/profile',
    );
    const inOneWeek = new Date(new Date().getTime() + 1000 * 60 * 60 * 24 * 7);
    Cookies.set('auth__flow__spa__loggedUserObj', response, { expires: inOneWeek });
    yield put({ type: ActionTypes.PROFILE_SUCCEEDED, user: response });
  } catch (error) {
    yield put({ type: ActionTypes.PROFILE_FAILED, error: error.response });
  }
}

export function* watchGetProfile() {
  yield takeLatest(ActionTypes.PROFILE_REQUESTED, getProfile);
}
