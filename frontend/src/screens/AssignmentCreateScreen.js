import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import { Form, Button, Row, Col, Container } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import Message from '../components/Message';
import Loader from '../components/Loader';
import ClassroomHeader from '../components/ClassroomHeader';
import DateTimePicker from 'react-datetime-picker';
import { createAssignment } from '../store/actions/assignmentActions';
import { listClassroomDetails } from '../store/actions/classroomActions';
import { Header, Icon } from 'semantic-ui-react';

const styles = {
  form: {
    backgroundColor: '#daf5ee',
  },
  inputField: {
    backgroundColor: '#86c1e9',
    padding: '1rem',
    borderRadius: 3,
  },
};

function AssignmentCreateScreen() {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [deadline, setDeadline] = useState('');
  const [points, setPoints] = useState(0);
  const [message, setMessage] = useState('');

  const dispatch = useDispatch();
  let navigate = useNavigate();
  let location = useLocation();
  let { id } = useParams();
  const redirect = location.search ? location.search.split('=')[1] : '/';
  const userLogin = useSelector((state) => state.userLogin);
  const { error, loading, userInfo } = userLogin;
  const classroomDetails = useSelector((state) => state.classroomDetails);
  const { loading1, error1, classroom } = classroomDetails;

  useEffect(() => {
    if (!userInfo.user.is_teacher) {
      navigate(redirect);
    }
    dispatch(listClassroomDetails(id));
  }, [navigate, userInfo, redirect]);

  const submitHandler = (e) => {
    e.preventDefault();
    let d;
    if(deadline!= '')
   { const d1 = new Date(deadline);
    d = d1.toISOString();}
    else d=null;
    dispatch(createAssignment(id, title, description, d, points)).then(
      (status) => {
        if (status === 200) {
          let res = title.replace(/ /g, '-');
          navigate(`/classroom/${id}/${res}/upload`);
        } else {
          setMessage('An error occurred. Please try again.');
        }
      }
    );
  };

  return (
    <>
      <ClassroomHeader classroom={classroom} />
      <Container>
        <Header
          as='h2'
          textAlign='center'
          icon
          dividing
          style={{ paddingTop: '1%' }}
        >
          <Icon name='file code' circular />
          <Header.Content>Create assignment</Header.Content>
        </Header>
        {message && <Message variant='danger'>{message}</Message>}
        {error && <Message variant='danger'>{error}</Message>}
        {(loading || loading1) && <Loader>Loading</Loader>}
        <Form onSubmit={submitHandler}>
          <Form.Group as={Row} controlId='title' style={styles.inputField}>
            <Form.Label column sm={2}>
              Title
            </Form.Label>
            <Col sm={10}>
              <Form.Control
                required
                type='text'
                placeholder='Enter title for assignment'
                value={title}
                onChange={(e) => setTitle(e.target.value)}
              ></Form.Control>
            </Col>
          </Form.Group>

          <Form.Group
            as={Row}
            controlId='description'
            style={styles.inputField}
          >
            <Form.Label column sm={2}>
              Description
            </Form.Label>
            <Col sm={10}>
              <Form.Control
                required
                type='text'
                placeholder='Enter description'
                value={description}
                onChange={(e) => setDescription(e.target.value)}
              ></Form.Control>
            </Col>
          </Form.Group>

          <Form.Group as={Row} controlId='deadline' style={styles.inputField}>
            <Form.Label column sm={2}>
              Deadline
            </Form.Label>
            <Col sm={10}>
              <DateTimePicker onChange={setDeadline} value={deadline} />
            </Col>
          </Form.Group>

          <Form.Group
            as={Row}
            className='mb-3'
            controlId='points'
            style={styles.inputField}
          >
            <Form.Label column sm={2}>
              Points
            </Form.Label>
            <Col sm={10}>
              <Form.Control
                type='number'
                value={points}
                onChange={(e) => setPoints(e.target.value)}
                name='points'
              ></Form.Control>
            </Col>
          </Form.Group>

          <div
            style={{
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              padding: '2%',
            }}
          >
            <Button type='submit' variant='primary'>
              Create Assignment
            </Button>
          </div>
          <p style={{ textAlign: 'center', color:'#092334' }}>
           Note: You can add a file for the assignment in the next page.
          </p>
        </Form>
      </Container>
    </>
  );
}

export default AssignmentCreateScreen;
