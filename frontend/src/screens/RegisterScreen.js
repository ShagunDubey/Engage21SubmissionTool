import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useLocation, useNavigate } from 'react-router-dom';
import { register } from '../store/actions/userActions';
import { Link } from 'react-router-dom';
// import { Form, Button, Row, Col, Container } from 'react-bootstrap';
// import 'bootstrap/dist/css/bootstrap.min.css';
//import Message from '../components/Message';
import Loader from '../components/Loader';
import {
  Button,
  Form,
  Grid,
  Header,
  Message,
  Segment,
} from 'semantic-ui-react';

function RegisterScreen() {
  const [username, setUsername] = useState('');
  const [firstname, setFirstname] = useState('');
  const [lastname, setLastname] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [department, setDepartment] = useState('');
  const [isTeacher, setIsTeacher] = useState('');
  const [message, setMessage] = useState('');

  const dispatch = useDispatch();
  let history = useNavigate();
  let location = useLocation();
  const redirect = location.search ? location.search.split('=')[1] : '/';
  const userRegister = useSelector((state) => state.userRegister);
  const { error, loading, userInfo } = userRegister;

  useEffect(() => {
    if (userInfo) {
      history('/login');
    }
  }, [history, userInfo, redirect]);

  const submitHandler = (e) => {
    e.preventDefault();
    if (password != confirmPassword) {
      setMessage('Passwords do not match');
    } else
      dispatch(
        register(
          username,
          firstname,
          lastname,
          email,
          password,
          confirmPassword,
          department,
          isTeacher
        )
      ).then((status) => {
        if (status === 201) history('/login');
      });
  };

  return (
    <>
      {message && <Message color='brown'>{message}</Message>}
      {error && <Message negative>{error}</Message>}
      <Grid
        textAlign='center'
        style={{ height: '100vh' }}
        verticalAlign='middle'
      >
        <Grid.Column style={{ maxWidth: 450 }}>
          {loading && <Loader />}
          <Header as='h2' color='teal' textAlign='center'>
            Create new account
          </Header>
          <Form size='large' onSubmit={submitHandler}>
            <Segment stacked>
              <Form.Input
                fluid
                icon='user'
                iconPosition='left'
                placeholder='Enter username'
                onChange={(e) => setUsername(e.target.value)}
                required
              />
              <Form.Input
                fluid
                icon='write square'
                iconPosition='left'
                placeholder='Enter first name'
                onChange={(e) => setFirstname(e.target.value)}
                required
              />
              <Form.Input
                fluid
                icon='write square'
                iconPosition='left'
                placeholder='Enter last name'
                onChange={(e) => setLastname(e.target.value)}
                required
              />

              <Form.Input
                fluid
                icon='mail'
                iconPosition='left'
                placeholder='Enter email'
                onChange={(e) => setEmail(e.target.value)}
                required
              />

              <Form.Input
                fluid
                icon='lock'
                iconPosition='left'
                placeholder='Password'
                type='password'
                onChange={(e) => setPassword(e.target.value)}
                required
              />

              <Form.Input
                fluid
                icon='lock'
                iconPosition='left'
                placeholder='Confirm Password'
                type='password'
                onChange={(e) => setConfirmPassword(e.target.value)}
                required
              />
              <Form.Group inline required>
                <label>Join as teacher?</label>
                <Form.Radio
                  label='Yes'
                  value='true'
                  checked={isTeacher === 'true'}
                  onChange={(e) => setIsTeacher('true')}
                />
                <Form.Radio
                  label='No'
                  value='false'
                  checked={isTeacher === 'false'}
                  onChange={(e) => setIsTeacher('false')}
                />
              </Form.Group>
              <Form.Input
                fluid
                icon='group'
                iconPosition='left'
                placeholder='Enter department name'
                onChange={(e) => setDepartment(e.target.value)}
                required
              />

              <Button color='teal' fluid size='large'>
                Sign Up
              </Button>
            </Segment>
          </Form>
          <Message>
            Existing user? <Link to='/login'>Login now</Link>
          </Message>
        </Grid.Column>
      </Grid>
    </>
  );
}

export default RegisterScreen;
