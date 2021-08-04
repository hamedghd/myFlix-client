import React from 'react';
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import PropTypes from 'prop-types';

import './about-view.scss';

export class AboutView extends React.Component {
  render() {
    return (
      <Container fluid>
        <div className="bg-dark about-box">
          <h1 className="">About myFlix: </h1>
          <ul>
            <li>This is a single-page, responsive application that display information about movies.</li>
            <li>The client-side includes several interfaces which is developed using the React library.</li>
            <li>The server-side of the application is a REST API that is built to provide information about movies.</li>
            <li>GitHub link to the client-side code: <a href='https://github.com/hamedghd/myFlix-client' target="_blank">myFlix-client</a></li>
            <li>GitHub link to the server-side code: <a href='https://github.com/hamedghd/Movie_API' target="_blank">Movie_API</a></li>

          </ul>
        </div>
      </Container>
    );
  }
}