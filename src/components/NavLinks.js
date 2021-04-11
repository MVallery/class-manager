import React from 'react'
import {Link} from 'react-router-dom'
import MenuItem from "@material-ui/core/MenuItem";
import Menu from "@material-ui/core/Menu";
import ClassButtonList from "../components/ClassButtonList";
import IconButton from "@material-ui/core/IconButton";

import Logo from './Logo'
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
        {/* <Link className='navlinks-container-links' to='/'>
          <Logo style='navbar'/>
        </Link> */}
          <div style={{visibility: 'hidden', flex:1}}></div>
            {props.children}
          <div className='navlinks-container'>

          <button className='navlinks-container-links'
              onClick={handleMainMenuClick}>
            Classes
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
          <Link className='navlinks-container-links' to='/authenticate'>
            Log out
          </Link>
          </div>
         
      </div>
    </React.Fragment>
  )
}

export default NavLinks