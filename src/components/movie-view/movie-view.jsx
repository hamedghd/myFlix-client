import React from 'react';
import Button from 'react-bootstrap/Button';

import './movie-view.scss';
export class MovieView extends React.Component {

  keypressCallback(event) {
    console.log(event.key);
  }
  // Adds a keypress listener.
  componentDidMount() {
    document.addEventListener('keypress', this.keypressCallback);
  }
  // Removes a keypress listener.
  componentWillUnmount() {
    document.removeEventListener('keypress', this.keypressCallback);
  }

  render() {
    const { movie, onBackClick } = this.props;

    return (
      <div className="movie-view" bg="light">
        <div className="movie-poster centered">
          <img src={movie.ImagePath} />
        </div>
        <div className="movie-title" bg="light">
          <span className="label">Title: </span>
          <span className="value">{movie.Title}</span>
        </div>
        <div className="movie-description" bg="light">
          <span className="label">Description: </span>
          <span className="value">{movie.Description}</span>
        </div>
        <Button className="button-style" variant="primary" type="submit" onClick={() => { onBackClick(null); }}>
          Back
        </Button>

      </div>
    );
  }
}