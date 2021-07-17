import React from 'react';
import PropTypes from 'prop-types';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';

import './movie-card.scss';

export class MovieCard extends React.Component {
  render() {
    const { movieData, onMovieClick } = this.props;
    return (
      <Card className="movie-card m-1 rounded bg-dark text-center">
        <Card.Img className="card-style__image bg-dark" variant="top" src={movieData.ImagePath} />
        <Card.Body className="card-style p-1">
          <Card.Title className="card-style__title text-center mx-auto">{movieData.Title}</Card.Title>
          <Card.Text className="card-style__text m-1 p-0">{movieData.Description}</Card.Text>
          <Button className="button-style btn-sm btn-block" onClick={() => onMovieClick(movieData)} variant="primary">Open</Button>
        </Card.Body>
      </Card >
    );
  }
}

// Sets the static propTypes property.
MovieCard.propTypes = {
  movieData: PropTypes.shape({
    Title: PropTypes.string.isRequired,
    Description: PropTypes.string.isRequired,
    ImagePath: PropTypes.string.isRequired
  }).isRequired,
  onMovieClick: PropTypes.func.isRequired
};