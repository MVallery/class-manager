import React from 'react';
import IconButton from "@material-ui/core/IconButton";
import Delete from "@material-ui/icons/Delete";
import ThumbDown from "@material-ui/icons/ThumbDown";
import ThumbUp from "@material-ui/icons/ThumbUp";
import Sync from "@material-ui/icons/Sync";
import SelectAll from "@material-ui/icons/SelectAll";

const ClassButtons = (props) => {
  const handleSelectAll = () => {
    let temp = JSON.parse(JSON.stringify(props.activeClass));
    if (props.checkAll === false) {
      for (let x = 0; x < temp.students.length; x++) {
        temp.students[x].isChecked = true;
      }
      props.handleState({
        activeClass: temp,
        checkAll: true,
      })
    } else {
      for (let x = 0; x < temp.students.length; x++) {
        temp.students[x].isChecked = false;
      }
      props.handleState({
        activeClass: temp,
        checkAll: false,
      })
    }
  };
  const handleAddMulti = (change) => {
    let temp = JSON.parse(JSON.stringify(props.activeClass));
    for (let x = 0; x < temp.students.length; x++) {
      if (temp.students[x].isChecked === true) {
        temp.students[x].count = temp.students[x].count + 1;
        temp.count = temp.count + 1;
      }
    }
    props.handleState({
      activeClass: temp,
    })
  };
  const handleSubMulti = (change) => {
    let temp = JSON.parse(JSON.stringify(props.activeClass));
    for (let x = 0; x < temp.students.length; x++) {
      if (temp.students[x].isChecked === true) {
        temp.students[x].count = temp.students[x].count - 1;
        temp.count = temp.count - 1;
      }
    }
    props.handleState({
      activeClass: temp,
    })
  };
  const handleDeleteMulti = () => {
    let temp = JSON.parse(JSON.stringify(props.activeClass));
    if (window.confirm("Are you sure you want to delete these students?")) {
      for (let x = temp.students.length - 1; x >= 0; x--) {
        if (temp.students[x].isChecked === true) {
          temp.count = temp.count- temp.students[x].count
          //temp[x] = 0;
          temp.students.splice(x, 1);
          // console.log(temp);
        }
        // console.log(temp);
        //this.setState({nameList:temp})
      }
      props.handleState({
        activeClass: temp,
      })
    }
  };
return (
  <React.Fragment>
              <IconButton className="iconbutton" onClick={handleAddMulti}>
            <ThumbUp />
          </IconButton>
          <IconButton className="iconbutton" onClick={handleSubMulti}>
            <ThumbDown />
          </IconButton>
          <IconButton className="iconbutton" onClick={props.handleResetMulti}>
            <Sync />
          </IconButton>
          <IconButton className="iconbutton" onClick={handleDeleteMulti}>
            <Delete />
          </IconButton>
          <IconButton className="iconbutton" onClick={handleSelectAll}>
            <SelectAll />
          </IconButton>
  </React.Fragment>
)
}

export default ClassButtons