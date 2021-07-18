import React from 'react';
import axios from 'axios';
import { LoginView } from '../login-view/login-view';
import { RegistrationView } from '../registration-view/registration-view';
import { MovieCard } from '../movie-card/movie-card';
import { MovieView } from '../movie-view/movie-view';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

import './main-view.scss';
export class MainView extends React.Component {
  // Movies state will hold the list of movies.
  constructor() {
    super();
    this.state = {
      // Sets movies state to an empty array.
      movies: [],
      // adds a new state variable to identify whether there was a user click or not.
      selectedMovie: null,
      // Sets initial value for user state to null
      user: null,
      // Sets initial value for register state to null
      register: true
    }
  }
  componentDidMount() {
    // Queries my myFlix API server’s /movies endpoint with a get request using Axios:
    axios.get('https://myflix-movieapi.herokuapp.com/movies')
      .then(response => {
        this.setState({
          movies: response.data
        });
      })
      .catch(error => {
        console.log(error);
      });
  }
  /* When a movie is clicked, this function is invoked and updates the state of the `selectedMovie` *property to that movie */
  setSelectedMovie(newSelectedMovie) {
    this.setState({
      selectedMovie: newSelectedMovie
    });
  }

  getMovies(token) {
    axios.get('https://myflix-movieapi.herokuapp.com/movies', {
      headers: { Authorization: `Bearer ${token}` }
    })
      .then(response => {
        // Assign the result to the state
        this.setState({
          movies: response.data
        });
      })
      .catch(function (error) {
        console.log(error);
      });
  }
  /* When a user successfully logs in, this function updates the `user` property in state to that *particular user*/
  onLoggedIn(authData) {
    console.log(authData);
    this.setState({
      user: authData.user.Username
    });
    localStorage.setItem('token', authData.token);
    localStorage.setItem('user', authData.user.Username);
    this.getMovies(authData.token);
  }
  onRegister(register) {
    this.setState({
      register,
    });
  }
  // Uses MainView's state to control its UI.
  render() {
    const { movies, selectedMovie, user, register } = this.state;
    /* If there is no user, and is registered the LoginView is rendered. If there is a user logged in, the user details are *passed as a prop to the LoginView*/
    if (!user && register) return <LoginView onLoggedIn={user => this.onLoggedIn(user)} onRegister={register => this.onRegister(register)} />;
    /* If there is no user and no register , the RegistrationView  is rendered. */
    if (!user && !register) return <RegistrationView onRegister={register => this.onRegister(register)} />;

    // Before the movies have been loaded.
    if (movies.length === 0) return <div className="main-view" />;

    return (
      <div>
        {/* If the state of `selectedMovie` is not null, that selected movie will be returned otherwise, all *movies will be returned */}
        {selectedMovie
          ? (
            //<Row className="justify-content-md-center ">
            <Row className="d-flex flex-column justify-content-between align-items-center ">

              <Col xs={12} sm={10} md={8} lg={6} className="d-flex flex-column align-items-center">
                <MovieView movie={selectedMovie} onBackClick={newSelectedMovie => { this.setSelectedMovie(newSelectedMovie); }} />
              </Col>
            </Row>
          )
          : (
            <Row className="d-flex justify-content-start align-items-center mx-1">
              {movies.map(movie => (
                <Col xs={12} sm={6} md={4} lg={3} xl={2} className="d-flex flex-column align-items-center" >
                  <MovieCard key={movie._id} movieData={movie} onMovieClick={(movie) => { this.setSelectedMovie(movie) }} />
                </Col>
              ))}
            </Row>
          )}
      </div>
    );
  }
}