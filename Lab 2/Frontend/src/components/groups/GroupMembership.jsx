import React from 'react';
import {
  Button, Card,
} from 'react-bootstrap';
import { Link } from 'react-router-dom';
import axios from 'axios';
import apiHost from '../../apiHost';

export default function GroupMembership(props) {
  const groupName = props.groupMembership;
  const onLeave = () => {
    axios.defaults.withCredentials = true;
    axios.defaults.headers.common.authorization = localStorage.getItem('idToken');
    axios.post(`${apiHost}/api/groups/leave`, groupName)
      .then((response) => response.data.message);
    window.location.reload();
  };
  return (
    <div>
      <Card className="m-2" style={{ width: '18rem' }}>
        <Card.Body>
          <Card.Title>{groupName}</Card.Title>
          <Link to={`/groupdetails/${groupName}`}>
            <Button style={{ 'background-color': '#5BC5A7' }} variant="light">Visit Group</Button>
          </Link>
          {'\u00A0'}
          {'\u00A0'}
          <Button style={{'background-color': '#FF6337'}} variant="light" onClick={onLeave}>Leave Group</Button>
        </Card.Body>
      </Card>
    </div>
  );
}
