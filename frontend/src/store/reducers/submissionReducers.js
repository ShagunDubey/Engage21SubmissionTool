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

export const submissionListReducer = (state = { submissions: [] }, action) => {
  switch (action.type) {
    case SUBMISSION_LIST_REQUEST:
      return { loading: true, submissions: [] };
    case SUBMISSION_LIST_SUCCESS:
      return { loading: false, submissions: action.payload };
    case SUBMISSION_LIST_FAIL:
      return { loading: false, errors: action.payload };
    default:
      return state;
  }
};

export const submissionDetailsReducer = (
  state = { submission: [] },
  action
) => {
  switch (action.type) {
    case SUBMISSION_DETAILS_REQUEST:
      return { loading: true, ...state };
    case SUBMISSION_DETAILS_SUCCESS:
      return { loading: false, submission: action.payload };
    case SUBMISSION_DETAILS_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

export const gradeSubmissionReducer = (state = { submission: {} }, action) => {
  switch (action.type) {
    case SUBMISSION_UPDATE_REQUEST:
      return { loading: true };

    case SUBMISSION_UPDATE_SUCCESS:
      return { loading: false, success: true, submission: action.payload };

    case SUBMISSION_UPDATE_FAIL:
      return { loading: false, error: action.payload };

    default:
      return state;
  }
};

export const createSubmissionReducer = (state = {}, action) => {
  switch(action.type) {
    case SUBMISSION_CREATE_REQUEST:
      return { loading: true, ...state };
    case SUBMISSION_CREATE_SUCCESS:
      return { loading: false, submission: action.payload };
    case SUBMISSION_CREATE_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
}
