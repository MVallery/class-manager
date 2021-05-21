import React from 'react'
import {Link} from 'react-router-dom'
import MenuItem from "@material-ui/core/MenuItem";
import Menu from "@material-ui/core/Menu";
import ClassButtonList from "../../classes/components/ClassButtonList";
import {connect} from 'react-redux';
import './NavLinks.css'
const NavLinks = props => {
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
                        handleCloseMainMenu={handleCloseMainMenu}
            />
            <MenuItem onClick={()=> {props.showAddNewClassHandler(); handleCloseMainMenu();}}>Add New Class</MenuItem>


          </Menu>
          {props.isLoggedIn && (
          <button className='logout-signup-button'>
              <Link className='link-style' to='/authenticate'>
                Sign out
              </Link>

          </button>
            )}
          {!props.isLoggedIn && (
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
const mapStateToProps = (state) => {
  return {
    activeClass: state.activeClass,
    classList: state.classList,
    userId:state.userId,
    isLoggedIn:state.isLoggedIn
  }
}
export default connect(mapStateToProps)(NavLinks);