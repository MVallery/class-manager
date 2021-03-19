import React from 'react'
import {Link} from 'react-router-dom'
const Home = (props) => {
  return (<React.Fragment>
    <h2>Class Manager</h2>
    <Link to='/signup'>Sign up</Link>
    <Link to='/auth'>Login</Link>

    <Link to='/newclass'>Create a class</Link>
  </React.Fragment>)
}

export default Home