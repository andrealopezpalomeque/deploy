import React from "react";
import { NavLink } from "react-router-dom";
import "./NavBar.css";

export default function NavBar() {
  return (
    <div>
      <nav className="navbar">
        <ul className="navbar-li-container">
          <li className="logo">
            <NavLink to="/" className="logo">
              Food App
            </NavLink>
          </li>
          <li className="navbar-li">
            <NavLink className="navbar-link" to="/home">
              Home
            </NavLink>
          </li>
          <li className="navbar-li">
            <NavLink className="navbar-link" to="/create">
              Create Recipe
            </NavLink>
          </li>
        </ul>
      </nav>
    </div>
  );
}
