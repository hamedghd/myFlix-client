import React from 'react';
import PropTypes from 'prop-types';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';

import './movie-card.scss';

export class MovieCard extends React.Component {
  render() {
    const { movieData, onMovieClick } = this.props;
    return (
      //bg-white m-2 p-2 rounded d-flex flex-column justify-content-between align-items-center"
      <Card className="movie-card m-2 p-2 rounded bg-dark">
        <Card.Img className="card-style__image p-3 bg-dark" variant="top" src={movieData.ImagePath} />
        <Card.Body className="card-style">
          <Card.Title className="card-style__title ">{movieData.Title}</Card.Title>
          <Card.Text className="card-style__text">{movieData.Description}</Card.Text>
          <Button className="button-style" onClick={() => onMovieClick(movieData)} variant="primary">Open</Button>
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