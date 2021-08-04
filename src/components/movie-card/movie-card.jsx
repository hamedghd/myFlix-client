import React from 'react';
import PropTypes from 'prop-types';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import { Link } from 'react-router-dom';

import './movie-card.scss';

export class MovieCard extends React.Component {
  render() {
    const { movieData } = this.props;
    return (
      <Card className="movie-card m-1 rounded bg-dark text-center align-items-center">
        <Card.Img className="card-style__image bg-dark" variant="top" src={movieData.ImagePath} />
        <Card.Body className="card-style p-1">
          <Card.Title className="card-style__title text-center mx-auto">{movieData.Title}</Card.Title>
          <Card.Text className="card-style__text m-1 p-0">{movieData.Description}</Card.Text>
          <Link to={`/movies/${movieData._id}`} className="d-flex flex-column align-items-center">
            <Button className="button-style btn-sm btn-block" variant="primary">Open</Button>
          </Link>
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
    ImagePath: PropTypes.string.isRequired,
    Genre: PropTypes.shape({
      Name: PropTypes.string.isRequired,
      Description: PropTypes.string.isRequired,
    }),
    Director: PropTypes.shape({
      Name: PropTypes.string.isRequired,
      Bio: PropTypes.string.isRequired,
      Birth: PropTypes.string.isRequired,
      Death: PropTypes.string,
    }),
  }).isRequired,
};