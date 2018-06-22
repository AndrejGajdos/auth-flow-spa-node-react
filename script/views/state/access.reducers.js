import Cookies from 'js-cookie';
import * as ActionTypes from '../constants/actionTypes';

const initialState = {
  user: {
    isAuthenticated: typeof Cookies.get('auth__flow__spa__loggedUserObj') !== 'undefined',
    loggedUserObj: Cookies.getJSON('auth__flow__spa__loggedUserObj'),
  },
  error: null,
};

export default function access(state = initialState, action) {
  switch (action.type) {
    case ActionTypes.LOGIN_SUCCEEDED:
    case ActionTypes.PROFILE_SUCCEEDED: {
      return {
        ...state,
        user: {
          ...state.user,
          isAuthenticated: true,
          loggedUserObj: action.user,
        },
        error: null,
      };
    }
    case ActionTypes.LOGIN_FAILED: {
      return {
        ...state,
        error: action.error,
      };
    }
    case ActionTypes.PROFILE_FAILED:
    case ActionTypes.LOGOUT_SUCCEEDED: {
      return {
        ...state,
        user: {
          isAuthenticated: false,
        },
        error: null,
      };
    }
    default:
      return state;
  }
}
