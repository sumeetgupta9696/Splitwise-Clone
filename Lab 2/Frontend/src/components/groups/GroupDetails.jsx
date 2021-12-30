import React, { useEffect, useState } from "react";
import { Row, Col, Button, ListGroup } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router";
import NavBar from "../landing/NavBar";
import ExpenseModal from "../bills/ExpenseModal";
import AddCommentModal from "../bills/AddCommentModal";
import getGroupDetails from "../../actions/groups/groupDetailsActions";

export default function GroupDetails() {
  const [showExpenseModal, setShowExpenseModal] = useState(false);
  const [showAddCommentModal, setAddCommentModal] = useState(false);
  const groupDetails = useSelector(
    (state) => state.getGroupDetailsReducer.groupDetails
  );
  const params = useParams();
  const dispatch = useDispatch();
  console.log(groupDetails);
  useEffect(() => {
    dispatch(getGroupDetails(params.groupName));
  }, [dispatch, params.groupName]);
  return (
    <div>
      <NavBar />
      <div>
        <Row className="mt-5">
          <Col md={{ span: 2, offset: 1 }}>&nbsp;</Col>
          <Col md={{ span: 6 }} className="mx-2">
            <Row>
              <h2>{params.groupName}</h2>
              <Col style={{ display: "flex", justifyContent: "flex-end" }}>
                <ExpenseModal
                  show={showExpenseModal}
                  handleClose={() => setShowExpenseModal(false)}
                  groupName={params.groupName}
                />
                <Button
                  variant="success"
                  onClick={() => setShowExpenseModal(true)}
                >
                  Add Expense
                </Button>
              </Col>
            </Row>
            &nbsp;
            <Row>
              <ListGroup variant="flush" style={{ width: "100%" }}>
                {groupDetails && typeof groupDetails.bills === "object" ? (
                  <ul className="list-group">
                    {groupDetails.bills.map((bill) => (
                      <li>
                        <div style={{border:"2", fontSize:"30px"}}>
                          {bill.paidby} has added ${bill.billAmount} on date{" "}
                          {bill.date} for {bill.description}
                          {bill.comments.map((com) =>(
                            <ul style={{fontSize:"20px"}}>{com.name} has commented {com.comment}</ul>
                          ))

                          }
                        </div>
                        <AddCommentModal
                  show={showAddCommentModal}
                  handleClose={() => setAddCommentModal(false)}
                  billname={bill._id}
                />
                        <Button
                  variant="dark"
                  onClick={() => setAddCommentModal(true)}
                >
                  Add Comment
                </Button>

                      </li>
                    ))}
                  </ul>
                ) : null}
              </ListGroup>
            </Row>
          </Col>
          <Col md={{ span: 2 }}>
            {/* <RightSidebar
              key={this.state.group_name}
              groupName={this.state.group_name}
              updateChild={this.state.updateChild}
              onUpdateChild={this.onUpdateChild}
            /> */}
          </Col>
        </Row>
      </div>
    </div>
  );
}
