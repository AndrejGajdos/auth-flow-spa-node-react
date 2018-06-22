import * as ActionTypes from 'constants/actionTypes';

export const login = (email, password) => ({
  type: ActionTypes.LOGIN_REQUESTED,
  email,
  password,
});

export const logout = () => ({
  type: ActionTypes.LOGOUT_REQUESTED,
});

export const getProfile = () => ({
  type: ActionTypes.PROFILE_REQUESTED,
});
