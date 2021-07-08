import React from 'react';
import { MovieCard } from '../movie-card/movie-card';
import { MovieView } from '../movie-view/movie-view';
export class MainView extends React.Component {
  // Movies state will hold the list of movies.
  constructor() {
    super();
    this.state = {
      movies: [
        { _id: 1, Title: 'The Godfather', Description: 'desc1...', ImagePath: '...' },
        { _id: 2, Title: 'The Godfather: Part II', Description: 'desc2...', ImagePath: '...' },
        { _id: 3, Title: 'The Dark Knight', Description: 'desc3...', ImagePath: '...' }
      ],
      // adds a new state variable to identify whether there was a user click or not.
      selectedMovie: null
    }
  }
  setSelectedMovie(newSelectedMovie) {
    this.setState({
      selectedMovie: newSelectedMovie
    });
  }
  // Uses MainView's state to control its UI.
  render() {
    const { movies, selectedMovie } = this.state;
    if (selectedMovie) return <MovieView movie={selectedMovie} />;
    if (movies.length === 0) return <div className="main-view">The list is empty!</div>;

    return (
      <div className="main-view">
        {movies.map(movie => <MovieCard key={movie._id} movieData={movie} onMovieClick={(movie) => { this.setSelectedMovie(movie) }} />)}
      </div>
    );
  }
}