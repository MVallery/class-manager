import React from "react";
import { Link } from "react-router-dom";
import Students from "../app-files/images/students2.jpg";
import Teacher from "../app-files/images/teacher2.jpg";
import Clock from "../app-files/images/clock2.jpg";
import Logo from './components/Logo'
import "./Home.css";

// import "./Classes.css";
const Home = (props) => {
  return (
    <React.Fragment>
      <div className="home-main-container">
        <div className="home-container">
          <div className="home-container-gradient">
          <Logo style='main-logo'/>
          <h3>
            Create new seating charts and track student behavior data with ease.
          </h3>
          <div className="link-container">
            <Link className="link" to="/signup">
              Sign up
            </Link>
            {/* <Link className="link" to="/auth">
              Login
            </Link> */}
          </div>
          <h5>
            OR
          </h5>
          <button className="link" onClick={props.showAddNewClassHandler}>Try now!</button>
          {/* <Link className="link" to="/new-class">
          Login
        </Link> */}
        </div>
        </div>
        <div className="home-description-container">
          <div>
            <img src={Students} alt="students" />
          </div>
          <div>
            <p>
              Flexible!
              <br />
              Customize your room by selecting the amount you want in each row or group.
              <br /><br/>
              Quickly move students around to strategically place students where
              you think they will work best, or randomly shuffle them to make a
              quick new arrangement.
            </p>
          </div>
        </div>

        <div className="home-description-container">
          <div>
            <p>
              Easy!
              <br />
              Find students quickly when giving points since they are grouped
              how you have them in class. This also makes giving group points
              easier!<br/><br/>
              Need to move students who aren't working well together? A simple drag of your student's icon and your problem will be solved!
            </p>
          </div>
          <div>
            <img src={Teacher} alt="students" />
          </div>
        </div>

        <div className="home-description-container">
          <div>
            <img src={Clock} alt="clock" />
          </div>
          <div>
            <p>
              Save Time!
              <br />
              Instantly add a negative or positive point without having to click
              through a bunch of steps.<br/><br/>
              Everything was created with teachers in mind- specifically saving you time
            </p>
          </div>
        </div>
      </div>
    </React.Fragment>
  );
};

export default Home;
