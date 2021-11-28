import React, { useEffect } from 'react';
import { Row, Container } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import Loader from '../components/Loader';
import Message from '../components/Message';
import Assignment from '../components/Assignment';
import { listClassroomDetails } from '../store/actions/classroomActions';
import { listAssignments } from '../store/actions/assignmentActions';
import ClassroomHeader from '../components/ClassroomHeader';
import { useParams } from 'react-router-dom';

function ClassroomScreen() {
  const dispatch = useDispatch();
  let { id } = useParams();
  const classroomDetails = useSelector((state) => state.classroomDetails);
  const assignmentList = useSelector((state) => state.assignmentList);
  const { loading, error, classroom } = classroomDetails;
  const { loading1, error1, assignments } = assignmentList;
  useEffect(() => {
    dispatch(listClassroomDetails(id));
    dispatch(listAssignments(id));
  }, [dispatch]);
  return (
    <>
      <ClassroomHeader classroom={classroom} />
      <Container>
        {(loading1 || loading) ? (
          <Loader />
        ) : (error || error1) ? (
          <Message variant='danger'>{error}</Message>
        ) : (
          <>
            {assignments.map((assignment) => (
              <Row key={assignment.id}>
                <Assignment assignment={assignment} />
              </Row>
            ))}
          </>
        )}
      </Container>
    </>
  );
}

export default ClassroomScreen;
