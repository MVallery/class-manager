import React from 'react';
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";

const SignButton = props => {
  const isLoggedIn = useSelector(state=>state.isLoggedIn)
  const buttonLabel = isLoggedIn? 'Sign out' : 'Sign in'
  return (
      <button className="logout-signup-button">
        <Link className="link-style" to="/authenticate">
          {buttonLabel}
        </Link>
      </button>
    )

}

export default SignButton;
