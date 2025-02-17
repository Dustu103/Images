import React from "react";
import { Link } from "react-router-dom";
import "./Navbar.css"; // Import the CSS file for styling

function Navbar() {
  return (
    <nav className="navbar navbar-expand-lg navbar-dark fixed-top custom-navbar">
      <div className="container-fluid">
        <a className="navbar-brand fw-bold fs-4" href="#">ImageToolkit</a>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNav"
          aria-controls="navbarNav"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav ms-auto">
            <li className="nav-item">
              <Link className="nav-link text-white" to="/">Extract Text</Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link text-white" to="/compress">Compress Image</Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link text-white" to="/watermark">Watermark Image</Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link text-white" to="/gifmaker">GIF Maker</Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link text-white" to="/remove">Remove Background</Link>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
