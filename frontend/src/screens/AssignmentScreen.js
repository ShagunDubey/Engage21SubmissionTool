import React, { useEffect } from 'react';
import { Row, Col, Container, Button, Image, Badge } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import Loader from '../components/Loader';
import Message from '../components/Message';
import {
  listAssignmentDetails,
  deleteAssignment,
} from '../store/actions/assignmentActions';
import { useParams, useNavigate } from 'react-router-dom';

function AssignmentScreen() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;
  const is_teacher = userInfo.user.is_teacher;
  let { id, id_assignment } = useParams();
  const assignmentDetails = useSelector((state) => state.assignmentDetails);
  const { loading, error, assignment } = assignmentDetails;

  useEffect(() => {
    dispatch(listAssignmentDetails(id, id_assignment));
  }, [dispatch]);

  let deadline,
    created_at,
    updated_at,
    is_image,
    has_deadline = false;
  if (assignment) {
    if (assignment.deadline) {
      deadline = new Date(assignment.deadline);
      has_deadline = true;
    }
    created_at = new Date(assignment.created_at);
    updated_at = new Date(assignment.updated_at);
    if (
      assignment.question &&
      assignment.question.match(/.(jpg|jpeg|png|gif)$/i)
    ) {
      is_image = true;
    }
  }

  function handleDelete(e) {
    if (window.confirm('Are you sure you want to delete this assignment?')) {
      dispatch(deleteAssignment(id, id_assignment)).then((status) => {
        if (status === 200) {
          navigate(`/classroom/${id}`);
        }
      });
    }
  }

  const options = {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  };

  return (
    <>
      <Container>
        <Row style={{ padding: '2%' }}>
          <Col sm={8}>
            <Button onClick={() => navigate(`/classroom/${id}`)}>Go back</Button>
          </Col>
          {is_teacher && (
            <Col sm={4}>
              <Button variant='warning' onClick={() => navigate('update')}>
                Update
              </Button>
              &nbsp;
              <Button variant='danger' onClick={(e) => handleDelete(e)}>
                Delete
              </Button>
            </Col>
          )}
        </Row>
        <br />
        {loading ? (
          <Loader />
        ) : error ? (
          <Message variant='danger'>{error}</Message>
        ) : (
          <Container>
            <Row>
              <h1>{assignment.title}</h1>
            </Row>
            <hr style={{ border: '5px solid #FFF' }} />
            <Row style={{ paddingTop: '2%' }}>
              <Col sm={8}>
                Posted on:&nbsp;
                {created_at.toLocaleTimeString('en-US', {
                  hour: 'numeric',
                  minute: 'numeric',
                  hour12: true,
                })}
                , &nbsp;&nbsp;
                {created_at.toLocaleDateString(undefined, options)}
              </Col>
              <Col sm={4}>
                {created_at != updated_at ? (
                  <>
                    Last updated:
                    {updated_at.toLocaleDateString(undefined, options)}
                  </>
                ) : (
                  <></>
                )}
              </Col>
            </Row>

            <Row style={{ paddingBottom: '2%' }}>
              <Col sm={8}>
                <strong style={{ color: 'red' }}>
                  Deadline:&nbsp;
                  {has_deadline &&
                    deadline.toLocaleTimeString('en-US', {
                      hour: 'numeric',
                      minute: 'numeric',
                      hour12: true,
                    })}
                  &nbsp;&nbsp;
                  {has_deadline &&
                    deadline.toLocaleDateString(undefined, options)}
                  {!has_deadline && 'No deadline assigned'}
                </strong>
              </Col>
              <Col sm={4}>Points: {assignment.points}</Col>
            </Row>
            <br />
            <br />
            <Row>
              <Col
                sm={12}
                style={{
                  border: '0.5px groove #cfd1d0',
                  padding: '1%',
                  boxShadow: '10px 10px grey',
                  margin: '1%',
                }}
              >
                <h2>Description</h2>
                <div style={{ fontSize: '16px', fontFamily: 'Helvetica' }}>
                  {assignment.description}
                  <br />
                  {assignment.question &&
                    (is_image ? (
                      <Image
                        src={`${assignment.question}`}
                        alt={assignment.title}
                        thumbnail
                        width='60%'
                      />
                    ) : (
                      <p>
                        Please follow this link for more details on the
                        assignment.
                        <Badge style={{ padding: '1%', margin: '1%' }}>
                          <a
                            href={`http://127.0.0.1:8000${assignment.question}`}
                            target='_blank'
                            style={{ color: 'white' }}
                          >
                            Link
                          </a>
                        </Badge>
                      </p>
                    ))}
                </div>
              </Col>
            </Row>
            <Row>
              <Col sm={6} style={{ padding: '1%' }}>
                <Button
                  variant='info'
                  style={{ float: 'right' }}
                  onClick={() => navigate('create')}
                >
                  Submit
                </Button>
              </Col>
              <Col sm={6} style={{ padding: '1%' }}>
                <Button
                  variant='info'
                  onClick={() =>
                    navigate(`/assignment/${id_assignment}/submissions`)
                  }
                >
                  View Submissions
                </Button>
              </Col>
            </Row>
          </Container>
        )}
      </Container>
    </>
  );
}

export default AssignmentScreen;
