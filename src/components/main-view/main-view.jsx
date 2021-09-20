import React from 'react';
import axios from 'axios';
import { connect } from 'react-redux';
import { BrowserRouter as Router, Route, Redirect } from "react-router-dom";
import PropTypes from 'prop-types';

import { LoginView } from '../login-view/login-view';
import { RegistrationView } from '../registration-view/registration-view';
//import { MovieCard } from '../movie-card/movie-card';
import { MovieView } from '../movie-view/movie-view';
//import { HeaderView } from '../header-view/header-view';
import { DirectorView } from '../director-view/director-view';
import { GenreView } from '../genre-view/genre-view';
import { ProfileView } from '../profile-view/profile-view';
import { setMovies, setUser } from '../../actions/actions';
import MoviesList from '../movies-list/movies-list';
import { AboutView } from '../about-view/about-view';

import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';
//import imageurl from "url:../../img/myflix.png";
// Use full URL
import imageurl from "url:https://raw.githubusercontent.com/hamedghd/myFlix-client/134dfa2a16a68a396073c783dbe523db4b069b0e/src/img/myflix.png";
//import imageurl from 'url:../../img/myflix.png';
import Button from 'react-bootstrap/Button';

import './main-view.scss';
class MainView extends React.Component {
  // Movies state will hold the list of movies.
  constructor() {
    super();
    /*
    this.state = {
      // Sets initial value for user state to null
      user: null,
      // Sets initial value for movies state to an empty array
      movies: [],
    }
    */
  }
  componentDidMount() {
    // Gets the value of the token from localStorage.
    let accessToken = localStorage.getItem('token');
    // Gets the value of the user from localStorage.
    let user = localStorage.getItem('user');
    // If the access token is present, it means the user is already logged in and you can call the getMovies method.
    if (accessToken !== null) {
      /*
            this.setState({
              user: localStorage.getItem('user')
            });
      */
      this.props.setUser(user);
      console.log(user);
      // Queries my myFlix API server’s /movies endpoint with a get request using Axios:
      this.getMovies(accessToken);
    }
  }

  getMovies(token) {
    axios.get('https://myflix-movieapi.herokuapp.com/movies', {
      headers: { Authorization: `Bearer ${token}` }
    })
      .then(response => {
        // Assign the result to the state
        this.props.setMovies(response.data);
      })
      .catch(function (error) {
        console.log(error);
        console.error(error.response.data.error);
      });
  }
  /* When a user successfully logs in, this function updates the `user` property in state to that *particular user*/
  onLoggedIn(authData) {
    console.log(authData);
    this.props.setUser(authData.user.Username);
    localStorage.setItem('token', authData.token);
    localStorage.setItem('user', authData.user.Username);
    this.getMovies(authData.token);
  }
  onLoggedOut() {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    /*
    this.setState({
      user: null,
    });
    */
    window.open('/', '_self');
  }

  // Uses MainView's state to control its UI.
  render() {
    const { user } = this.props;
    const { movies } = this.props;
    return (
      <Router>
        {/*
        <div>
          <HeaderView />
        </div>
         */}
        {user ? (
          <Navbar className="navbar-style" bg="dark" variant="dark">
            <Navbar.Brand href="/">
              <img src={imageurl} alt="logo"
                width="100"
                className="d-inline-block align-top"></img>
            </Navbar.Brand>
            <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <Navbar.Collapse id="basic-navbar-nav">
              <Nav className="me-auto">
                <Nav.Link href="/">Home</Nav.Link>
                <Nav.Link href="/about">About</Nav.Link>
                <Nav.Link href={`/users/${user}`}>Profile</Nav.Link>
              </Nav>
            </Navbar.Collapse>
            <Navbar.Text>
              Signed in as: <a href="#login">{user}</a>
            </Navbar.Text>
            <Button className="button-style btn-sm ml-3" onClick={() => { this.onLoggedOut() }}>Logout</Button>
          </Navbar >) : (
          <Navbar className="navbar-style" bg="dark" variant="dark">
            <Navbar.Brand href="/">
              <img src={imageurl} alt="logo"
                width="100"
                className="d-inline-block align-top"></img>
            </Navbar.Brand>
            <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <Navbar.Collapse id="basic-navbar-nav">
              <Nav className="me-auto">
                <Nav.Link href="/">Home</Nav.Link>
                <Nav.Link href="#link">About</Nav.Link>
              </Nav>
            </Navbar.Collapse>
          </Navbar >
        )}

        {/* <Row className="main-view justify-content-md-center"> */}
        <Row className="d-flex justify-content-center align-items-center mx-1">

          <Route exact path="/" render={() => {
            if (!user) return <Col>
              <LoginView onLoggedIn={user => this.onLoggedIn(user)} />
            </Col>
            if (movies.length === 0) return <div className="main-view" />;
            /* return movies.map(m => (
              <Col xs={12} sm={6} md={4} lg={3} xl={2} key={m._id} className="d-flex flex-column align-items-center">
                <MovieCard movieData={m} />
              </Col> 
              ))
            */
            return <MoviesList movies={movies} />;
          }} />
          <Route path="/register" render={() => {
            if (user) return <Redirect to="/" />
            return <Col>
              <RegistrationView />
            </Col>
          }} />

          <Route path="/users/:username" render={() => {
            if (!user) return;
            <Col>
              <LoginView onLoggedIn={(user) => this.onLoggedIn(user)} />
            </Col>;
            return (
              <Col>
                <ProfileView
                  onLoggedIn={(user) => this.onLoggedIn(user)}
                  movies={movies}
                  user={user}
                  onBackClick={() => history.goBack()}
                />
              </Col>
            );
          }}
          />
          <Route path="/movies/:movieId" render={({ match, history }) => {
            if (!user) return <Col>
              <LoginView onLoggedIn={user => this.onLoggedIn(user)} />
            </Col>
            if (movies.length === 0) return <div className="main-view" />;
            return <Col xs={12} sm={10} md={8} lg={6} className="d-flex flex-column align-items-center p-0">
              <MovieView movie={movies.find(m => m._id === match.params.movieId)} onBackClick={() => history.goBack()} />
            </Col>
          }} />

          <Route path="/directors/:name" render={({ match, history }) => {
            if (!user) return <Col>
              <LoginView onLoggedIn={user => this.onLoggedIn(user)} />
            </Col>
            if (movies.length === 0) return <div className="main-view" />;
            return <Col md={8}>
              <DirectorView
                director={movies.find(m => m.Director.Name === match.params.name).Director}
                movies={movies.filter((m) => m.Director.Name === match.params.name)}
                onBackClick={() => history.goBack()}
              />
            </Col>
          }
          } />

          <Route path="/genres/:name" render={({ match, history }) => {
            if (!user) return <Col>
              <LoginView onLoggedIn={user => this.onLoggedIn(user)} />
            </Col>
            if (movies.length === 0) return <div className="main-view" />;
            return <Col md={8}>
              <GenreView
                genre={movies.find(m => m.Genre.Name === match.params.name).Genre}
                movies={movies.filter((m) => m.Genre.Name === match.params.name)}
                onBackClick={() => history.goBack()}
              />
            </Col>
          }
          } />

          <Route path="/about" render={({ match, history }) => {
            return <Col>
              <AboutView onLoggedIn={user => this.onLoggedIn(user)} />
            </Col>
          }} />

        </Row>
      </Router>
    );

  }
}
let mapStateToProps = state => {
  return {
    movies: state.movies,
    user: state.user,
  }
}
export default connect(mapStateToProps, { setMovies, setUser })(MainView);

MainView.propTypes = {
  setMovies: PropTypes.func.isRequired,
  setUser: PropTypes.func.isRequired,
  movies: PropTypes.array.isRequired,
  user: PropTypes.string.isRequired,
};