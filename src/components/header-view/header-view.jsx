import React from 'react';
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';
import imageurl from "url:./myflix.png";
import Button from 'react-bootstrap/Button';
import { Link } from 'react-router-dom';

export class HeaderView extends React.Component {
  onLoggedout() {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    this.setState({
      user: null
    });
  }
  render() {

    return (
      <Navbar className="navbar-style" bg="dark" variant="dark">
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
            <Link to={`/users/${user}`}>
              <Button variant="link">
                Profile
              </Button>
            </Link>
          </Nav>
        </Navbar.Collapse>
        {/*<Navbar.Text>
          Signed in as: <a href="#login">username</a>
        </Navbar.Text>*/}
        <Button className="button-style btn-sm" onClick={() => { this.onLoggedOut() }}>Logout</Button>
      </Navbar >
    );
  }
}

