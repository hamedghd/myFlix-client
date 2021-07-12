import React from 'react';
import axios from 'axios';
import { LoginView } from '../login-view/login-view';
import { MovieCard } from '../movie-card/movie-card';
import { MovieView } from '../movie-view/movie-view';
export class MainView extends React.Component {
  // Movies state will hold the list of movies.
  constructor() {
    super();
    this.state = {
      // Sets movies state to an empty array.
      movies: [],
      // adds a new state variable to identify whether there was a user click or not.
      selectedMovie: null
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
  setSelectedMovie(newSelectedMovie) {
    this.setState({
      selectedMovie: newSelectedMovie
    });
  }
  // Uses MainView's state to control its UI.
  render() {
    const { movies, selectedMovie } = this.state;
    // If the movies state array be empty, it doesn't display anything.
    if (movies.length === 0) return <div className="main-view" />;

    return (
      <div className="main-view">
        {selectedMovie
          ? <MovieView movie={selectedMovie} onBackClick={newSelectedMovie => { this.setSelectedMovie(newSelectedMovie); }} />
          : movies.map(movie => (
            <MovieCard key={movie._id} movieData={movie} onMovieClick={(movie) => { this.setSelectedMovie(movie) }} />
          ))}
      </div>
    );




  }
}