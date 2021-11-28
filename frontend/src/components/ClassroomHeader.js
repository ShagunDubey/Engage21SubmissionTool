import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Navbar from 'react-bootstrap/Navbar';
import { Nav, Container, Card } from 'react-bootstrap';
import {
  deleteClassroom,
  leaveClassroom,
} from '../store/actions/classroomActions';
import { useParams, useNavigate, useLocation, Link } from 'react-router-dom';

const styles = {
  card: {
    backgroundColor: '#01172f',
    borderRadius: 30,
    padding: '5rem',
    width: '100%',
    color: 'white',
  },
  navbar: {
    backgroundColor: '#6184d8',
  },
  cardHeader: {
    backgroundColor: 'white',
    color: 'black',
  },
  link: {
    color: '#FFF',
  },
};

function ClassroomHeader({ classroom }) {
  const userLogin = useSelector((state) => state.userLogin);
  const dispatch = useDispatch();
  const { userInfo } = userLogin;
  const is_teacher = userInfo.user.is_teacher;

  let location = useLocation();
  const redirect = location.search ? location.search.split('=')[1] : '/';
  let { id } = useParams();
  let navigate = useNavigate();
  function handleDelete(e) {
    if (
      is_teacher &&
      window.confirm('Are you sure you want to delete this classroom?')
    ) {
      dispatch(deleteClassroom(id)).then((status) => {
        if (status === 200) {
          navigate(redirect);
        }
      });
    } else if (
      window.confirm('Are you sure you want to leave the classroom?')
    ) {
      dispatch(leaveClassroom(id)).then((status) => {
        if (status === 200) {
          navigate(redirect);
        }
      });
    }
  }

  return (
    <Container>
      <Navbar
        collapseOnSelect
        expand='lg'
        variant='light'
        style={styles.navbar}
      >
        <Container>
          <Navbar.Toggle aria-controls='responsive-navbar-nav' />
          <Navbar.Collapse id='responsive-navbar-nav'>
            <Nav className='me-auto'>
              <Navbar.Text>
                <Link to={`/classroom/${classroom.id}`} style={styles.link}>
                  Classroom Activity
                </Link>

              </Navbar.Text> 
              &nbsp;&nbsp;
              <Navbar.Text>
                <Link
                  to={`/classroom/${classroom.id}/students`}
                  style={styles.link}
                >
                  Student List
                </Link>
              </Navbar.Text>
              {is_teacher && (
                <Nav.Link>
                  <Link
                    to={`/classroom/${classroom.id}/create`}
                    style={styles.link}
                  >
                    Create Assignment
                  </Link>
                </Nav.Link>
              )}
            </Nav>
            <Nav>
              <Nav.Link
                style={{ backgroundColor: '#db4b4b' }}
                onClick={(e) => handleDelete(e)}
              >
                {is_teacher ? 'Delete Classroom' : 'Leave Classroom'}
              </Nav.Link>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
      <br />
      <Card style={styles.card}>
        <Card.Header as={'h1'} style={styles.cardHeader}>
          {classroom.name}
        </Card.Header>
        <Card.Body as={'h4'}>
          <blockquote className='blockquote mb-0'>
            <p>
              Total strength:
              {classroom.students ? classroom.students.length : 0}
            </p>
            <footer>
              Faculty:
              {classroom.teacher && classroom.teacher.username}
            </footer>
          </blockquote>
        </Card.Body>
      </Card>
    </Container>
  );
}

export default ClassroomHeader;
