import React from 'react';
import {
  Container, Navbar,
} from 'react-bootstrap';
import './Header.css';

export function Header() {
  return (
    <header>
      <Navbar bg="dark" variant="dark" expand="md" fixed="top">
        <Container fluid>
          <Navbar.Brand href="/">
            <img src="/images/logo.svg" alt="Logo" className="d-inline-block align-bottom logo" />
            MyMusic
          </Navbar.Brand>
          <Navbar.Toggle
            aria-controls="navbarCollapse"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon" />
          </Navbar.Toggle>
          <Navbar.Collapse id="navbarCollapse">
            <ul className="navbar-nav me-auto mb-2 mb-md-0">
              <li className="nav-item dropdown">
                <a className="nav-link dropdown-toggle" href="#" id="navbarDropdown" role="button" aria-expanded="false">
                  Explore
                </a>
                <ul className="dropdown-menu" aria-labelledby="navbarDropdown">
                  <li><a className="dropdown-item" href="#">Recently Added</a></li>
                  <li><a className="dropdown-item" href="#">By Genres</a></li>
                  <li><a className="dropdown-item" href="#">File System</a></li>
                </ul>
              </li>
              <li className="nav-item ">
                <a className="nav-link" href="#">Playlist</a>
              </li>
            </ul>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </header>
  );
}
