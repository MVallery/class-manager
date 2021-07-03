import React, {useState} from 'react'
import SwitchClassMenu from "./SwitchClassMenu";
import NewClassModal from "../NewClassModal";
import SignButton from './SignButton';
import { connect, dispatch } from "react-redux";
import "./NavLinks.css";

const MainMenu = (props) => {
  const [showAddNewClassModal, setAddNewClassModal] = useState(false);
  return (
    <React.Fragment>
      <div className="navlinks-main-container">
        <div className="navbar-point-board">
          <h5>Total Class Points:</h5>
          <div className="classes-count">
            {props.activeClass ? props.activeClass.count : null}
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
const mapStateToProps = (state) => {
  return {
    activeClass: state.activeClass,
    classList: state.classList,
    userId: state.userId,
    isLoggedIn: state.isLoggedIn,
    inputClassName: state.inputClassName,
    inputNames: state.inputNames
  };
};
const mapDispatchToProps = (dispatch) => {
  return{
    handleInputClassName: (inputClassName) => {dispatch({type:'INPUT_CLASS_NAME', inputClassName})},
    handleInputNames: (inputNames) => {dispatch({type:'INPUT_NAMES', inputNames})},
  }
}
export default connect(mapStateToProps, mapDispatchToProps)(MainMenu);




