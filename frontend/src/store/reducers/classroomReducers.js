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
  CLASSROOM_CREATE_REQUEST,
  CLASSROOM_CREATE_SUCCESS,
  CLASSROOM_CREATE_FAIL,
  CLASSROOM_DELETE_REQUEST,
  CLASSROOM_DELETE_SUCCESS,
  CLASSROOM_DELETE_FAIL,
  CLASSROOM_LEAVE_REQUEST,
  CLASSROOM_LEAVE_SUCCESS,
  CLASSROOM_LEAVE_FAIL,
} from '../constants/classroomConstants';

export const classroomListReducer = (state = { classrooms: [] }, action) => {
  switch (action.type) {
    case CLASSROOM_LIST_REQUEST:
      return { loading: true, classrooms: [] };
    case CLASSROOM_LIST_SUCCESS:
      return { loading: false, classrooms: action.payload };
    case CLASSROOM_LIST_FAIL:
      return { loading: false, errors: action.payload };

    default:
      return state;
  }
};

export const classroomJoinReducer = (state = { classroom: {} }, action) => {
  switch (action.type) {
    case CLASSROOM_JOIN_REQUEST:
      return { loading: true, ...state };
    case CLASSROOM_JOIN_SUCCESS:
      return {
        loading: false,
        classroom: action.payload,
      };
    case CLASSROOM_JOIN_FAIL:
      return { loading: false, error: action.payload };

    default:
      return state;
  }
};

export const classroomCreateReducer = (state = { classroom: {} }, action) => {
  switch (action.type) {
    case CLASSROOM_CREATE_REQUEST:
      return { loading: true, ...state };
    case CLASSROOM_CREATE_SUCCESS:
      return {
        loading: false,
        classroom: action.payload,
      };
    case CLASSROOM_CREATE_FAIL:
      return { loading: false, error: action.payload };

    default:
      return state;
  }
};

export const classroomDetailsReducer = (
  state = { classroom: { assignments: [] } },
  action
) => {
  switch (action.type) {
    case CLASSROOM_DETAILS_REQUEST:
      return { loading: true, ...state };
    case CLASSROOM_DETAILS_SUCCESS:
      return { loading: false, classroom: action.payload };
    case CLASSROOM_DETAILS_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

export const classroomDeleteReducer = (state = {}, action) => {
  switch (action.type) {
    case CLASSROOM_DELETE_REQUEST:
      return { loading: true };

    case CLASSROOM_DELETE_SUCCESS:
      return { loading: false, success: true };

    case CLASSROOM_DELETE_FAIL:
      return { loading: false, error: action.payload };

    default:
      return state;
  }
};

export const classroomLeaveReducer = (state = {}, action) => {
  switch (action.type) {
    case CLASSROOM_LEAVE_REQUEST:
      return { loading: true };

    case CLASSROOM_LEAVE_SUCCESS:
      return { loading: false, success: true };

    case CLASSROOM_LEAVE_FAIL:
      return { loading: false, error: action.payload };

    default:
      return state;
  }
};
