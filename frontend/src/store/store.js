import { createStore, combineReducers, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import { composeWithDevTools } from 'redux-devtools-extension';
import {
  userLoginReducer,
  userRegisterReducer,
  userShowProfileReducer,
  userCreateProfileReducer,
} from './reducers/userReducers';
import {
  classroomListReducer,
  classroomDetailsReducer,
  classroomDeleteReducer,
  classroomLeaveReducer,
  classroomCreateReducer, 
  classroomJoinReducer
} from './reducers/classroomReducers';
import {
  assignmentListReducer,
  assignmentDetailsReducer,
  assignmentCreateReducer,
  assignmentUpdateReducer,
  assignmentDeleteReducer,
} from './reducers/assignmentReducers';
import {
  submissionListReducer,
  submissionDetailsReducer,
  gradeSubmissionReducer,
  createSubmissionReducer,
} from './reducers/submissionReducers';

const reducer = combineReducers({
  classroomCreate: classroomCreateReducer,
  classroomJoin: classroomJoinReducer,
  classroomList: classroomListReducer,
  classroomDelete: classroomDeleteReducer,
  classroomLeave: classroomLeaveReducer,
  classroomDetails: classroomDetailsReducer,
  userLogin: userLoginReducer,
  userRegister: userRegisterReducer,
  userDetails: userShowProfileReducer,
  userProfile: userCreateProfileReducer,
  assignmentList: assignmentListReducer,
  assignment: assignmentCreateReducer,
  assignmentUpdate: assignmentUpdateReducer,
  assignmentDelete: assignmentDeleteReducer,
  assignmentDetails: assignmentDetailsReducer,
  submissionList: submissionListReducer,
  submissionDetails: submissionDetailsReducer,
  gradeSubmission: gradeSubmissionReducer,
  createSubmission: createSubmissionReducer,
});

const userInfoFromStorage = localStorage.getItem('userInfo')
  ? JSON.parse(localStorage.getItem('userInfo'))
  : null;

const initialState = {
  userLogin: { userInfo: userInfoFromStorage },
};

const middleware = [thunk];

const store = createStore(
  reducer,
  initialState,
  composeWithDevTools(applyMiddleware(...middleware))
);

export default store;
