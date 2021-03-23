import React from 'react'
import {Link} from 'react-router-dom'
import './Home.css'
const Home = (props) => {
  return (<React.Fragment>
    <div className='home-container'>
    <h2>Class Manager</h2>
    <Link className='link' to='/signup'>Sign up</Link>
    <Link className='link' to='/auth'>Login</Link>

    <Link className='link' to='/newclass'>Create a class</Link>
    </div>

  </React.Fragment>)
}

export default Home