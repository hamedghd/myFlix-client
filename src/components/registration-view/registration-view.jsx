import React, { useState } from 'react';
import PropTypes, { instanceOf } from 'prop-types';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { Link } from 'react-router-dom';
import axios from 'axios';

import './registration-view.scss';

export function RegistrationView(props) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [email, setEmail] = useState('');
  const [birthday, setBirthday] = useState('');
  const [validated, setValidated] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [errorStatus, setErrorStatus] = useState('');
  const [errorResponse, setErrorResponse] = useState('');


  const handleSubmit = (event) => {
    event.preventDefault();
    const form = event.currentTarget;
    if (form.checkValidity() === false) {
      event.preventDefault();
      event.stopPropagation();
    }
    /* Send a request to the server for authentication */
    axios.post('https://myflix-movieapi.herokuapp.com/users', {
      Username: username,
      Password: password,
      Email: email,
      Birthday: birthday,
    })
      .then((response) => {
        console.log('response:');
        console.log(response.data);
        window.open('/', '_self'); // the second argument '_self' is necessary so that the page will open in the current tab

      })
      .catch((event) => {
        console.log('error');
        console.log(event.response);
        console.log(event.response.request.response);
        setErrorStatus(event.response.request.status);
        setErrorMessage(event.response.request.statusText);
        setErrorResponse(event.response.request.response);

      });
    setValidated(true);
  };

  return (
    <Row className="justify-content-md-center">
      <Col md={6} lg={4} className="registration-style bg-dark">
        <h1 className="title">Sign up to myFlix!</h1>
        <Form noValidate validated={validated}>
          <Form.Group controlId="formUsername" >
            <Form.Label>Username:</Form.Label>
            <Form.Control name="Username" type="text" onChange={e => setUsername(e.target.value)} minLength="5" pattern="[a-zA-Z0-9]+" required />
            <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
            <Form.Control.Feedback type="invalid"> Please choose an alphanumeric username. </Form.Control.Feedback>
          </Form.Group>

          <Form.Group controlId="formPassword">
            <Form.Label>Password:</Form.Label>
            <Form.Control name="Password" type="password" onChange={e => setPassword(e.target.value)} minLength="5" required />
            <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
            <Form.Control.Feedback type="invalid"> Please choose a valid password. (minimum length = 5)</Form.Control.Feedback>
          </Form.Group>

          <Form.Group controlId="formEmail">
            <Form.Label>Email:</Form.Label>
            <Form.Control name="Email" type="email" onChange={e => setEmail(e.target.value)} required />
            <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
            <Form.Control.Feedback type="invalid"> Please choose a valid Email address.</Form.Control.Feedback>
          </Form.Group>

          <Form.Group controlId="formBirthday">
            <Form.Label>Birthday:</Form.Label>
            <Form.Control name="Birthday" type="date" onChange={e => setBirthday(e.target.value)} required />
            <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
            <Form.Control.Feedback type="invalid"> Please choose a valid date.</Form.Control.Feedback>
          </Form.Group>

          <Button className="button-style" variant="primary" type="submit" onClick={handleSubmit}>
            Submit
          </Button>
        </Form>
        {errorMessage &&
          <div>
            <Form.Text className="error-style">Error status: {errorStatus} : {errorMessage}</Form.Text>
            <Form.Text className="error-style">{errorResponse}</Form.Text>
          </div>
        }
      </Col>
    </Row>
  );
}

RegistrationView.propTypes = {
  register: PropTypes.shape({
    Username: PropTypes.string.isRequired,
    Password: PropTypes.string.isRequired,
    Email: PropTypes.string.isRequired,
    Birthdate: PropTypes.string.isRequired
  }),
};