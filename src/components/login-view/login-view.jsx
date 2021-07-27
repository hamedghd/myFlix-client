import React, { useState } from 'react';
import PropTypes from 'prop-types';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import axios from 'axios';
import { Link } from 'react-router-dom';

import './login-view.scss';
export function LoginView(props) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [validated, setValidated] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    const form = e.currentTarget;
    if (form.checkValidity() === false) {
      e.preventDefault();
      e.stopPropagation();
    }
    console.log(username, password);
    /* Send a request to the server for authentication */
    axios.post('https://myflix-movieapi.herokuapp.com/login', {
      Username: username,
      Password: password
    })
      /* then call props.onLoggedIn(username) */
      .then(response => {
        const data = response.data;
        props.onLoggedIn(data);
      })
      .catch(e => {
        console.log('No such user!');
        alert('User or password is incorrect!');
        console.error(e);
      });
    setValidated(true);

  };

  return (
    <Row className="justify-content-md-center">
      <Col md={6} lg={4} className="login-style d-flex flex-column align-items-center text-center bg-dark p-2">
        <h1 className="title">Log in to myFlix!</h1>
        <Form noValidate validated={validated}>
          <Form.Group controlId="formUsername">
            <Form.Label>Username:</Form.Label>
            <Form.Control type="text" onChange={e => setUsername(e.target.value)} required />
            <Form.Control.Feedback type="invalid"> Please insert your username. </Form.Control.Feedback>
          </Form.Group>

          <Form.Group controlId="formPassword">
            <Form.Label>Password:</Form.Label>
            <Form.Control type="password" onChange={e => setPassword(e.target.value)} required />
            <Form.Control.Feedback type="invalid"> Please insert your password.</Form.Control.Feedback>
          </Form.Group>

          <Button className="button-style" variant="primary" type="submit" onClick={handleSubmit}>
            Submit
          </Button>
        </Form>

        <Form.Text className="text-light">Don't have an account?</Form.Text>
        <Link to={`/register`}>
          <Button className="button-style" variant="primary" type="submit">
            Sign up!
          </Button>
        </Link>
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
};