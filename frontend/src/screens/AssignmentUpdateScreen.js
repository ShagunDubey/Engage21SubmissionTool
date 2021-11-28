import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import { Form, Button, Row, Col, Container } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import Message from '../components/Message';
import Loader from '../components/Loader';
import DateTimePicker from 'react-datetime-picker';
import {
  updateAssignment,
  listAssignmentDetails,
} from '../store/actions/assignmentActions';
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

function AssignmentUpdateScreen() {
  
  const [message, setMessage] = useState('');

  const dispatch = useDispatch();
  let navigate = useNavigate();
  let location = useLocation();
  let { id, id_assignment } = useParams();
  const redirect = location.search ? location.search.split('=')[1] : '/';
  const userLogin = useSelector((state) => state.userLogin);
  const { error, loading, userInfo } = userLogin;
  const assignmentDetails = useSelector((state) => state.assignmentDetails);
  const { loading1, error1, assignment } = assignmentDetails;
  const [uploading, setUploading] = useState(false);
  const [deadline, setDeadline] = useState(assignment.deadline);
  const [description, setDescription] = useState(assignment.description);
  
  const [points, setPoints] = useState(assignment.points);

  useEffect(() => {
    if (!userInfo.user.is_teacher) {
      navigate(redirect);
    }
    dispatch(listAssignmentDetails(id, id_assignment));
  }, [navigate, userInfo, redirect]);

  const submitHandler = (e) => {
    e.preventDefault();
    let deadline1 = new Date(deadline);
    let d = deadline1.toISOString();

    if (deadline1 < Date.now()) {
      setDeadline(assignment.deadline);
    }
    if (points <= 0 && window.confirm('Do you want to set the points to 0?')) {
      setPoints(0);
    }
    dispatch(
      updateAssignment({ id, id_assignment, description, d, points })
    ).then((status) => {
      if (status === 200) {
        navigate(`/classroom/${id}`);
      } else {
        setMessage('An error occurred. Please try again.');
      }
    });
  };

  const uploadFileHandler = async (e) => {
    const file = e.target.files[0];
    const formData = new FormData();

    formData.append('image', file);
    formData.append('classroom', id);
    formData.append('title', assignment.title);

    setUploading(true);

    try {
      const config = {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      };

      const { data, status } = await axios.post(
        '/api/upload',
        formData,
        config
      );
      setUploading(false);
    } catch (error) {
      setUploading(false);
      setMessage('An error occurred while uploading the file');
    }
  };
  return (
    <>
      <Container>
        <Header
          as='h2'
          textAlign='center'
          icon
          dividing
          style={{ paddingTop: '1%' }}
        >
          <Icon name='edit' circular />
          <Header.Content>Update</Header.Content>
        </Header>
        {loading || loading1 ? (
          <Loader />
        ) : error || error1 ? (
          <>
            <Message variant='danger'>{error}</Message>
          </>
        ) : (
          <Form onSubmit={submitHandler}>
            <Form.Group as={Row} className='mb-3' style={styles.inputField}>
              <Form.Label column sm={2}>
                Title
              </Form.Label>
              <Col sm={10}>
                <Form.Control
                  type='text'
                  value={assignment.title}
                  disabled
                  name='title'
                ></Form.Control>
              </Col>
            </Form.Group>
            <Form.Group
              as={Row}
              className='mb-3'
              controlId='description'
              style={styles.inputField}
            >
              <Form.Label column sm={2}>
                Description
              </Form.Label>
              <Col sm={10}>
                <Form.Control
                  type='text'
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  name='description'
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

            <Form.Group as={Row} controlId='image' style={styles.inputField}>
              <Form.Label column sm={2}>
                Upload file
              </Form.Label>
              <Col sm={10}>
                <Form.Control
                  label='Choose File'
                  type='file'
                  onChange={uploadFileHandler}
                ></Form.Control>
              </Col>
              {uploading && <Loader />}
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
                Update Assignment
              </Button>
            </div>
          </Form>
        )}
        <div
          style={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
          }}
        >
          <Button onClick={() => navigate(-1)}>Go back</Button>
        </div>
      </Container>
    </>
  );
}

export default AssignmentUpdateScreen;
