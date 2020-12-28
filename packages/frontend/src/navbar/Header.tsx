import React from 'react';
import './Header.css';

export function Header() {
  return (
    <header>
      <nav className="navbar navbar-expand-md navbar-dark fixed-top bg-dark">
        <div className="container-fluid">
          <a className="navbar-brand" href="/">
            <img src="/images/logo.svg" alt="Logo" className="d-inline-block align-bottom logo" />
            MyMusic
          </a>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarCollapse"
            aria-controls="navbarCollapse"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon" />
          </button>
          <div className="collapse navbar-collapse" id="navbarCollapse">
            <ul className="navbar-nav me-auto mb-2 mb-md-0">
              <li className="nav-item dropdown">
                <a className="nav-link dropdown-toggle" href="#" id="navbarDropdown" role="button" data-bs-toggle="dropdown" aria-expanded="false">
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
            <form className="d-flex">
              <input className="form-control me-2" type="search" placeholder="Search" aria-label="Search" />
              <button className="btn btn-outline-success" id="search-btn" type="submit">Search</button>
            </form>
          </div>
        </div>
      </nav>
    </header>
  );
}
