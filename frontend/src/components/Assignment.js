import React from 'react';
import { Card } from 'react-bootstrap';

import { Link } from 'react-router-dom';

function Assignment({ assignment }) {
  const deadline = new Date(assignment.deadline);
  const created_at = new Date(assignment.created_at);
  const options = {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  };
  const styles = {
    card: {
      backgroundColor: '#f4fffc',
      borderRadius: 30,
      padding: '1rem',
      marginTop: '1rem',
      width: '100%',
    },
    cardHeader: {
      backgroundColor: '#b5f5cf',
      color: '#01172f',
    },
  };
  let deadline_text;
  if (assignment.deadline) {
    deadline_text =
      'Due on: ' +
      deadline.toLocaleDateString(undefined, options) +
      ' at ' +
      deadline.toLocaleTimeString('en-US', {
        hour: 'numeric',
        minute: 'numeric',
        hour12: true,
      });
  }
  else deadline_text = 'No deadline assigned.'
  return (
    <Card style={styles.card} text='dark'>
      <Link
        to={`/classroom/${assignment.classroom}/assignment/${assignment.id}`}
        style={{ color: '#FFF' }}
      >
        <Card.Header as='h3' style={styles.cardHeader}>
          {created_at.toLocaleTimeString('en-US', {
            hour: 'numeric',
            minute: 'numeric',
            hour12: true,
          })}
          &nbsp;
          {created_at.toLocaleDateString(undefined, options)}
        </Card.Header>
        <Card.Header style={{ backgroundColor: '#656256' }}>
          {assignment.title}
        </Card.Header>
      </Link>
      <Card.Body>
        <Card.Text as='div'>
          <strong>
            {/* Due on: {deadline.toLocaleDateString(undefined, options)} at &nbsp;
            {deadline.toLocaleTimeString('en-US', {
              hour: 'numeric',
              minute: 'numeric',
              hour12: true,
            })} */}
            {deadline_text}
          </strong>
        </Card.Text>
        <Card.Text as='div'>
          <strong>Points : {assignment.points}</strong>
        </Card.Text>
        <Link
          to={`/classroom/${assignment.classroom}/assignment/${assignment.id}`}
          style={{ color: '#01172f' }}
        >
          <Card.Text as='div'>
            <div className='my-3'>View</div>
          </Card.Text>
        </Link>
      </Card.Body>
    </Card>
  );
}

export default Assignment;
