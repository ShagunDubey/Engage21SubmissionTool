import axios from 'axios';
import {
  CLASSROOM_LIST_REQUEST,
  CLASSROOM_LIST_SUCCESS,
  CLASSROOM_LIST_FAIL,
  CLASSROOM_DETAILS_REQUEST,
  CLASSROOM_DETAILS_SUCCESS,
  CLASSROOM_DETAILS_FAIL,
  CLASSROOM_JOIN_REQUEST,
  CLASSROOM_JOIN_SUCCESS,
  CLASSROOM_JOIN_FAIL,
  CLASSROOM_DELETE_REQUEST,
  CLASSROOM_DELETE_SUCCESS,
  CLASSROOM_DELETE_FAIL,
  CLASSROOM_CREATE_FAIL,
  CLASSROOM_CREATE_REQUEST,
  CLASSROOM_CREATE_SUCCESS,
  CLASSROOM_LEAVE_REQUEST,
  CLASSROOM_LEAVE_SUCCESS,
  CLASSROOM_LEAVE_FAIL,
} from '../constants/classroomConstants';

export const listClassrooms = () => async (dispatch) => {
  try {
    dispatch({
      type: CLASSROOM_LIST_REQUEST,
    });

    const { data } = await axios.get('/api/classrooms');
    dispatch({
      type: CLASSROOM_LIST_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: CLASSROOM_LIST_FAIL,
      payload:
        error.response && error.response.data.detail
          ? error.response.data.detail
          : error.message,
    });
  }
};

export const listClassroomDetails = (id) => async (dispatch) => {
  try {
    dispatch({
      type: CLASSROOM_DETAILS_REQUEST,
    });

    const { data } = await axios.get(`/api/classrooms/${id}`);
    dispatch({
      type: CLASSROOM_DETAILS_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: CLASSROOM_DETAILS_FAIL,
      payload:
        error.response && error.response.data.detail
          ? error.response.data.detail
          : error.message,
    });
  }
};

export const createClassroom = (name) => async (dispatch, getState) => {
  try {
    dispatch({
      type: CLASSROOM_CREATE_REQUEST,
    });
    const {
      userLogin: { userInfo },
    } = getState();

    const config = {
      headers: {
        'Content-type': 'application/json',
      },
    };
    const { data } = await axios.post(
      '/api/classrooms',
      {
        classroom: {
          name: name,
          teacher: userInfo.email,
        },
      },
      config
    );

    dispatch({
      type: CLASSROOM_CREATE_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: CLASSROOM_CREATE_FAIL,
      payload:
        error.response && error.response.data.detail
          ? error.response.data.detail
          : error.message,
    });
  }
};

export const joinClassroom = (name) => async (dispatch) => {
  try {
    dispatch({
      type: CLASSROOM_JOIN_REQUEST,
    });
    const config = {
      headers: {
        'Content-type': 'application/json',
      },
    };
    const { data } = await axios.post(
      '/api/classrooms',
      {
        classroom: name,
      },
      config
    );
    dispatch({
      type: CLASSROOM_JOIN_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: CLASSROOM_JOIN_FAIL,
      payload:
        error.response && error.response.data.detail
          ? error.response.data.detail
          : error.message,
    });
  }
};

export const deleteClassroom = (id) => async (dispatch) => {
  try {
    dispatch({
      type: CLASSROOM_DELETE_REQUEST,
    });

    const config = {
      headers: {
        'Content-type': 'application/json',
      },
    };

    const { status } = await axios.delete(`/api/classrooms/${id}`, config);

    dispatch({
      type: CLASSROOM_DELETE_SUCCESS,
    });
    return status;
  } catch (error) {
    dispatch({
      type: CLASSROOM_DELETE_FAIL,
      payload:
        error.response && error.response.data.detail
          ? error.response.data.detail
          : error.message,
    });
  }
};

export const leaveClassroom = (id) => async (dispatch) => {
  try {
    dispatch({
      type: CLASSROOM_LEAVE_REQUEST,
    });

    const config = {
      headers: {
        'Content-type': 'application/json',
      },
    };

    const { status } = await axios.delete(`/api/classrooms/${id}`, config);

    dispatch({
      type: CLASSROOM_LEAVE_SUCCESS,
    });
    return status;
  } catch (error) {
    dispatch({
      type: CLASSROOM_LEAVE_FAIL,
      payload:
        error.response && error.response.data.detail
          ? error.response.data.detail
          : error.message,
    });
  }
};
