import React from 'react';
import Col from 'react-bootstrap/Col';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import VisibilityFilterInput from '../visibility-filter-input/visibility-filter-input';
import { MovieCard } from '../movie-card/movie-card';

const mapStateToProps = state => {
  const { visibilityFilter } = state;
  return { visibilityFilter };
};

function MoviesList(props) {
  const { movies, visibilityFilter } = props;
  let filteredMovies = movies;

  if (visibilityFilter !== '') {
    filteredMovies = movies.filter(m => m.Title.toLowerCase().includes(visibilityFilter.toLowerCase()));
  }

  if (!movies) return <div className="main-view" />;

  return <>
    <Col md={12} style={{ margin: '1em' }}>
      <VisibilityFilterInput visibilityFilter={visibilityFilter} />
    </Col>
    {filteredMovies.map(m => (
      <Col xs={12} sm={6} md={4} lg={3} xl={2} key={m._id} className="d-flex flex-column align-items-center" key={m._id}>
        <MovieCard movieData={m} />
      </Col>
    ))}
  </>;
}


export default connect(mapStateToProps)(MoviesList);

MoviesList.propTypes = {
  movies: PropTypes.array.isRequired,
  visibilityFilter: PropTypes.string.isRequired,
};