import React from 'react';

export class MovieCard extends React.Component {
  render() {
    // Extracts data
    const { movie } = this.props;
    return <div className="movie-card" >{movie.Title}</div>;
  }
}
