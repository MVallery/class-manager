import React from "react";
import { Link } from "react-router-dom";
import "./Home.css";
const Home = (props) => {
  return (
    <React.Fragment>
      <div className="home-container">
        <h2>Class Manager</h2>
        <Link className="link" to="/signup">
          Sign up
        </Link>
        <Link className="link" to="/auth">
          Login
        </Link>

        <h1>Class Manager</h1>
        <h3>
          Create new seating charts and track student behavior data with ease.{" "}
        </h3>

<div className='students-all-container'>
        <div className="student-card-container">
          <div className="student-icon-container">
            <div className="student-head"></div>
            <div className="student-body"></div>
          </div>
          <div className="desk-top">
          </div>
          <div className="desk">
          Melissa V
            <br/>
            8
          </div>
        </div>
        <div className="student-card-container">
          <div className="student-icon-container">
            <div className="student-head"></div>
            <div className="student-body"></div>
          </div>
          <div className="desk-top">

          </div>
          <div className="desk">
            Melissa V<br/>
            8
          </div>
        </div>
        <div className="student-card-container">
          <div className="student-icon-container">
            <div className="student-head"></div>
            <div className="student-body"></div>
          </div>
          <div className="desk-top">
          
          </div>
          <div className="desk">
            Melissa V<br/>
            8
          </div>
        </div>


        <div className="student-card-container">
          <div className="student-icon-container">
            <div className="student-head"></div>
            <div className="student-body"></div>
          </div>
          <div className="desk-top">

          </div>
          <div className="desk">
            Melissa V<br/>
            8
          </div>
        </div>


        
        <div className="student-card-container">
          <div className="student-icon-container">
            <div className="student-head"></div>
            <div className="student-body"></div>
          </div>
          <div className="desk-top">

          </div>
          <div className="desk">
            Melissa V<br/>
            8
          </div>
        </div>


        </div>

      </div>
    </React.Fragment>
  );
};

export default Home;
