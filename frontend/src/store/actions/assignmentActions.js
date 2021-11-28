import {
  ASSIGNMENT_LIST_REQUEST,
  ASSIGNMENT_LIST_SUCCESS,
  ASSIGNMENT_LIST_FAIL,
  ASSIGNMENT_DETAILS_REQUEST,
  ASSIGNMENT_DETAILS_SUCCESS,
  ASSIGNMENT_DETAILS_FAIL,
  ASSIGNMENT_UPDATE_REQUEST,
  ASSIGNMENT_UPDATE_SUCCESS,
  ASSIGNMENT_UPDATE_FAIL,
  ASSIGNMENT_CREATE_REQUEST,
  ASSIGNMENT_CREATE_SUCCESS,
  ASSIGNMENT_CREATE_FAIL,
  ASSIGNMENT_DELETE_REQUEST,
  ASSIGNMENT_DELETE_SUCCESS,
  ASSIGNMENT_DELETE_FAIL,
} from '../constants/assignmentConstants';
import axios from 'axios';

export const listAssignments = (id) => async (dispatch) => {
  try {
    dispatch({
      type: ASSIGNMENT_LIST_REQUEST,
    });

    const { data } = await axios.get(`/api/classrooms/${id}/assignments`);
    dispatch({
      type: ASSIGNMENT_LIST_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: ASSIGNMENT_LIST_FAIL,
      payload:
        error.response && error.response.data.detail
          ? error.response.data.detail
          : error.message,
    });
  }
};

export const createAssignment = (id, title, description, d, points) => async (
  dispatch
) => {
  try {
    dispatch({
      type: ASSIGNMENT_CREATE_REQUEST,
    });
    
    const config = {
      headers: {
        'Content-type': 'application/json',
      },
    };
    const { data, status } = await axios.post(
      `/api/classrooms/${id}/assignments`,
      {
        assignment: {
          title: title,
          description: description,
          classroom: id,
          deadline: d,
          points: points,
        },
      },
      config
    );
    dispatch({
      type: ASSIGNMENT_CREATE_SUCCESS,
      payload: data,
    });
    return status;
  } catch (error) {
    dispatch({
      type: ASSIGNMENT_CREATE_FAIL,
      payload:
        error.response && error.response.data.detail
          ? error.response.data.detail
          : error.message,
    });
  }
};

export const updateAssignment = (assignment) => async (dispatch) => {
  try {
    const config = {
      headers: {
        'Content-type': 'application/json',
      },
    };
    dispatch({
      type: ASSIGNMENT_UPDATE_REQUEST,
    });

    const { data, status } = await axios.put(
      `/api/classrooms/${assignment.id}/assignments/${assignment.id_assignment}`,
      {
        assignment: assignment,
      },
      config
    );
    dispatch({
      type: ASSIGNMENT_UPDATE_SUCCESS,
      payload: data,
    });
    return status;
  } catch (error) {
    dispatch({
      type: ASSIGNMENT_UPDATE_FAIL,
      payload:
        error.response && error.response.data.detail
          ? error.response.data.detail
          : error.message,
    });
  }
};

export const deleteAssignment = (id, id_assignment) => async (dispatch) => {
  try {
    dispatch({
      type: ASSIGNMENT_DELETE_REQUEST,
    });

    const config = {
      headers: {
        'Content-type': 'application/json',
      },
    };

    const { status } = await axios.delete(
      `/api/classrooms/${id}/assignments/${id_assignment}`,
      config
    );

    dispatch({
      type: ASSIGNMENT_DELETE_SUCCESS,
    });
    return status;
  } catch (error) {
    dispatch({
      type: ASSIGNMENT_DELETE_FAIL,
      payload:
        error.response && error.response.data.detail
          ? error.response.data.detail
          : error.message,
    });
  }
};

export const listAssignmentDetails = (id, id_assignment) => async (
  dispatch
) => {
  try {
    dispatch({
      type: ASSIGNMENT_DETAILS_REQUEST,
    });

    const { data } = await axios.get(
      `/api/classrooms/${id}/assignments/${id_assignment}`
    );
    dispatch({
      type: ASSIGNMENT_DETAILS_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: ASSIGNMENT_DETAILS_FAIL,
      payload:
        error.response && error.response.data.detail
          ? error.response.data.detail
          : error.message,
    });
  }
};
