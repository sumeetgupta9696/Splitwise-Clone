import React from 'react';
import { Redirect } from 'react-router';
import {
  Jumbotron, Container, Col, Row,
} from 'react-bootstrap';
import { Link } from 'react-router-dom';
import NavBar from './NavBar';
import '../../App.css';
import splitimage from "../../images/logo.png";

export default function LandingPage() {
  return (
    <div>
      <div>
        <NavBar />
        <div>
          <Row>
            <Col md={{ span: 6, offset: 1 }}>
              <Jumbotron style={{ zIndex: 10, background: 'none' }} fluid>
                <Container>
                  <h1 style={{'text-align': 'center', 'font-size': '45px', marginLeft : '30%'}}>
                  <img src={splitimage} width="100" height="auto" className="d-inline-block align-top" alt="Splitwise" />Splitwise landing page</h1>
                  <br />
                  <Link to="/signup" className="btn btn-info" style={{ marginLeft:"55%"}}>Go to Sign up</Link>
                </Container>
              </Jumbotron>
            </Col>
          </Row>
        </div>
      </div>
    </div>
  );
}
