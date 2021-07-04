import React from "react";
import "./ClassButton.css";
import MenuItem from "@material-ui/core/MenuItem";
import { useSelector, useDispatch } from "react-redux";

const ClassButton = (props) => {
  const classList = useSelector(state=>state.classList)
  const dispatch = useDispatch();
  const handleSwitchClass = () => {
    let tempClassList = classList;
    props.handleCloseMainMenu();
    let temp = JSON.parse(JSON.stringify(props.loopClass));
    dispatch({type:"UPDATE_CLASS", temp, tempClassList})
  };
  return (
    <div className="cb-container">
      <MenuItem onClick={handleSwitchClass}>{props.loopClass.title}</MenuItem>
    </div>
  );
};

export default ClassButton;
