import React, { useState } from 'react';
import { Form, Button, Container } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import { useNavigate, useParams } from 'react-router-dom';
import Loader from '../components/Loader';
import axios from 'axios';

function FileUploadScreen() {
  const [uploading, setUploading] = useState(false);
  const { id, title } = useParams();
  let navigate = useNavigate();

  const uploadFileHandler = async (e) => {
    const file = e.target.files[0];
    const formData = new FormData();

    formData.append('image', file);
    formData.append('classroom', id);
    formData.append('title', title);

    setUploading(true);

    try {
      const config = {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      };

      const {  status } = await axios.post(
        '/api/upload',
        formData,
        config
      );

      setUploading(false);
      if (status === 200) {
        navigate(`/classroom/${id}`);
      }
    } catch (error) {
      setUploading(false);
    }
  };

  const handleSkip = (e) => {
    navigate(`/classroom/${id}`);
  };

  return (
    <Container>
      <Form>
        <Form.Group controlId='image'>
          <Form.Label>Upload file</Form.Label>

          <Form.Control
            label='Choose File'
            type='file'
            onChange={uploadFileHandler}
          ></Form.Control>
          {uploading && <Loader />}
        </Form.Group>

        <Button type='primary' onClick={handleSkip}>
          Skip
        </Button>
      </Form>
    </Container>
  );
}

export default FileUploadScreen;
