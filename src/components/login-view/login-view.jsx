import React, { useState } from 'react';
import PropTypes from 'prop-types';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

import './login-view.scss';
export function LoginView(props) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(username, password);
    /* Send a request to the server for authentication */
    /* then call props.onLoggedIn(username) */
    props.onLoggedIn(username);
  };

  const handleRegister = () => {
    let register = false;
    props.onRegister(register);

  }

  return (
    <Row className="justify-content-md-center">
      <Col md={6} lg={4} className="login-style">
        <h1 className="title">Log in to myFlix!</h1>
        <Form>
          <Form.Group controlId="formUsername">
            <Form.Label>Username:</Form.Label>
            <Form.Control type="text" onChange={e => setUsername(e.target.value)} />
          </Form.Group>

          <Form.Group controlId="formPassword">
            <Form.Label>Password:</Form.Label>
            <Form.Control type="password" onChange={e => setPassword(e.target.value)} />
          </Form.Group>

          <Button className="button-style" variant="primary" type="submit" onClick={handleSubmit}>
            Submit
          </Button>
        </Form>

        <Form.Text className="text-light">Don't have an account?</Form.Text>
        <Button className="button-style" variant="primary" type="submit" onClick={handleRegister}>
          Sign up!
        </Button>
      </Col>
    </Row>
  );
}
LoginView.propTypes = {
  user: PropTypes.shape({
    Username: PropTypes.string.isRequired,
    Password: PropTypes.string.isRequired
  }),
  onLoggedIn: PropTypes.func.isRequired,
  onRegister: PropTypes.func.isRequired
};