import React, { useState } from 'react';
import {
  Modal, Button, Form, Row, Col,
} from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import addExpenseAction from '../../actions/bills/addExpenseAction';

export default function ExpenseModal(props) {
  const [inputs, setInputs] = useState({
    description: '',
    billAmount: '',
  });
  const expenseMessage = useSelector((state) => state.addExpenseReducer.message);
  const dispatch = useDispatch();

  const onChange = (e) => {
    const { name, value } = e.target;
    setInputs((input) => ({ ...input, [name]: value }));
  };

  const handleSave = () => {
    const data = {
      groupName: props.groupName,
      description: inputs.description,
      billAmount: inputs.billAmount,
    };
    dispatch(addExpenseAction(data));
    window.location.reload();
  };

  if (expenseMessage === 'BILL_CREATED') {
    props.handleClose();
  }

  return (
    <Modal show={props.show} onHide={props.handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>
          <Row>
            <Col>Add Expense</Col>
          </Row>
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form.Group as={Col}>
          <Form.Control
            type="text"
            name="description"
            placeholder="Enter a description"
            onChange={onChange}
          />
          &nbsp;
          <Form.Control
            name="billAmount"
            type="text"
            placeholder="$0.00"
            onChange={onChange}
          />
        </Form.Group>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={props.handleClose}>
          Cancel
        </Button>
        <Button variant="success" onClick={handleSave}>
          Save
        </Button>
      </Modal.Footer>
    </Modal>
  );
}
