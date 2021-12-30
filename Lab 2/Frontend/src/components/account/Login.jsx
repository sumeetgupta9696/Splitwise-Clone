import React, { useState } from 'react';
import { Redirect } from 'react-router';
import { useDispatch, useSelector } from 'react-redux';
import { Row, Col } from 'react-bootstrap';
import NavBar from '../landing/NavBar';
import { userLogin } from '../../actions/account/loginUserAction';
import SplitwiseImage from '../../images/logo.svg';

export default function Login() {
  const [inputs, setInputs] = useState({
    email: '',
    password: '',
  });
  const user = useSelector((state) => state.login.user);
  const dispatch = useDispatch();

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(userLogin(inputs));
  };

  const onChange = (e) => {
    const { name, value } = e.target;
    setInputs((input) => ({ ...input, [name]: value }));
  };
  let redirectVar = null;
  let message = '';
  if (user && user.idToken) {
    localStorage.setItem('name', user.name);
    localStorage.setItem('email', user.email);
    localStorage.setItem('idToken', user.idToken);
    redirectVar = <Redirect to="/home" />;
  } else if (user && user.message === 'USER_DOES_NOT_EXIST') {
    message = 'User Does Not Exists';
  } else if (user && user.message === 'INCORRECT_PASSWORD') {
    message = 'Incorrect Password';
  }
  return (
    <div>
      {redirectVar}
      <NavBar />
      <div>
        <Row>
          <Col xs md="1">{'\u00A0'}</Col>
          <Col className="mt-5">
            <img src={SplitwiseImage} className="img-fluid rounded float-right" style={{ height: 200, width: 200 }} alt="Splitwise" />
          </Col>
          <Col>
            <div>
              <div className="login-form">
                <div className="main-div">
                  <div className="panel mt-4">
                    <h2>WELCOME TO SPLITWISE</h2>
                  </div>
                  <br />
                  <form onSubmit={handleSubmit}>
                    <br />
                    <div className="form-group">
                      <input type="email" className="form-control" onChange={onChange} name="email" style={{ width: 300 }} placeholder="Email Id" title="Enter valid email address" required />
                    </div>
                    <div className="form-group">
                      <input type="password" className="form-control" onChange={onChange} name="password" style={{ width: 300 }} placeholder="Password" required />
                    </div>
                    <div style={{ color: '#ff0000' }}>{message}</div>
                    <br />
                    <button type="submit" className="btn btn-orange btn-large btn-primary" style={{backgroundColor: "#FF6337"}}>Login</button>
                    <br />
                    <br />
                  </form>
                </div>
              </div>
            </div>
          </Col>
          <Col xs lg="2">{'\u00A0'}</Col>
        </Row>
      </div>
    </div>
  );
}
