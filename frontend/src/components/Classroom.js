import React from 'react';
import { Card } from 'react-bootstrap';
import { Link } from 'react-router-dom';

function Classroom({ classroom }) {
  return (
    <Card
      style={{ flex: 1, backgroundColor: '#48a897' }}
      text='light'
      className='my-3 p-3 rounded'
    >
      <Link to={`/classroom/${classroom.id}`} style={{ color: '#FFF' }}>
        <Card.Header as='h3' style={{ backgroundColor: '#abd6d0' }}>
          Name: {classroom.name}
        </Card.Header>
      </Link>
      <Card.Body>
        <Card.Text as='h3'> Teacher: {classroom.teacher.first_name} </Card.Text>
        <Card.Text as='h6'>
          <strong>
            Classroom strength: {classroom.students.length}
          </strong>
        </Card.Text>
        <Link to={`/classroom/${classroom.id}`} style={{ color: '#FFF' }}>
          <Card.Text as='div'>
            <div className='my-3'>View</div>
          </Card.Text>
        </Link>
      </Card.Body>
    </Card>
  );
}

export default Classroom;
