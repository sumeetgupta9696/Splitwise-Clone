import React, { useState } from 'react';
import {
  Modal, Button, Form, Row, Col,
} from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import axios from 'axios';
import apiHost from '../../apiHost';
import addExpenseAction from '../../actions/bills/addExpenseAction';

export default function AddCommentModal(props) {
  const [inputs, setInputs] = useState({
    comment: ''
  });
  // const commentMessage = useSelector((state) => state.addExpenseReducer.message);
  // const dispatch = useDispatch();

  const onChange = (e) => {
    const { name, value } = e.target;
    setInputs((input) => ({ ...input, [name]: value }));
  };

  const handleSave = () => {
    const data = {
      billid: props.billname,
      comment: inputs.Comment,
    };
    axios.defaults.withCredentials = true;
    axios.defaults.headers.common.authorization = localStorage.getItem('idToken');
    console.log("------data------", data);
    axios.post(`${apiHost}/api/bills/addcomment`,data)
    .then((response) => {
      console.log("inside response");
      // const commentMessage = 'COMMENT_CREATED';
      props.handleClose();
      window.location.reload();
    })
  };

  // if (commentMessage === 'COMMENT_CREATED') {
  // }

  return (
    <Modal show={props.show} onHide={props.handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>
          <Row>
            <Col>Add Comment</Col>
          </Row>
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form.Group as={Col}>
          <Form.Control
            type="text"
            name="Comment"
            placeholder="Enter comment"
            onChange={onChange}
          />
          {/* &nbsp; */}
          {/* <Form.Control
            name="billAmount"
            type="text"
            placeholder="By User"
            onChange={onChange}
          /> */}
        </Form.Group>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={props.handleClose}>
          Cancel
        </Button>
        <Button variant="success" onClick={handleSave}>
          Add
        </Button>
      </Modal.Footer>
    </Modal>
  );
}
