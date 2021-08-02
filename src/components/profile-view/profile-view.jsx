// Import components
import React from 'react';
import PropTypes from 'prop-types';
import { MovieCard } from '../movie-card/movie-card';

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
      //user: {},
      Username: "",
      Password: "",
      Email: "",
      Birthday: "",
      FavoriteMovies: [],
      validated: false,
      errorMessage: '',
      errorStatus: '',
      errorResponse: '',
    };
  }

  componentDidMount() {
    const accessToken = localStorage.getItem('token');
    if (accessToken !== null) {
      this.getUser(accessToken);
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
  handleInputChange = (e) => {
    this.setState({ [e.target.name]: e.target.value });
    //console.log(e.target.name);
    /*console.log(e.target.value);*/
  };
  // Remove account and log out user, returning to loginView
  handleRemoveAccount = () => {
    const token = localStorage.getItem('token');
    const username = localStorage.getItem('user');

    axios
      .delete(`https://myflix-movieapi.herokuapp.com/users/${username}`, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((res) => {
        console.log(username + " has been deleted.");
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
    const username = localStorage.getItem('user');
    const token = localStorage.getItem('token');

    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };

    if (this.state.Username != username) {
      console.log('Username is different.');
      axios
        .post(
          `https://myflix-movieapi.herokuapp.com/users`,
          {
            Username: this.state.Username,
            Password: this.state.Password,
            Email: this.state.Email,
            Birthday: this.state.Birthday,
            FavoriteMovies: this.state.FavoriteMovies,
          },
          config
        )

        .then((res) => {

          const data = res.data;
          //localStorage.setItem('user', data.Username);
          console.log(username + " has been updated.");
          console.log(res.data);
          //window.open('/', '_self');
        })

        .catch((error) => {
          console.log('Update Error');
          console.log(error);
          console.log(error.response);
          this.setState({ errorStatus: error.response.request.status });
          this.setState({ errorMessage: error.response.request.statusText });
          this.setState({ errorResponse: error.response.request.response });
        });
      this.setState({
        validated: true,
      });
      axios
        .delete(`https://myflix-movieapi.herokuapp.com/users/${username}`, {
          headers: { Authorization: `Bearer ${token}` },
        })
        .then((res) => {
          console.log(username + " has been deleted.");
          localStorage.removeItem("user");
          localStorage.removeItem("token");

        })
        .catch((e) => console.log('error'));
    }
    else {

      axios
        .put(
          `https://myflix-movieapi.herokuapp.com/users/${username}`,
          /* `https://myflix-movieapi.herokuapp.com/users/profile`, */
          {
            Username: this.state.Username,
            Password: this.state.Password,
            Email: this.state.Email,
            Birthday: this.state.Birthday,
          },
          config
        )

        .then((res) => {

          const data = res.data;
          localStorage.setItem('user', data.Username);

          console.log(username + " has been updated.");
          console.log(res.data);
          //window.open('/', '_self');
        })

        .catch((error) => {
          console.log('Update Error');
          console.log(error);
          console.log(error.response);
          this.setState({ errorStatus: error.response.request.status });
          this.setState({ errorMessage: error.response.request.statusText });
          this.setState({ errorResponse: error.response.request.response });
        });
      this.setState({
        validated: true,
      });
    }

  };
  deleteMovie(e, movie) {
    e.preventDefault();
    const token = localStorage.getItem('token');
    const username = localStorage.getItem('user');
    axios({
      method: 'delete',
      url: `https://myflix-movieapi.herokuapp.com/users/${username}/movies/${movie._id}`,
      headers: { Authorization: `Bearer ${token}` },
    })
      .then(() => {
        alert(`${movie.Title} is deleted from your Favorites`);
        window.open(`/users/${username}`, '_self');
      })
      .catch(function (err) {
        console.log(err);
      });
  }
  render() {
    const username = localStorage.getItem('user');
    const token = localStorage.getItem('token');
    const { FavoriteMovies } = this.state;
    const { movies } = this.props;
    if (!username) return null;

    return (
      <div>
        <Row className="justify-content-md-center">
          <Col md={6} lg={4} className="profile-box bg-dark">
            <h1 className="title">Update your profile information!</h1>

            <Form noValidate validated={this.state.validated}>
              <Form.Group controlId="formUsername" >
                <Form.Label>Username:</Form.Label>
                <Form.Control type="text" name="Username" /*value={username} disabled placeholder={username}*/ onChange={this.handleInputChange} pattern="[a-zA-Z0-9]+" required />
                <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
                <Form.Control.Feedback type="invalid"> Please choose an alphanumeric username. </Form.Control.Feedback>
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
            {this.state.errorMessage &&
              <div>
                <Form.Text className="error-style">Error status: {this.state.errorStatus} : {this.state.errorMessage}</Form.Text>
                <Form.Text className="error-style">{this.state.errorResponse}</Form.Text>
              </div>}
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
        <div className="text-center bg-dark p-2">
          <h1>List of favorite movies:</h1>
        </div>
        {FavoriteMovies.length === 0 && (
          <div className="d-flex flex-column align-items-center">
            You have no favorite movies.
          </div>
        )}
        {FavoriteMovies.length != 0 && (
          <Row className="fav-style">
            {movies.map(m => {
              if (m._id === FavoriteMovies.find((favoriteMovieID) => favoriteMovieID === m._id)
              ) {
                return (
                  <Col xs={12} sm={6} md={4} lg={3} xl={2} key={m._id} className="d-flex flex-column align-items-center">
                    <MovieCard movieData={m} />
                    <Button className="delete-style" variant="primary" value={m._id} onClick={(e) => this.deleteMovie(e, m)}>Remove from Favorites</Button>
                  </Col>
                )
              }
            })}
          </Row>
        )}
      </div>
    );
  }
}

ProfileView.propTypes = {
  user: PropTypes.object,
  movies: PropTypes.array.isRequired,
  onLoggedIn: PropTypes.func.isRequired,

}