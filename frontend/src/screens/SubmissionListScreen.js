import React, { useEffect } from 'react';
import { Row, Col, Container, Button } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import Loader from '../components/Loader';
import Message from '../components/Message';
import Submission from '../components/Submission';
import { listSubmissions } from '../store/actions/submissionActions';
import { useParams, useNavigate } from 'react-router-dom';

function SubmissionListScreen() {
  const dispatch = useDispatch();
  let { id } = useParams();
  let navigate = useNavigate();
  const submissionList = useSelector((state) => state.submissionList);
  const { loading, error, submissions } = submissionList;
  useEffect(() => {
    dispatch(listSubmissions(id));
  }, [dispatch]);

  return (
    <>
      <Container>
        {loading ? (
          <Loader />
        ) : error ? (
          <Message variant='danger'>{error}</Message>
        ) : (
          <>
            <Row>
              <Col sm={8}>
                <Button onClick={() => navigate(-1)}>Go back</Button>
              </Col>
            </Row>

            {submissions.map((submission) => (
              <Row key={submission.id}>
                <Submission submission={submission} />
              </Row>
            ))}
            {submissions.length == 0 && (
              <h1 style={{ textAlign: 'center' }}>No submissions yet!</h1>
            )}
          </>
        )}
      </Container>
    </>
  );
}

export default SubmissionListScreen;
