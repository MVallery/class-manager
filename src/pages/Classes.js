import React from "react";
import IconButton from "@material-ui/core/IconButton";
import Delete from "@material-ui/icons/Delete";
import ThumbDown from "@material-ui/icons/ThumbDown";
import ThumbUp from "@material-ui/icons/ThumbUp";
import Sync from "@material-ui/icons/Sync";
import SelectAll from "@material-ui/icons/SelectAll";

import './Classes.css'
const Classes = (props) => {
  console.log(props.classDisplay[0]);
  var newGridDisplay = props.classDisplay[0].map(row=>{ //did this bc styling wasn't working
    return <div className='grid-row'>{row}</div>
  })
  
  return (
    <React.Fragment>
      {/* {props.classDisplay > 0 ? props.classDisplay[0] : null} */}
      <div className='grid-display'>
      {/* {props.classDisplay[0]} */}
      {newGridDisplay}
      </div>
      <button onClick={props.handleNewStu}>Add Student</button>

      <div className="multi-select-container">
        <div className="multi-select">
          <IconButton className="iconbutton" onClick={props.handleAddMulti}>
            <ThumbUp />
          </IconButton>
          <IconButton className="iconbutton" onClick={props.handleSubMulti}>
            <ThumbDown />
          </IconButton>
          <IconButton className="iconbutton" onClick={props.handleResetMulti}>
            <Sync />
          </IconButton>
          <IconButton className="iconbutton" onClick={props.handleDeleteMulti}>
            <Delete />
          </IconButton>
          <IconButton className="iconbutton" onClick={props.handleSelectAll}>
            <SelectAll />
          </IconButton>
        </div>
        <h1>Total Class Points: {props.count}</h1>
      </div>
    </React.Fragment>
  );
};

export default Classes;
