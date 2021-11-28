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
import axios from 'axios';

export const login = (email, password) => async (dispatch) => {
  try {
    dispatch({
      type: USER_LOGIN_REQUEST,
    });

    const config = {
      headers: {
        'Content-type': 'application/json',
      },
    };
    const { data } = await axios.post(
      '/dj-rest-auth/login/',
      {
        email: email,
        password: password,
      },
      config
    );
    dispatch({
      type: USER_LOGIN_SUCCESS,
      payload: data,
    });

    localStorage.setItem('userInfo', JSON.stringify(data));
  } catch (error) {
    dispatch({
      type: USER_LOGIN_FAIL,
      payload:
        error.response && error.response.data.detail
          ? error.response.data.detail
          : error.message,
    });
  }
};

export const logout = () => async (dispatch) => {
  const config = {
    headers: {
      'Content-type': 'application/json',
    },
  };
  await axios.post('/dj-rest-auth/logout/', config);
  localStorage.removeItem('userInfo');
  dispatch({
    type: USER_LOGOUT,
  });
};

export const register = (
  username,
  firstname,
  lastname,
  email,
  password1,
  password2,
  department,
  is_teacher
) => async (dispatch) => {
  try {
    dispatch({
      type: USER_REGISTER_REQUEST,
    });

    const config = {
      headers: {
        'Content-type': 'application/json',
      },
    };
    const { data,status } = await axios.post(
      '/dj-rest-auth/registration/',
      {
        username: username,
        email: email,
        first_name:firstname,
        last_name:lastname,
        password1: password1,
        password2: password2,
        department: department,
        is_teacher: is_teacher,
      },
      config
    );
    
    dispatch({
      type: USER_REGISTER_SUCCESS,
      payload: data,
    });
    localStorage.setItem('userInfo', JSON.stringify(data));
    return status;
  } catch (error) {

    dispatch({
      type: USER_REGISTER_FAIL,
      payload:
        error.response && error.response.data.detail
          ? error.response.data.detail
          : error.message,
    });
  }
};

export const showUserProfile = (id) => async (dispatch) => {

  try {
    dispatch({
      type: USER_SHOW_PROFILE_REQUEST,
    });

    const config = {
      headers: {
        'Content-type': 'application/json',
      },
    };
    const { data } = await axios.get(`/api/profile/${id}`, config);
    dispatch({
      type: USER_SHOW_PROFILE_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: USER_SHOW_PROFILE_FAIL,
      payload:
        error.response && error.response.data.detail
          ? error.response.data.detail
          : error.message,
    });
  }
};

export const createUserProfile = (id, data) => async (dispatch, getState) => {
  try {
    dispatch({
      type: USER_CREATE_PROFILE_REQUEST,
    });

    const config = {
      headers: {
        'Content-type': 'application/json',
      },
    };
    const { dat, status } = await axios.post(
      `/api/profile/${id}`,
      { data: data },
      config
    );

    dispatch({
      type: USER_CREATE_PROFILE_SUCCESS,
      payload: dat,
    });
    return status;
  } catch (error) {
    dispatch({
      type: USER_CREATE_PROFILE_FAIL,
      payload:
        error.response && error.response.data.detail
          ? error.response.data.detail
          : error.message,
    });
  }
};
