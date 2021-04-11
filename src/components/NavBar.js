import React, {useState} from 'react'
import NavLinks from './NavLinks'

const NavBar = props => {
  const [drawerIsOpen, setDrawerIsOpen] = useState(false);

  const openDrawerHandler = () => setDrawerIsOpen(true);
  
  const closeDrawerHandler = () => setDrawerIsOpen(false);
  return (
    <React.Fragment>
      {/* {drawerIsOpen && <Backdrop onClick={closeDrawerHandler}/>} */}
      {/* <SideDrawer show={drawerIsOpen} onClick={closeDrawerHandler}>
        <nav>
          <NavLinks/>
        </nav>
      </SideDrawer> */}
      <header>
        {/* <button className="navbar-sidedrawer-btn" onClick={openDrawerHandler}>
          <span/>
          <span/>
          <span/>
        </button> */}
        <nav className="navbar-navlinks">
          <NavLinks showAddNewClassHandler={props.showAddNewClassHandler}
                    handleState={props.handleState}
                    activeClass={props.activeClass}
                    classList={props.classList}
                    >
          {props.children}
          </NavLinks>
        </nav>
      </header>

    </React.Fragment>
  )

}

export default NavBar