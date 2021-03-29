import React from "react";
import { Link } from "react-router-dom";
import "./Home.css";
// import "./Classes.css";
const Home = (props) => {
  return (
    <React.Fragment>
      <div className="home-container">

        <div className="logo-container">
        <div className="logo-student-card-container">
          <div className="logo-student-icon-container">
            <div className="logo-student-head"></div>
            <div className="logo-student-body"></div>
          </div>
          <div className="logo-desk-top">

          </div>
          <div className="logo-desk">
           <span className="logo-c">C</span>
            
          </div>
        </div>
        <div className="logo-end">
        lass Manager
        </div>
        </div>
        <h3>
          Create new seating charts and track student behavior data with ease.
        </h3>
        <div className="link-container">
        <Link className="link" to="/signup">
          Sign up 
        </Link>
        <Link className="link" to="/auth">
          Login
        </Link>
        </div>
        <h5>Want to give it a try first? Begin creating a test class below to see how it works. (Data will not be saved)</h5>
        </div>

      
    </React.Fragment>
  );
};

export default Home;
