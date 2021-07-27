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
      Username: "",
      Password: "",
      Email: "",
      Birthday: "",
      FavoriteMovies: [],
      validated: false
    };
  }

  componentDidMount() {
    const accessToken = localStorage.getItem('token');
    if (accessToken !== null) {
      this.getUser(accessToken);
    }
  }

  getUser(token) {
    const user = localStorage.getItem('user');
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };

    axios
      .get(`https://myflix-movieapi.herokuapp.com/users/${user}`, config)
      .then((res) => {

        this.setState({
          Username: res.data.Username,
          Password: res.data.Password,
          Email: res.data.Email,
          Birthday: res.data.Birthday,
          FavoriteMovies: res.data.FavoriteMovies,
        });
        console.log(res);
        console.log('User data is received!');
      })
      .catch((e) => {
        console.log('Error Retrieving User Data');
        console.log(e);
      });
  }

  // Adds input data to state
  handleInputChange = (e) => this.setState({ [e.target.name]: e.target.value });
  // Remove account and log out user, returning to loginView
  handleRemoveAccount = () => {
    const token = localStorage.getItem('token');
    const user = localStorage.getItem('user');

    axios
      .delete(`https://myflix-movieapi.herokuapp.com/users/${user}`, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((res) => {
        console.log(user + " has been deleted.");
        localStorage.removeItem("user");
        localStorage.removeItem("token");
        window.location.pathname = "/";

      })
      .catch((e) => console.log('error'));

  };

  handleUpdateAccount = (e) => {
    e.preventDefault();
    const form = e.currentTarget;
    if (form.checkValidity() === false) {
      e.preventDefault();
      e.stopPropagation();
    }
    // Credentials
    const user = localStorage.getItem('user');
    const token = localStorage.getItem('token');
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };

    axios
      .put(
        `https://myflix-movieapi.herokuapp.com/users/${user}`,
        {
          Username: this.state.Username,
          Password: this.state.Password,
          Email: this.state.Email,
          Birthday: this.state.Birthday
        },
        config
      )

      .then((res) => {

        const data = res.data;
        localStorage.setItem('user', data.Username);

        console.log(data);
        console.log(user + " has been updated.");
        console.log(res);
        //window.open('/', '_self');

      })

      .catch((e) => {
        console.log('Update Error');
        console.log(e);
        //console.log(e.res.data);
      });
    this.setState({
      validated: true,
    });
  };

  render() {
    const user = localStorage.getItem('user');
    const token = localStorage.getItem('token');
    if (!user) return null;

    return (
      <Row className="justify-content-md-center">
        <Col md={6} lg={4} className="profile-box bg-dark">
          <h1 className="title">Update your profile information!</h1>

          <Form noValidate validated={this.state.validated}>
            <Form.Group controlId="formUsername" >
              <Form.Label>Username:</Form.Label>
              <Form.Control type="text" name="Username" placeholder="New username" onChange={this.handleInputChange} required />
              <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
              <Form.Control.Feedback type="invalid"> Please choose a username. </Form.Control.Feedback>
            </Form.Group>

            <Form.Group controlId="formPassword" >
              <Form.Label>Password:</Form.Label>
              <Form.Control type="password" name="Password" placeholder="New password" onChange={this.handleInputChange} required minLength="5" />
              <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
              <Form.Control.Feedback type="invalid"> Please choose a valid password. (minimum length = 5)</Form.Control.Feedback>
            </Form.Group>

            <Form.Group controlId="formEmail" >
              <Form.Label>Email:</Form.Label>
              <Form.Control type="email" name="Email" placeholder="New email" onChange={this.handleInputChange} required />
              <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
              <Form.Control.Feedback type="invalid"> Please choose a valid Email address.</Form.Control.Feedback>
            </Form.Group>

            <Form.Group controlId="formBirthday" >
              <Form.Label>Birthday:</Form.Label>
              <Form.Control type="date" name="Birthday" placeholder="New birthday" onChange={this.handleInputChange} required />
              <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
              <Form.Control.Feedback type="invalid"> Please choose a valid date.</Form.Control.Feedback>
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