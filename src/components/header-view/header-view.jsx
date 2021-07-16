import React from 'react';
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';
import imageurl from "url:./myflix.png"

export class HeaderView extends React.Component {
  render() {
    return (
      <Navbar className="navbar-style">
        <Navbar.Brand href="/">
          <img src={imageurl} alt="logo"
            width="100"
            className="d-inline-block align-top"></img>
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link href="#home">Home</Nav.Link>
            <Nav.Link href="#link">About</Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Navbar >
    );
  }
}

