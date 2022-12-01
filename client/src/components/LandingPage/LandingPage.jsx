import React from "react";
import { Link } from "react-router-dom";
import "./LandingPage.css";

export default function LandingPage() {
  return (
    <div className="container">
      <h1 className="landing-title">Food App</h1>
      <Link to="/home">
        <button className="button-landing">ENTER NOW!</button>
      </Link>
    </div>
  );
}
