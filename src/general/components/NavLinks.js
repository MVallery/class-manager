import React, {useContext} from 'react'
import {Link} from 'react-router-dom'
import MenuItem from "@material-ui/core/MenuItem";
import Menu from "@material-ui/core/Menu";
import ClassButtonList from "../../classes/components/ClassButtonList";
import {AuthContext} from '../../users/auth-context'

import './NavLinks.css'
const NavLinks = props => {
  const auth = useContext(AuthContext);

  const [mainDropdownDisplay, setMainDropdownDisplay] = React.useState(null);
  const handleMainMenuClick = (e) => {
    setMainDropdownDisplay(e.currentTarget);
  };
  const handleCloseMainMenu = () => {
    setMainDropdownDisplay(null);
  };
  return (
    <React.Fragment>
      <div className='navlinks-main-container'>

        {/* <Link className='navlinks-container-links' to='/'>
          <Logo style='navbar'/>
        </Link> */}
          {/* <div style={{visibility: 'hidden', flex:1}}></div> */}
          <div className="navbar-point-board">
            <h5>Total Class Points:</h5>
          <div className="classes-count">{props.activeClass?props.activeClass.count:null}</div>
</div>
            {props.children}
            <div className="navbar-button-board">
          <div className='navlinks-container'>

          <button className='switch-classes-button'
              onClick={handleMainMenuClick}>
            <span className="switch-classes-text">Classes</span>
          </button>
          <Menu
            id="simple-menu"
            anchorEl={mainDropdownDisplay}
            keepMounted
            open={Boolean(mainDropdownDisplay)}
            onClose={handleCloseMainMenu}
            getContentAnchorEl={null}
          >
            
            <ClassButtonList
                        handleState={props.handleState}
                        activeClass={props.activeClass}
                        classList={props.classList}
                        handleCloseMainMenu={handleCloseMainMenu}
            />
            <MenuItem onClick={()=> {props.showAddNewClassHandler(); handleCloseMainMenu();}}>Add New Class</MenuItem>


          </Menu>
          {auth.isLoggedIn && (
          <button className='logout-signup-button'>
              <Link className='link-style logout-signup-button' to='/authenticate'>
                Sign out
              </Link>

          </button>
            )}
          {!auth.isLoggedIn && (
              <button className='logout-signup-button'>
                <Link className='link-style' to='/authenticate'>
                  Sign in
                </Link>

          </button>
          )}

  
          </div>
          </div>
      </div>
    </React.Fragment>
  )
}

export default NavLinks