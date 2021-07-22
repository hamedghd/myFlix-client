import React from 'react';
import Button from 'react-bootstrap/Button';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

import './movie-view.scss';
export class MovieView extends React.Component {


  render() {
    const { movie, onBackClick } = this.props;

    return (
      <div className="movie-view bg-dark">
        <div className="centered">
          <img className="movie-poster" src={movie.ImagePath} />
        </div>

        <div className="movie-title">
          <span className="label">Title: </span>
          <span className="value">{movie.Title}</span>
        </div>

        <div className="movie-description">
          <span className="label">Description: </span>
          <span className="value">{movie.Description}</span>
        </div>

        <div className="movie-genre">
          <span className="label">
            Genre:{' '}
          </span>
          <span className="value">
            <Link to={`/genres/${movie.Genre.Name}`}>
              {movie.Genre.Name}
            </Link>
          </span>
        </div>

        <div className="movie-director">
          <span className="label">
            Director:{' '}
          </span>
          <span className="value">
            <Link to={`/directors/${movie.Director.Name}`}>
              {movie.Director.Name}
            </Link>
          </span>
        </div>

        <Button className="button-style" variant="primary" type="submit" onClick={() => { onBackClick(null); }}>
          Back
        </Button>

      </div>
    );
  }
}
MovieView.propTypes = {
  movie: PropTypes.shape({
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
      Birth: PropTypes.string,
      Death: PropTypes.string,
    }),
  }).isRequired,
  onBackClick: PropTypes.func.isRequired,
};