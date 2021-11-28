import {
  USER_LOGIN_FAIL,
  USER_LOGIN_REQUEST,
  USER_LOGIN_SUCCESS,
  USER_LOGOUT,
  USER_REGISTER_FAIL,
  USER_REGISTER_SUCCESS,
  USER_REGISTER_REQUEST,
  USER_SHOW_PROFILE_FAIL,
  USER_SHOW_PROFILE_REQUEST,
  USER_SHOW_PROFILE_SUCCESS,
  USER_CREATE_PROFILE_FAIL,
  USER_CREATE_PROFILE_REQUEST,
  USER_CREATE_PROFILE_SUCCESS,
} from '../constants/userConstants';

export const userLoginReducer = (state = {}, action) => {
  switch (action.type) {
    case USER_LOGIN_REQUEST:
      return { loading: true };
    case USER_LOGIN_SUCCESS:
      return { loading: false, userInfo: action.payload };
    case USER_LOGIN_FAIL:
      return { loading: false, error: action.payload };
    case USER_LOGOUT:
      return {};
    default:
      return state;
  }
};

export const userRegisterReducer = (state = {}, action) => {
  switch (action.type) {
    case USER_REGISTER_REQUEST:
      return { loading: true };
    case USER_REGISTER_SUCCESS:
      return { loading: false, userInfo: action.payload };
    case USER_REGISTER_FAIL:
      return { loading: false, error: action.payload };
    case USER_LOGOUT:
      return {};
    default:
      return state;
  }
};

export const userShowProfileReducer = (state = { user: {} }, action) => {
  switch (action.type) {
    case USER_SHOW_PROFILE_REQUEST:
      return { loading: true,...state  };

    case USER_SHOW_PROFILE_SUCCESS:
      return { loading: false,user: action.payload };

    case USER_SHOW_PROFILE_FAIL:
      return { loading: false, error: action.payload };

    // case USER_SHOW_PROFILE_RESET:
    //   return { user: {} };

    default:
      return state;
  }
};

export const userCreateProfileReducer = (state = { user: {} }, action) => {
  switch (action.type) {
    case USER_CREATE_PROFILE_REQUEST:
      return { ...state, loading: true };
    case USER_CREATE_PROFILE_SUCCESS:
      return { loading: false, user: action.payload };
    case USER_CREATE_PROFILE_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};