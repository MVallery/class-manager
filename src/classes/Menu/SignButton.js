import React from 'react';
import { Link } from "react-router-dom";
import { connect } from "react-redux";

const SignButton = props => {
  const buttonLabel = props.isLoggedIn? 'Sign out' : 'Sign in'
  return (
      <button className="logout-signup-button">
        <Link className="link-style" to="/authenticate">
          {buttonLabel}
        </Link>
      </button>
    )

}
const mapStateToProps = (state) => {
  return {
    // activeClass: state.activeClass,
    // classList: state.classList,
    // userId: state.userId,
    isLoggedIn: state.isLoggedIn,
  };
};
export default connect(mapStateToProps)(SignButton);
