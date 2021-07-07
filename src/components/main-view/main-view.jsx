import React from 'react';
export class MainView extends React.Component {
  // Movies state will hold the list of movies.
  constructor() {
    super();
    this.state = {
      movies: [
        { _id: 1, Title: 'The Godfather', Description: 'desc1...', ImagePath: '...' },
        { _id: 2, Title: 'The Godfather: Part II', Description: 'desc2...', ImagePath: '...' },
        { _id: 3, Title: 'The Dark Knight', Description: 'desc3...', ImagePath: '...' }
      ]
    }
  }
  // Uses MainView's state to control its UI.
  render() {
    const { movies } = this.state;

    if (movies.length === 0) return <div className="main-view">The list is empty!</div>;

    return (
      <div className="main-view">
        {movies.map(movie => <div key={movie._id}>{movie.Title}</div>)}
      </div>
    );
  }
}
