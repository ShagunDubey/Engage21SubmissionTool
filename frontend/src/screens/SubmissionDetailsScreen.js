import React, { useEffect, useState } from 'react';
import { Row, Col, Container, Button, Form, Badge } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import Loader from '../components/Loader';
import Message from '../components/Message';
import {
  listSubmissionDetails,
  gradeSubmission,
} from '../store/actions/submissionActions';
import { useParams, useNavigate, Link } from 'react-router-dom';

const styles = {
  inputField: {
    backgroundColor: '#d4ba9b',
    padding: '1%',
    borderRadius: 2,
  },
};

function SubmissionDetailsScreen() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [show, setShow] = useState(false);
  const [score, setScore] = useState(0);
  const [comments, setComments] = useState('');
  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;
  const is_teacher = userInfo.user.is_teacher;
  let { id } = useParams();
  const submissionDetails = useSelector((state) => state.submissionDetails);
  const { loading, error, submission } = submissionDetails;
  let assignment, deadline, submitted_at;
  if (submission) {
    assignment = submission.assignment;
    submitted_at = new Date(submission.submitted_at);
    if (assignment && assignment.deadline)
      deadline = new Date(assignment.deadline);
  }
  useEffect(() => {
    dispatch(listSubmissionDetails(id));
  }, [dispatch]);

  const options = {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  };

  const submitHandler = (e) => {
    e.preventDefault();
    if (score > assignment.points) {
      alert('Marks cannot be more than total allotted.');
    } else {
      let submission = {
        score: score,
        comments: comments,
      };
      dispatch(gradeSubmission(id, submission)).then((status) => {
        if (status === 200) {
          setShow(false);
        }
        dispatch(listSubmissionDetails(id));
      });
    }
  };
  return (
    <>
      <Container>
        <Row>
          <Col sm={8}>
            {submission && submission.assignment && (
              <Button
                onClick={() =>
                  navigate(
                    `/assignment/${submission.assignment.id}/submissions`
                  )
                }
              >
                Go back
              </Button>
            )}
          </Col>
          {is_teacher && (
            <Col sm={4}>
              <Button variant='warning' onClick={() => setShow(true)}>
                Grade
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
            {assignment && (
              <>
                <Row>
                  <h3>{assignment.title}</h3>
                </Row>
                <hr />
                <Row>
                  <Col sm={8}>
                    Deadline:&nbsp;
                    {assignment.deadline &&
                      deadline.toLocaleTimeString('en-US', {
                        hour: 'numeric',
                        minute: 'numeric',
                        hour12: true,
                      })}
                    &nbsp;&nbsp;
                    {assignment.deadline &&
                      deadline.toLocaleDateString(undefined, options)}
                    {!assignment.deadline && 'No deadline assigned.'}
                    
                  </Col>
                  <Col sm={4}>Points: {assignment.points}</Col>
                </Row>
                <Row>
                  <Col sm={8}>
                    Submission time:&nbsp;
                    {submitted_at.toLocaleTimeString('en-US', {
                      hour: 'numeric',
                      minute: 'numeric',
                      hour12: true,
                    })}
                    ,&nbsp;&nbsp;
                    {submitted_at.toLocaleDateString(undefined, options)}
                  </Col>
                  <Col sm={4}>
                    {assignment.deadline && submitted_at > deadline ? (
                      <Badge bg='danger'>Late Submission</Badge>
                    ) : (
                      <Badge bg='info'>On-time submission</Badge>
                    )}
                  </Col>
                </Row>
                <br />
                <br />
                <Row style={{ backgroundColor: '#f2eae1', padding: '2%' }}>
                  <Row>
                    <Col sm={3}>
                      <strong style={{ color: '#2e2d2c' }}>Title: </strong>
                    </Col>
                    <Col sm={9}> {assignment.title}</Col>
                  </Row>
                  <Row>
                    <Col sm={3}>
                      <strong>Description: </strong>
                    </Col>
                    <Col sm={9}> {assignment.description}</Col>
                  </Row>
                
                <Row>
                  {assignment.question ? (
                    <p>
                      Please follow this link for more details on the
                      assignment.
                      <Badge>
                        <a
                          href={`http://127.0.0.1:8000${assignment.question}`}
                          target='_blank'
                        >
                          Link
                        </a>
                      </Badge>
                    </p>
                  ) : (
                    <></>
                  )}
                </Row>
                <Row>
                  <Link to = {`/classroom/${assignment.classroom}/assignment/${assignment.id}`}>View assignment</Link>
                </Row>
                </Row>
                <Row
                  style={{
                    border: '0.5px groove #cfd1d0',
                    backgroundColor: '#f5a351',
                    padding: '1%',
                    boxShadow: '5px 5px grey',
                    marginTop: '3%',
                    marginBottom: '3%',
                  }}
                >
                  <Row>
                    <Col sm={4} md={2}>
                      Answer:
                    </Col>
                    <Col sm={8}>
                      <strong>
                        {submission.answer_text
                          ? submission.answer_text
                          : 'No answer provided'}
                      </strong>
                    </Col>
                  </Row>
                  <Row>
                    <Col sm={4} md={2}>
                      Answer file:
                    </Col>
                    <Col sm={8}>
                      <strong>
                        {submission.answer_file ? (
                          <a
                            href={`http://127.0.0.1:8000${submission.answer_file}`}
                            target='_blank'
                          >
                            File link
                          </a>
                        ) : (
                          'No file uploaded'
                        )}
                      </strong>
                    </Col>
                  </Row>
                </Row>
                <Row>
                  <Col
                    sm={4}
                    md={2}
                    style={{ borderRight: '1px solid #d6d4d2' }}
                  >
                    Score:
                  </Col>
                  <Col sm={8}>
                    <strong>
                      {(submission.marks || submission.comments) ? submission.marks : 'Not graded yet'}
                    </strong>
                  </Col>
                </Row>
                <Row>
                  <Col
                    sm={4}
                    md={2}
                    style={{ borderRight: '1px solid #d6d4d2' }}
                  >
                    Comments:
                  </Col>
                  <Col sm={8}>
                    <strong>
                      {submission.comments
                        ? submission.comments
                        : 'Not graded yet'}
                    </strong>
                  </Col>
                </Row>
                <Row style={{ marginTop: '2%' }}>
                  {show && is_teacher && (
                    <Form onSubmit={submitHandler}>
                      <Form.Group
                        as={Row}
                        controlId='score'
                        style={styles.inputField}
                      >
                        <Form.Label column sm={3}>
                          Score:
                        </Form.Label>
                        <Col sm={9}>
                          <Form.Control
                            required
                            type='number'
                            placeholder='Enter score'
                            value={score}
                            onChange={(e) => setScore(e.target.value)}
                          ></Form.Control>
                        </Col>
                      </Form.Group>
                      <Form.Group
                        as={Row}
                        controlId='comments'
                        style={styles.inputField}
                      >
                        <Form.Label column sm={3}>
                          Comments:
                        </Form.Label>
                        <Col sm={9}>
                          <Form.Control
                            as={'textarea'}
                            rows={3}
                            type='text'
                            placeholder='Enter comments'
                            value={comments}
                            onChange={(e) => setComments(e.target.value)}
                          ></Form.Control>
                        </Col>
                      </Form.Group>
                      <Button
                        type='submit'
                        variant='primary'
                        style={{ margin: '2%' }}
                      >
                        Submit
                      </Button>
                    </Form>
                  )}
                </Row>
              </>
            )}
          </Container>
        )}
      </Container>
    </>
  );
}

export default SubmissionDetailsScreen;
