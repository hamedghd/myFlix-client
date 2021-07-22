// Import components
import React from 'react';
import PropTypes from 'prop-types';

// Import styling
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
// Import routing
import axios from 'axios';
import { Link } from 'react-router-dom';
import './profile-view.scss'

export class ProfileView extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      userData: {},
      newUsername: '',
      newEmail: '',
      newPassword: '',
      newBirthday: '',
    };
  }

  componentDidMount() {
    const token = localStorage.getItem('token');
    if (token !== null) {
      this.getUser(token);
    }
  }

  getUser(token) {
    const username = localStorage.getItem('user');
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };

    axios
      .get(`https://myflix-movieapi.herokuapp.com/users/${username}`, config)
      .then((res) => {
        res.data.map((item) => {
          this.setState({
            userData: item,
          });
        });
      })
      .catch((e) => console.log('Error Retrieving User Data'));
  }

  // Adds input data to state
  handleInputChange = (e) => this.setState({ [e.target.name]: e.target.value });
  // Remove account and log out user, returning to loginView
  handleRemoveAccount = () => {
    const token = localStorage.getItem('token');
    const username = localStorage.getItem('user');

    axios
      .delete(`https://myflix-movieapi.herokuapp.com/users/${username}`, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((res) => {
        console.log('account deleted');
        this.props.onLoggedOut();
      })
      .catch((e) => console.log('error'));

  };

  handleUpdateAccount = (e) => {
    e.preventDefault();

    // Credentials
    const username = localStorage.getItem('user');
    const token = localStorage.getItem('token');

    // Form Data
    const { newUsername, newPassword, newEmail, newBirthday } = this.state;

    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };

    axios
      .put(
        `https://myflix-movieapi.herokuapp.com/users/${username}`,
        {
          Username: newUsername,
          Password: newPassword,
          Email: newEmail,
          Birthday: newBirthday,
        },
        config
      )

      .then((res) => {
        console.log('Account Updated');
        window.open('/', '_self');
        //this.props.handleUpdateAccount();
        const data = res.data;
        this.props.onLoggedIn(data);
      })
      //.catch((e) => console.log('Update Error'));
      .catch((e) => console.log(e));
  };

  render() {
    const { userData } = this.state;
    if (!userData) return null;

    return (
      <Row className="justify-content-md-center">
        <Col md={6} lg={4} className="profile-box bg-dark">
          <h1 className="title">Update your profile information!</h1>

          <Form className="">
            <Form.Group controlId="formUsername" >
              <Form.Label>Username:</Form.Label>
              <Form.Control type="text" placeholder="New username" onChange={this.handleInputChange} required />
            </Form.Group>

            <Form.Group controlId="formPassword" >
              <Form.Label>Password:</Form.Label>
              <Form.Control type="password" placeholder="New password" onChange={this.handleInputChange} required minLength="5" />
            </Form.Group>

            <Form.Group controlId="formEmail" >
              <Form.Label>Email:</Form.Label>
              <Form.Control type="email" placeholder="New email" onChange={this.handleInputChange} required />
            </Form.Group>

            <Form.Group controlId="formBirthday" >
              <Form.Label>Birthday:</Form.Label>
              <Form.Control type="date" placeholder="New birthday" onChange={this.handleInputChange} required />
            </Form.Group>

            <Button className="button-style" variant="primary" type="submit" onClick={this.handleUpdateAccount}>
              Update
            </Button>
          </Form>
          <small className="text-light text-center">
            Or you can{' '}
            <Link to="/">
              <span
                className="register text-primary"
                onClick={this.handleRemoveAccount}
              >
                remove your account
              </span>
            </Link>
          </small>
        </Col>
      </Row>
    );
  }
}

ProfileView.propTypes = {
  user: PropTypes.string.isRequired
};