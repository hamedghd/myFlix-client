import React from 'react';

export class MovieCard extends React.Component {
  render() {
    // Extracts data
    const { movieData } = this.props;
    return <div className="movie-card" >{movieData.Title}</div>;
  }
}
