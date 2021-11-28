import { BrowserRouter as Router, Routes } from 'react-router-dom';
import React from 'react';
import { Route } from 'react-router-dom';
import Signup from './screens/RegisterScreen';
import Login from './screens/LoginScreen';
import HomeScreen from './screens/HomeScreen';
import ClassroomScreen from './screens/ClassroomScreen';
import ClassroomStudentsScreen from './screens/ClassroomStudentsScreen';
import AssignmentCreateScreen from './screens/AssignmentCreateScreen';
import AssignmentScreen from './screens/AssignmentScreen';
import AssignmentUpdateScreen from './screens/AssignmentUpdateScreen';
import FileUploadScreen from './screens/FileUploadScreen';
import UserProfileScreen from './screens/UserProfileScreen';
import SubmissionListScreen from './screens/SubmissionListScreen';
import SubmissionScreen from './screens/SubmissionScreen';
import SubmissionDetailsScreen from './screens/SubmissionDetailsScreen';
import Header from './components/Header';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { createBrowserHistory } from 'history';

function App() {
  return (
    <Router history={createBrowserHistory()}>
      <Header />
      <main className='py-3'>
        <Routes>
          <Route exact path='/' element={<HomeScreen />} />
          <Route exact path='/signup' element={<Signup />} />
          <Route exact path='/login' element={<Login />} />
          <Route exact path='/classroom/:id' element={<ClassroomScreen />} />
          <Route
            exact
            path='/classroom/:id/students'
            element={<ClassroomStudentsScreen />}
          />
          <Route
            exact
            path='/classroom/:id/create'
            element={<AssignmentCreateScreen />}
          />
          <Route
            exact
            path='/classroom/:id/assignment/:id_assignment'
            element={<AssignmentScreen />}
          />
          <Route
            exact
            path='/classroom/:id/assignment/:id_assignment/update'
            element={<AssignmentUpdateScreen />}
          />
          <Route
            exact
            path='/classroom/:id/:title/upload'
            element={<FileUploadScreen />}
          />
          <Route
            exact
            path='/profile/:id'
            element={<UserProfileScreen />}
          />
          <Route
            exact
            path='/classroom/:id/assignment/:id_assignment/create'
            element={<SubmissionScreen />}
          />
          <Route
            exact
            path='/assignment/:id/submissions'
            element={<SubmissionListScreen />}
          />
          <Route
            exact
            path='/submission/:id'
            element={<SubmissionDetailsScreen />}
          />
        </Routes>
      </main>
    </Router>
  );
}

export default App;
