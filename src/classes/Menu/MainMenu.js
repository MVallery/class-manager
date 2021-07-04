import React, {useState} from 'react'
import SwitchClassMenu from "./SwitchClassMenu";
import NewClassModal from "../NewClassModal";
import SignButton from './SignButton';
import { useSelector, useDispatch } from "react-redux";
import "./NavLinks.css";

const MainMenu = (props) => {
  const activeClass = useSelector((state) => state.activeClass);
  const [showAddNewClassModal, setAddNewClassModal] = useState(false);
  return (
    <React.Fragment>
      <div className="navlinks-main-container">
        <div className="navbar-point-board">
          <h5>Total Class Points:</h5>
          <div className="classes-count">
            {activeClass ? activeClass.count : null}
          </div>
        </div>
        {props.children}
        <div className="navbar-button-board">
          <div className="navlinks-container">
            <SwitchClassMenu setAddNewClassModal={setAddNewClassModal} />
            <NewClassModal
              handleChange={props.handleChange}
              showAddNewClassModal={showAddNewClassModal}
              setAddNewClassModal={setAddNewClassModal}
            />
            <SignButton/>

          </div>
        </div>
      </div>
    </React.Fragment>
  );
};

export default MainMenu;




