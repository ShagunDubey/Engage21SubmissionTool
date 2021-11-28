import React, { useState, useEffect } from 'react';
import { Form, Button, Container, Row, Col, Image } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import { useNavigate, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import Loader from '../components/Loader';
import axios from 'axios';
import {
  showUserProfile,
  createUserProfile,
} from '../store/actions/userActions';
import { Header, Icon } from 'semantic-ui-react';

const styles = {
  form: {
    backgroundColor: '#daf5ee',
  },
  inputField: {
    backgroundColor: '#d6c9c1',
    padding: '1rem',
    borderRadius: 3,
  },
};

function UserProfileScreen() {
  const dispatch = useDispatch();
  let navigate = useNavigate();
  const userLogin = useSelector((state) => state.userLogin);
  let { id } = useParams();
  const { userInfo } = userLogin;
  const is_teacher = userInfo.user.is_teacher;
  const userDetails = useSelector((state) => state.userDetails);
  const { error, loading, user } = userDetails;
  const [roll, setRoll] = useState(0);
  const [emp, setEmp] = useState(0);
  const [course, setCourse] = useState('');
  const [designation, setDesignation] = useState('');
  useEffect(() => {
    if (!userInfo) {
      navigate('/login');
    }
    if (!error) dispatch(showUserProfile(userInfo.user.id));
  }, [dispatch]);
  const submitHandler = (e) => {
    e.preventDefault();
    let data = {};
    if (is_teacher) {
      data = {
        teacher: {
          emp_id: emp,
          designation: designation,
        },
      };
    } else {
      data = {
        student: {
          roll: roll,
          course: course,
        },
      };
    }
    dispatch(createUserProfile(id, data)).then((status) => {
      if(status===200)
      dispatch(showUserProfile(userInfo.user.id))
    });
  };
  const uploadFileHandler = async (e) => {
    const file = e.target.files[0];
    const formData = new FormData();

    formData.append('image', file);
    formData.append('id', id);

    try {
      const config = {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      };

      const {  status } = await axios.post(
        '/api/uploadProfilePic',
        formData,
        config
      );
      if (status === 200) {
        dispatch(showUserProfile(userInfo.user.id));
      }
    } catch (error) {
      
    }
  };
  return (
    <Container>
      {loading ? (
        <Loader />
      ) : (
        <>
          <Row>
            <Header as='h2' textAlign='center' icon dividing>
              <Icon name='users' circular />
              <Header.Content>User Profile</Header.Content>
            </Header>
          </Row>
          <Row>
            <Col md={4}>
              {user && user.image ? (
                <Image
                  src={`${user.image}`}
                  alt={`${userInfo.user.username}`}
                  rounded
                  width='60%'
                />
              ) : (
                <Image
                  src={`/images/teacher_profiles/placeholder.png`}
                  alt={`Profile pic`}
                  rounded
                  width='60%'
                />
              )}
              <Form>
                <Form.Label>Edit profile picture</Form.Label>
                <Form.Control
                  type='file'
                  onChange={uploadFileHandler}
                ></Form.Control>
              </Form>
            </Col>
            <Col
              md={8}
              style={{
                backgroundColor: '#a9dad1',
                fontWeight: 'bold',
                fontSize: '15px',
              }}
            >
              <Row style={{ padding: '1%' }}>
                <Col sm={4}> Username: </Col>
                <Col sm={8}> {userInfo.user.username} </Col>
              </Row>
              <Row style={{ padding: '1%' }}>
                <Col sm={4}> First name: </Col>
                <Col sm={8}> {userInfo.user.first_name} </Col>
              </Row>
              <Row style={{ padding: '1%' }}>
                <Col sm={4}> Last name: </Col>
                <Col sm={8}> {userInfo.user.last_name} </Col>
              </Row>
              <Row style={{ padding: '1%' }}>
                <Col sm={4}> Department: </Col>
                <Col sm={8}> {userInfo.user.department} </Col>
              </Row>
              {user ? (
                is_teacher ? (
                  <>
                    <Row style={{ padding: '1%' }}>
                      <Col sm={4}> Employee ID: </Col>
                      <Col sm={8}> {user.emp_id} </Col>
                    </Row>
                    <Row style={{ padding: '1%' }}>
                      <Col sm={4}> Designation </Col>
                      <Col sm={8}> {user.designation} </Col>
                    </Row>
                  </>
                ) : (
                  <>
                    <Row style={{ padding: '1%' }}>
                      <Col sm={4}> Roll no: </Col>
                      <Col sm={8}> {user.roll} </Col>
                    </Row>
                    <Row style={{ padding: '1%' }}>
                      <Col sm={4}> Course </Col>
                      <Col sm={8}> {user.course} </Col>
                    </Row>
                  </>
                )
              ) : (
                <></>
              )}
              <Row style={{ padding: '1%', textAlign: 'center' }}>
                <Col
                  style={{
                    fontWeight: 'lighter',
                    backgroundColor: '#25564d',
                    color: 'white',
                  }}
                >
                  For any changes to the above information, please contact the
                  admin.
                </Col>
              </Row>
            </Col>
          </Row>
        </>
      )}
      {!user &&
        (!userInfo.user.is_teacher ? (
          <Form onSubmit={submitHandler}>
            <Form.Group as={Row} controlId='roll' style={styles.inputField}>
              <Form.Label column sm={2}>
                Roll number:
              </Form.Label>
              <Col sm={10}>
                <Form.Control
                  required
                  type='number'
                  placeholder='Enter your roll number'
                  value={roll}
                  onChange={(e) => setRoll(e.target.value)}
                ></Form.Control>
              </Col>
            </Form.Group>

            <Form.Group as={Row} controlId='course' style={styles.inputField}>
              <Form.Label column sm={2}>
                Course
              </Form.Label>
              <Col sm={10}>
                <Form.Control
                  required
                  type='text'
                  placeholder='Enter course name: '
                  value={course}
                  onChange={(e) => setCourse(e.target.value)}
                ></Form.Control>
              </Col>
            </Form.Group>

            <Form.Group as={Row} className='mb-3' style={styles.inputField}>
              <Button type='submit' variant='primary'>
                Create Student Profile
              </Button>
            </Form.Group>
          </Form>
        ) : (
          <Form onSubmit={submitHandler}>
            <Form.Group as={Row} controlId='emp' style={styles.inputField}>
              <Form.Label column sm={2}>
                Employee number:
              </Form.Label>
              <Col sm={10}>
                <Form.Control
                  required
                  type='number'
                  placeholder='Enter your employee number '
                  value={emp}
                  onChange={(e) => setEmp(e.target.value)}
                ></Form.Control>
              </Col>
            </Form.Group>

            <Form.Group
              as={Row}
              controlId='designation'
              style={styles.inputField}
            >
              <Form.Label column sm={2}>
                Designation
              </Form.Label>
              <Col sm={10}>
                <Form.Control
                  required
                  type='text'
                  placeholder='Enter designation '
                  value={designation}
                  onChange={(e) => setDesignation(e.target.value)}
                ></Form.Control>
              </Col>
            </Form.Group>

            <Form.Group as={Row} className='mb-3' style={styles.inputField}>
              <Button type='submit' variant='primary'>
                Create Teacher Profile
              </Button>
            </Form.Group>
          </Form>
        ))}
    </Container>
  );
}

export default UserProfileScreen;
