import React from 'react';
import { Card } from 'react-bootstrap';

import { Link } from 'react-router-dom';

function Submission({ submission }) {
  const submitted_at = new Date(submission.submitted_at);
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
  return (
    <Card style={styles.card} text='dark'>
      <Link to={`/submission/${submission.id}`} style={{ color: '#FFF' }}>
        <Card.Header as='h3' style={styles.cardHeader}>
          Submission time:&nbsp;
          {submitted_at.toLocaleTimeString('en-US', {
            hour: 'numeric',
            minute: 'numeric',
            hour12: true,
          })}
          &nbsp;
          {submitted_at.toLocaleDateString(undefined, options)}
        </Card.Header>
      </Link>
      <Card.Body>
        <Card.Text as='div'>
          <strong>Submitted by: {submission.student.username}</strong>
        </Card.Text>
        <Card.Text as='div'>
          <strong>{(submission.marks || submission.comments) ? <>Graded</> : <>Not graded yet</>}</strong>
        </Card.Text>
        <Link to={`/submission/${submission.id}`}>
          <Card.Text as='div'>
            <div className='my-3'>View details</div>
          </Card.Text>
        </Link>
      </Card.Body>
    </Card>
  );
}

export default Submission;
