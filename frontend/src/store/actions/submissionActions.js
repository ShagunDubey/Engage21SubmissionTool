import {
  SUBMISSION_LIST_REQUEST,
  SUBMISSION_LIST_SUCCESS,
  SUBMISSION_LIST_FAIL,
  SUBMISSION_DETAILS_REQUEST,
  SUBMISSION_DETAILS_SUCCESS,
  SUBMISSION_DETAILS_FAIL,
  SUBMISSION_UPDATE_REQUEST,
  SUBMISSION_UPDATE_SUCCESS,
  SUBMISSION_UPDATE_FAIL,
  SUBMISSION_CREATE_REQUEST,
  SUBMISSION_CREATE_SUCCESS,
  SUBMISSION_CREATE_FAIL,
} from '../constants/submissionConstants';
import axios from 'axios';

export const listSubmissions = (assignment_id) => async (dispatch) => {
  try {
    dispatch({
      type: SUBMISSION_LIST_REQUEST,
    });
    const { data } = await axios.get(
      `/api/assignments/${assignment_id}/submissions`
    );
    dispatch({
      type: SUBMISSION_LIST_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: SUBMISSION_LIST_FAIL,
      payload:
        error.response && error.response.data.detail
          ? error.response.data.detail
          : error.message,
    });
  }
};

export const listSubmissionDetails = (id) => async (dispatch) => {
  try {
    dispatch({
      type: SUBMISSION_DETAILS_REQUEST,
    });

    const { data } = await axios.get(`/api/submissions/${id}`);
    dispatch({
      type: SUBMISSION_DETAILS_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: SUBMISSION_DETAILS_FAIL,
      payload:
        error.response && error.response.data.detail
          ? error.response.data.detail
          : error.message,
    });
  }
};

export const gradeSubmission = (id, submission) => async (dispatch) => {
  try {
    const config = {
      headers: {
        'Content-type': 'application/json',
      },
    };
    dispatch({
      type: SUBMISSION_UPDATE_REQUEST,
    });

    const { data, status } = await axios.put(
      `/api/submissions/${id}`,
      {
        submission: submission,
      },
      config
    );
    dispatch({
      type: SUBMISSION_UPDATE_SUCCESS,
      payload: data,
    });
    return status;
  } catch (error) {
    dispatch({
      type: SUBMISSION_UPDATE_FAIL,
      payload:
        error.response && error.response.data.detail
          ? error.response.data.detail
          : error.message,
    });
  }
};

export const createSubmission = (assignment_id, formData) => async (
  dispatch
) => {
  try {
    dispatch({
      type: SUBMISSION_CREATE_REQUEST,
    });

    const config = {
      headers: {
        'Content-type': 'multipart/form-data',
      },
    };
    const { data, status } = await axios.post(
      `/api/assignments/${assignment_id}/submissions`,
      formData,
      config
    );

    dispatch({
      type: SUBMISSION_CREATE_SUCCESS,
      payload: data,
    });
    return status;
  } catch (error) {
    dispatch({
      type: SUBMISSION_CREATE_FAIL,
      payload:
        error.response && error.response.data.detail
          ? error.response.data.detail
          : error.message,
    });
  }
};
