/* eslint-disable max-len */
/* eslint-disable react/no-access-state-in-setstate */
/* eslint-disable array-callback-return */
import React, { Component } from 'react';
import {
  Row, Col, ListGroup, DropdownButton, Dropdown,
} from 'react-bootstrap';
import axios from 'axios';
import NavBar from '../landing/NavBar';
import apiHost from '../../apiHost';
import Paginate from "./Paginate";

class RecentActivity extends Component {
  constructor(props) {
    super(props);
    this.state = {
      activities: [],
      groupList: [],
      order: 'NEWEST',
      currentPage:1,
      postPerPage:2,
      currentPosts:[]
    };
    this.getRecentActivity();
  }

  getRecentActivity = async () => {
    axios.defaults.withCredentials = true;
    axios.defaults.headers.common.authorization = localStorage.getItem('idToken');
    axios.get(`${apiHost}/api/profile/recentactivity`)
      .then((response) => {
        console.log("inside response");
        if (response.data) {
          console.log(response.data);
          this.setState({
            activities: response.data,
            filteractivites: response.data,
          });
        }
      }).catch((err) => {
        console.log(err);
      });
  }
  
  paginate = (number) => {
    this.setState({currentPage:number});
  }

  posts=(number)=>{
    console.log("posts",number.target.value);
    this.setState({postPerPage:number.target.value});
  }

  render() {
    console.log("currentpage", this.state.currentPage)
    const activityElements = [];
    const groupFilter = new Set();
    const activities=this.state.activities;
    const postPerPage= this.state.postPerPage;
    const postspage= new Set();
    postspage.add(<Dropdown.Item as="button" value="2" onClick={this.posts}>2</Dropdown.Item>)
    postspage.add(<Dropdown.Item as="button" value="5" onClick={this.posts}>5</Dropdown.Item>)
    postspage.add(<Dropdown.Item as="button" value="10" onClick={this.posts}>10</Dropdown.Item>)


    if(typeof activities.bills==="object"){
      let indexOfLastPost = this.state.currentPage * this.state.postPerPage;
      const indexOfFirstPost = indexOfLastPost - postPerPage
      if (indexOfLastPost > activities.bills.length){
          indexOfLastPost = activities.bills.length
      }
      this.state.currentPosts = activities.bills.slice(indexOfFirstPost, indexOfLastPost)
    }

    return (
      <div>
        <NavBar />
        <Row className="mt-5">
          <Col md={{ span: 2, offset: 1 }}>
          </Col>
          <Col md={{ span: 6 }}>
            <Row>
              <Col>
                <h2>Recent Activity</h2>
              </Col>
              <Col className="p-0" md={2} style={{ display: 'flex', justifyContent: 'flex-end' }}>
                <DropdownButton
                  variant="info"
                  menuAlign="right"
                  title="Post/Page"
                  id="dropdown-menu-align-right"
                >
                  {postspage}
                </DropdownButton>
              </Col>
            </Row>
            <Row>
              <ListGroup variant="flush" style={{ width: "100%" }}>
                {activities && typeof activities.bills === "object" ? (
                  <ul className="list-group">
                    {this.state.currentPosts.map((bill) => (
                      <li>
                        <div style={{border:"2"}}>
                          {bill.paidby} has paid ${bill.billAmount} on date{" "}
                          {bill.date} for {bill.description}
                        </div>
                      </li>
                    ))}
                  </ul>
                ) : null}
              </ListGroup>
            </Row>
          </Col>
        </Row>
        <Row>
        <Col style={{marginLeft:"300px", marginTop:"50px"}}>
        <Paginate postPerPage={postPerPage} totalPost={typeof activities.bills ==="object" ? activities.bills.length : 0 } paginate={this.paginate} />
        </Col>
        </Row>
      </div>
    );
  }
}
export default RecentActivity;
