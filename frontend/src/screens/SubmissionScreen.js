import React, { useState } from 'react';
import { Row, Col, Container, Button, Form } from 'react-bootstrap';
import { useDispatch } from 'react-redux';
import { createSubmission } from '../store/actions/submissionActions';
import { useParams, useNavigate } from 'react-router-dom';

function SubmissionScreen() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  let { id_assignment } = useParams();
  const [answer_text, setAnswerText] = useState('');
  const [answer_file, setAnswerFile] = useState(null);

  const handleSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData();

    formData.append('answer_text', answer_text);
    formData.append('answer_file', answer_file);
    formData.append('assignment', id_assignment);
    dispatch(createSubmission(id_assignment, formData)).then((status) => {
      if (status === 200) {
        navigate(`/assignment/${id_assignment}/submissions`);
      }
    });
  };

  return (
    <>
      <Container>
        <Row>
          <Col sm={8}>
            <Button onClick={() => navigate(-1)}>Go back</Button>
          </Col>
        </Row>
        <br />

        <Container>
          <Form
            onSubmit={handleSubmit}
            style={{
              backgroundColor: '#d4ba9b',
              padding: '2%',
              borderRadius: '20px',
            }}
          >
            <Form.Group as={Row} controlId='answer_file'>
              <Form.Label column sm={3}>
                Upload file
              </Form.Label>
              <Col sm={9}>
                <Form.Control
                  label='Choose File'
                  type='file'
                  onChange={(e) => setAnswerFile(e.target.files[0])}
                ></Form.Control>
              </Col>
            </Form.Group>

            <Form.Group controlId='answer_text' as={Row} style={{marginTop:'1%'}}>
              <Form.Label column sm={3}>
                Answer text:
              </Form.Label>
              <Col sm={9}>
                <Form.Control
                  as={'textarea'}
                  rows={5}
                  value={answer_text}
                  type='text'
                  onChange={(e) => setAnswerText(e.target.value)}
                ></Form.Control>
              </Col>
            </Form.Group>
            <div style={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                padding: '2%',
              }}>
              <Button
                variant='primary'
                type='submit'
                style={{ marginTop: '2%' }}
              >
                Submit answer
              </Button>
            </div>
          </Form>
        </Container>
      </Container>
    </>
  );
}

export default SubmissionScreen;
