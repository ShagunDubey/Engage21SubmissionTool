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

export const assignmentListReducer = (state = { assignments: [] }, action) => {
  switch (action.type) {
    case ASSIGNMENT_LIST_REQUEST:
      return { loading: true, assignments: [] };
    case ASSIGNMENT_LIST_SUCCESS:
      return { loading: false, assignments: action.payload };
    case ASSIGNMENT_LIST_FAIL:
      return { loading: false, errors: action.payload };
    default:
      return state;
  }
};

export const assignmentDetailsReducer = (
  state = { assignment: [] },
  action
) => {
  switch (action.type) {
    case ASSIGNMENT_DETAILS_REQUEST:
      return { loading: true, ...state };
    case ASSIGNMENT_DETAILS_SUCCESS:
      return { loading: false, assignment: action.payload };
    case ASSIGNMENT_DETAILS_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

export const assignmentCreateReducer = (state = {}, action) => {
  switch (action.type) {
    case ASSIGNMENT_CREATE_REQUEST:
      return { loading: true, ...state };
    case ASSIGNMENT_CREATE_SUCCESS:
      return { loading: false, assignment: action.payload };
    case ASSIGNMENT_CREATE_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

export const assignmentUpdateReducer = (state = { assignment: {} }, action) => {
  switch (action.type) {
    case ASSIGNMENT_UPDATE_REQUEST:
      return { loading: true };

    case ASSIGNMENT_UPDATE_SUCCESS:
      return { loading: false, success: true, assignment: action.payload };

    case ASSIGNMENT_UPDATE_FAIL:
      return { loading: false, error: action.payload };

    // case ASSIGNMENT_UPDATE_RESET:
    //   return { product: {} };

    default:
      return state;
  }
};

export const assignmentDeleteReducer = (state = {}, action) => {
  switch (action.type) {
    case ASSIGNMENT_DELETE_REQUEST:
      return { loading: true };

    case ASSIGNMENT_DELETE_SUCCESS:
      return { loading: false, success: true };

    case ASSIGNMENT_DELETE_FAIL:
      return { loading: false, error: action.payload };

    default:
      return state;
  }
};
