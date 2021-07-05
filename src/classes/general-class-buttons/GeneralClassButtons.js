import React, { useRef, useState } from "react";
import Sync from "@material-ui/icons/Sync";


import { useSelector, useDispatch } from 'react-redux';
import IconButton from "@material-ui/core/IconButton";
import GeneralPoints from "./GeneralPoints";
import GeneralSelect from "./GeneralSelect";
import RandomStudent from "./RandomStudent";
import { checkActiveClass } from "../../app-files/general";
import "./GeneralClassButtons.css";
// Button bar that is displayed at the bottom of the Classes page. 
// This handles general button functionality that involves the entire class and
// would be more commonly used and therefore needs to be more accessible.

const ClassButtons = (props) => {
  const activeClass = useSelector(state=>state.activeClass)
  const classList = useSelector(state=>state.classList)
  const userId = useSelector(state=>state.userId);
  const dispatch = useDispatch();

  const updateDispatch = (temp, tempClassList) =>{
    dispatch({type:"UPDATE_CLASS", temp, tempClassList})
  }

  const handleResetMulti = () => {
    let temp = JSON.parse(JSON.stringify(activeClass));
    let tempClassList = JSON.parse(JSON.stringify(classList));

    for (let x in temp.students) {
      if (temp.students[x].name === "blank") {
        continue;
      }
      if (temp.students[x].isChecked === true) {
        temp.count = temp.count - temp.students[x].count;
        temp.students[x].count = 0;
      }
    }
    tempClassList = checkActiveClass(tempClassList, temp);
    if (userId) {
      props.handleDatabaseUpdate(temp);
    }
    dispatch({type:"UPDATE_CLASS", temp, tempClassList})
  };

  return (
    <React.Fragment>

      <div className="gcb-container">
          <IconButton onClick={handleResetMulti}>
            <span className="icon-button-text">Reset Points</span>
            <Sync />
          </IconButton>
          <RandomStudent activeClass={activeClass}/>

          <GeneralSelect activeClass={activeClass} classList={classList} updateDispatch={updateDispatch} />
          <GeneralPoints activeClass={activeClass} classList={classList} updateDispatch={updateDispatch} userId={userId}/>
      </div>
    </React.Fragment>
  );
};

export default ClassButtons;
