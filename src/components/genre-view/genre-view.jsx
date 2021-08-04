import React from 'react';
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import PropTypes from 'prop-types';
import Row from 'react-bootstrap/Row';

import './genre-view.scss';

export class GenreView extends React.Component {
  render() {
    const { genre, onBackClick, movies } = this.props;

    return (
      <Container fluid>
        <div className="bg-dark genre-box">
          <div className="genre-view">
            <span className="label font-weight-bold">Genre: </span>
            <span className="value">{genre.Name}</span>
          </div>
          <div class="genre-view">
            <span className="label font-weight-bold">Description: </span>
            <span className="value">{genre.Description}</span>
          </div>
          <Row>
            <div className="genre-list">
              <span className="label font-weight-bold">Movies: </span>
              {movies.map((m) => (
                <div className="movie" key={m._id}>
                  {m.Title}
                </div>
              ))}
            </div>
          </Row>
          <Button variant="primary" className="button-style btn-sm" onClick={() => { onBackClick(null); }} >
            Back
          </Button>
        </div>
      </Container>
    );
  }
}

GenreView.propTypes = {
  genre: PropTypes.shape({
    Name: PropTypes.string.isRequired,
    Description: PropTypes.string.isRequired,
    movies: PropTypes.array.isRequired,
  }),
  onBackClick: PropTypes.func.isRequired,
};