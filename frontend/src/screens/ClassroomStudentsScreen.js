import React, { useEffect } from 'react';
import { Row, Container } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import Loader from '../components/Loader';
import Message from '../components/Message';
import { listClassroomDetails } from '../store/actions/classroomActions';
import ClassroomHeader from '../components/ClassroomHeader';
import Student from '../components/Student';
import { useParams } from 'react-router-dom';

function ClassroomStudentScreen() {
  const dispatch = useDispatch();
  let { id } = useParams();
  const classroomDetails = useSelector((state) => state.classroomDetails);
  const { loading, error, classroom } = classroomDetails;
  const students = classroom.students;
  useEffect(() => {
    dispatch(listClassroomDetails(id));
  }, [dispatch]);
  return (
    <>
      <ClassroomHeader classroom={classroom} />
      <Container>
        <h1 align='center'>Student List</h1>

        {loading ? (
          <Loader />
        ) : error ? (
          <>
            <Message variant='danger'>{error}</Message>
          </>
        ) : (
          <>
            {students &&
              students.map((student) => (
                <Row key={student.id}>
                  <Student student={student} />
                </Row>
              ))}
          </>
        )}
      </Container>
    </>
  );
}

export default ClassroomStudentScreen;
