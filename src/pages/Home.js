import React from 'react'
import {Link} from 'react-router-dom'
import './Home.css'
const Home = (props) => {
  return (<React.Fragment>
    <div className='home-container'>
    <h2>Class Manager</h2>
    <Link className='link' to='/signup'>Sign up</Link>
    <Link className='link' to='/auth'>Login</Link>

    <h1>Class Manager</h1>
    <h3>Create new seating charts and track student behavior data with ease. </h3>
    <h3>If you just want to give it a quick try, add a class and play around to see what all it can do!</h3>
    <p>Warning: All data will be lost if you do not first login.</p>
    </div>

  </React.Fragment>)
}

export default Home