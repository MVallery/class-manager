import React, {useEffect, useState} from "react";
import IconButton from "@material-ui/core/IconButton";
import Delete from "@material-ui/icons/Delete";
import ThumbDown from "@material-ui/icons/ThumbDown";
import ThumbUp from "@material-ui/icons/ThumbUp";
import Sync from "@material-ui/icons/Sync";
import SelectAll from "@material-ui/icons/SelectAll";

import './Classes.css'
const Classes = (props) => {
  const [newNameListState, setNewNameListState] = useState([])
  console.log(props.names)
  console.log(props.generalSelection)
  // console.log(props.classDisplay[0]);
  // var newGridDisplay = props.classDisplay[0].map(row=>{ //did this bc styling wasn't working
  //   return <div className='grid-row'>{row}</div>
  // })
  const handleFormatting = () => {
    let formattedNameList = []; //this being there messes up the class showing? even if i'm not calling any of these variables
    for (let i = 0; i < props.names.length; ) {
      let newArray = props.names.splice(i, props.generalSelection.groups);
      formattedNameList.push(newArray);
    }
    console.log(formattedNameList)
  let newNameList = formattedNameList.map((array) => {
    return <div className="red">{array}</div>;
  });
  console.log(newNameList)
  setNewNameListState(newNameList)
  }
  useEffect(() => {
    handleFormatting()
  }, [props.names])
  // let newName= props.names.map(array=>{
  //   return <div className='red'>{array}</div>
  // })
  return (
    <React.Fragment>
      {/* {props.classDisplay > 0 ? props.classDisplay[0] : null} */}
      {/* {props.classDisplay[0]} */}
      {/* {newGridDisplay} */}

     {/* {props.names} */}
      <button onClick={props.handleNewStu}>Add Student</button>
      <div className='red-container'>
      {newNameListState}
      </div>
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
