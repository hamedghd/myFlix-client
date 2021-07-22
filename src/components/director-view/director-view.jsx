import React from 'react';
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import PropTypes from 'prop-types';

import './director-view.scss';

export class DirectorView extends React.Component {
  render() {
    const { director, onBackClick } = this.props;
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
  }),
  onBackClick: PropTypes.func.isRequired,
};