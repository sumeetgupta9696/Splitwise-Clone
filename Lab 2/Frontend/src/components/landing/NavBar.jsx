import React, { Component } from 'react';
import {
  Navbar, Nav, Dropdown, Col,
} from 'react-bootstrap';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import splitwiseLogo from '../../images/splitwise.svg';
import { userLogout } from '../../actions/account/loginUserAction';

class NavBar extends Component {
  constructor() {
    super();
    this.state = {
      name: localStorage.getItem('name'),
    };
    document.title = 'Splitwise';
  }

  // handle logout to destroy the cookie
  handleLogout = () => {
    localStorage.removeItem('idToken');
    localStorage.removeItem('name');
    localStorage.removeItem('email');
    this.props.userLogout();
  };

  render() {
    let navUser = null;
    let nameDropDown = null;
    // let navLocation = null;
    nameDropDown = (
      <Dropdown>
        <Dropdown.Toggle style={{'background-color': '#FF6337'}} id="dropdown-basic">
          &nbsp;
          {this.state.name}
        </Dropdown.Toggle>

        <Dropdown.Menu>
          <Dropdown.Item><Link to="/profile" className="nav-link">Profile Page</Link></Dropdown.Item>
          <Dropdown.Item><Link to="/newgroup" className="nav-link">Create Group</Link></Dropdown.Item>
          <Dropdown.Item><Link to="/groups" className="nav-link">My Groups</Link></Dropdown.Item>
          <Dropdown.Item><Link to="/recentactivity" className="nav-link">Recent Activity</Link></Dropdown.Item>
          <Dropdown.Item><Link to="/" className="nav-link" onClick={this.handleLogout}>Log out</Link></Dropdown.Item>
        </Dropdown.Menu>
      </Dropdown>
    );

    if (localStorage.getItem('idToken')) {
      // navLocation = '/home';
      navUser = (
        <div className="collapse navbar-collapse navbar-right" id="navbarNav">
          <Navbar.Brand>
            <Link to="/home">
              <img src={splitwiseLogo} width="100" height="auto" className="d-inline-block align-top" alt="Splitwise" />
            </Link>
          </Navbar.Brand>
          <Nav className="mr-auto" />
          <Nav.Item><Nav.Link>{nameDropDown}</Nav.Link></Nav.Item>
        </div>
      );
    } else {
      // navLocation = '/';
      navUser = (
        <div className="collapse navbar-collapse navbar-right" id="navbarNav">
          <Navbar.Brand>
            <Link to="/">
              <img src={splitwiseLogo} width="100" height="auto" className="d-inline-block align-top" alt="Splitwise" />
            </Link>
          </Navbar.Brand>
          <Nav className="mr-auto" />
          <Nav.Item className="btn" style={{'background-color': '#FF6337',"margin-right": "15px","border-radius": "5px"}} variant="light"><Link to="/login">&nbsp;Login</Link></Nav.Item>
          <Nav.Item className="btn" style={{'background-color': '#FF6337',"margin-right": "15px","border-radius": "5px"}} variant="light"><Link to="/signup">&nbsp;Sign Up</Link></Nav.Item>
        </div>
      );
    }

    return (
      <div>
        <Navbar style={{ 'background-color': '#5BC5A7' }} variant="light">
          <Col xs lg="1">
            {'\u00A0'}
          </Col>
          {navUser}
          <Col xs lg="1">
            {'\u00A0'}
          </Col>
        </Navbar>
      </div>
    );
  }
}
export default connect(null, { userLogout })(NavBar);
