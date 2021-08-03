import React from 'react';
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import PropTypes from 'prop-types';

import './director-view.scss';

export class DirectorView extends React.Component {
  render() {
    const { director, onBackClick, movies } = this.props;
    return (
      <Container fluid >
        <div className="bg-dark director-box">
          <div className="director-view">
            <span className="label font-weight-bold">Director: </span>
            <span className="value">{director.Name}</span>
          </div>
          <div className="director-view">
            <span className="label font-weight-bold">Bio: </span>
            <span className="value">{director.Bio}</span>
          </div>
          <div className="director-view">
            <span className="label font-weight-bold">Born: </span>
            <span className="value">{director.Birth}</span>
          </div>
          <div className="director-view">
            <span className="label font-weight-bold">Death: </span>
            <span className="value">{director.Death}</span>
          </div>
          {/* Display the movies directed by each director. */}
          <Row>
            <div className="director-movies">
              <span className="label font-weight-bold">Movies: </span>
              {movies.map((m) => (
                <div className="movie" key={m._id}>
                  {m.Title}
                </div>
              ))}
            </div>
          </Row>
          <Button className="button-style btn-sm" variant="info" size="sm" onClick={() => { onBackClick(null); }} >
            Back
          </Button>
        </div>
      </Container>
    );
  }
};
DirectorView.propTypes = {
  director: PropTypes.shape({
    Name: PropTypes.string.isRequired,
    Bio: PropTypes.string.isRequired,
    Birth: PropTypes.string.isRequired,
    Death: PropTypes.string,
  }).isRequired,
  onBackClick: PropTypes.func.isRequired,
};