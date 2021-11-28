import React, { useEffect, useState } from 'react';
import { Navigate, useNavigate } from 'react-router-dom';
import { Row, Col, Container } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import {
  listClassrooms,
  createClassroom,
  joinClassroom,
} from '../store/actions/classroomActions';
import Loader from '../components/Loader';
import Message from '../components/Message';
import Classroom from '../components/Classroom';
import { Modal, Form, Header, Button, Icon } from 'semantic-ui-react';
import 'semantic-ui-css/semantic.min.css';

function HomeScreen() {
  const dispatch = useDispatch();

  const classroomList = useSelector((state) => state.classroomList);
  const { error, loading, classrooms } = classroomList;

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  let navigate = useNavigate();

  function handleSubmit(e) {
    e.preventDefault();
    setShow(false);
    if (userInfo.user.is_teacher)
      dispatch(createClassroom(className)).then(() =>
        dispatch(listClassrooms())
      );
    else {
      dispatch(joinClassroom(className)).then(() => dispatch(listClassrooms()));
    }
  }

  const [show, setShow] = useState(false);
  const [className, setClassName] = useState('');
  const handleShow = () => setShow(true);

  // function refreshScreen() {
  //   window.location.reload(false);
  // }

  useEffect(() => {
    dispatch(listClassrooms());
  }, [dispatch]);

  if (!userInfo) return <Navigate to='/login' />;
  const buttonText = userInfo.user.is_teacher ? 'Create' : 'Join';
  return (
    <>
      <Modal
        basic
        as={Form}
        onSubmit={(e) => handleSubmit(e)}
        open={show}
        size='small'
      >
        <Header icon='pencil' content='Enter classroom name' as='h4' />
        <Modal.Content>
          <Form.Input
            required
            type='text'
            placeholder='Enter class name'
            value={className}
            onChange={(e) => setClassName(e.target.value)}
          />
        </Modal.Content>
        <Modal.Actions>
          <Button
            negative
            icon='times'
            content='Close'
            onClick={() => {
              setShow(false);
              setClassName('');
            }}
          />
          <Button positive type='submit' icon='save' content={buttonText} />
        </Modal.Actions>
      </Modal>
      <Container>
        <Header as='h2' textAlign='center' icon dividing>
          <Icon name='student' circular />
          <Header.Content>Your classrooms</Header.Content>
        </Header>
        <Row>
          <Col>
            <Button onClick={handleShow} primary>
              {buttonText}
            </Button>
          </Col>
        </Row>
        {loading ? (
          <Loader />
        ) : error ? (
          <>
            <Message variant='danger'>{error}</Message>
            <Button onClick={() => navigate(-1)}>Go back</Button>
          </>
        ) : (
          <Row>
            {classrooms &&
              classrooms.map((classroom) => (
                <Col key={classroom.id} sm={12} md={6} lg={4} xl={3}>
                  <Classroom classroom={classroom} />
                </Col>
              ))}
          </Row>
        )}
      </Container>
    </>
  );
}

export default HomeScreen;
