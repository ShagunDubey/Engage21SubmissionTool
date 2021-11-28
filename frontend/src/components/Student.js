import React from 'react';
import { Card, Container } from 'react-bootstrap';

const styles = {
  card: {
    backgroundColor: '#f4fffc',
    borderRadius: 30,
    padding: '1rem',
    marginTop: '1rem',
    width: '100%',
  },
  navbar: {
    backgroundColor: '#53a6bd',
  },
  cardHeader: {
    backgroundColor: '#b5f5cf', color: '#01172f'
  },
};

function Student({ student }) {
  return (
    <Container>
    <Card
      style={styles.card}
      text='dark'
      className='my-3 p-3 rounded'
    >
      <Card.Header style={styles.cardHeader}>Name: {student.username}</Card.Header>
      <Card.Body>
        Email: {student.email} <br />
        Department: {student.department}
      </Card.Body>
    </Card>
    </Container>
  );
}

export default Student;
