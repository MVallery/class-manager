import React from 'react';
import IconButton from "@material-ui/core/IconButton";
import Delete from "@material-ui/icons/Delete";
import ThumbDown from "@material-ui/icons/ThumbDown";
import ThumbUp from "@material-ui/icons/ThumbUp";
import Sync from "@material-ui/icons/Sync";
import SelectAll from "@material-ui/icons/SelectAll";

const ClassButtons = (props) => {
  const handleSelectAll = () => {
    let temp = JSON.parse(JSON.stringify(props.nameList));
    if (props.checkAll === false) {
      for (let x = 0; x < temp.length; x++) {
        temp[x].isChecked = true;
      }
      props.handleState({
        nameList: temp,
        checkAll: true,
      })
    } else {
      for (let x = 0; x < temp.length; x++) {
        temp[x].isChecked = false;
      }
      props.handleState({
        nameList: temp,
        checkAll: false,
      })
    }
  };
  const handleAddMulti = (change) => {
    let temp = JSON.parse(JSON.stringify(props.nameList));
    let count = JSON.parse(JSON.stringify(props.count));
    for (let x = 0; x < temp.length; x++) {
      if (temp[x].isChecked === true) {
        temp[x].count = temp[x].count + 1;
        count = count + 1;
      }
    }
    props.handleState({
      nameList: temp,
      count: count,
    })
  };
  const handleSubMulti = (change) => {
    let temp = JSON.parse(JSON.stringify(props.nameList));
    let count = JSON.parse(JSON.stringify(props.count));
    for (let x = 0; x < temp.length; x++) {
      if (temp[x].isChecked === true) {
        temp[x].count = temp[x].count - 1;
        count = count - 1;
      }
    }
    props.handleState({
      nameList: temp,
      count: count,
    })
  };
  const handleDeleteMulti = () => {
    let temp = JSON.parse(JSON.stringify(props.nameList));
    let count = JSON.parse(JSON.stringify(props.count));
    if (window.confirm("Are you sure you want to delete these students?")) {
      for (let x = temp.length - 1; x >= 0; x--) {
        if (temp[x].isChecked === true) {
          //temp[x] = 0;
          temp.splice(x, 1);
          console.log(temp);
        }
        console.log(temp);
        //this.setState({nameList:temp})
      }
      props.handleState({
        nameList: temp,
        count: count,
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