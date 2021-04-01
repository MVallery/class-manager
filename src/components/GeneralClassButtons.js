import React, { useEffect } from 'react';
import IconButton from "@material-ui/core/IconButton";
import Delete from "@material-ui/icons/Delete";
import ThumbDown from "@material-ui/icons/ThumbDown";
import ThumbUp from "@material-ui/icons/ThumbUp";
import Sync from "@material-ui/icons/Sync";
import SelectAll from "@material-ui/icons/SelectAll";
import LibraryAddCheckIcon from '@material-ui/icons/LibraryAddCheck';
import {checkActiveClass} from '../app-files/general'
const ClassButtons = (props) => {
  
  const handleClearPointStyle = () => {
    let temp = JSON.parse(JSON.stringify(props.activeClass));
    let tempClassList = JSON.parse(JSON.stringify(props.classList));
      for (let i in temp.students){
        // if (temp.students[i].pointStyle === 'checked') {
          temp.students[i].pointStyle = null
        // }
      }

      var newTempList = checkActiveClass(tempClassList, temp);

    props.handleState({
      activeClass: temp,
      classList: newTempList,
      // classDisplay:tempClassDisplay
    });
  }

  const handleSelectAll = () => {
    let temp = JSON.parse(JSON.stringify(props.activeClass));
    // if (props.checkAll === false) {
      for (let x = 0; x < temp.students.length; x++) {
        temp.students[x].isChecked = true;
      }
      props.handleState({
        activeClass: temp,
        // checkAll: true,
      })
  };
  const handleDeselectAll = () => {
    let temp = JSON.parse(JSON.stringify(props.activeClass));
    for (let x = 0; x < temp.students.length; x++) {
      temp.students[x].isChecked = false;
    }
    props.handleState({
      activeClass: temp,

      // checkAll: false,
    })
  }
  const handleAddMulti = (change) => {
    let temp = JSON.parse(JSON.stringify(props.activeClass));
    let tempClassList = JSON.parse(JSON.stringify(props.classList));

    for (let x = 0; x < temp.students.length; x++) {
      if (temp.students[x].isChecked === true) {
        temp.students[x].count = temp.students[x].count + 1;
        temp.count = temp.count + 1;
        temp.students[x].pointStyle = 'positive'

      }
    }
    let newTempList = checkActiveClass(tempClassList, temp);

    props.handleState({
      activeClass: temp,
      classList: newTempList,

    })
  };
  const handleSubMulti = (change) => {
    let temp = JSON.parse(JSON.stringify(props.activeClass));
    let tempClassList = JSON.parse(JSON.stringify(props.classList));

    for (let x = 0; x < temp.students.length; x++) {
      if (temp.students[x].isChecked === true) {
        temp.students[x].count = temp.students[x].count - 1;
        temp.count = temp.count - 1;
        temp.students[x].pointStyle = 'negative'

      }
    }
    let newTempList = checkActiveClass(tempClassList, temp);

    props.handleState({
      activeClass: temp,
      classList: newTempList,

    })
  };
  const handleDeleteMulti = () => {
    let temp = JSON.parse(JSON.stringify(props.activeClass));
    let tempClassList = JSON.parse(JSON.stringify(props.classList));

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
    let newTempList = checkActiveClass(tempClassList, temp);

      props.handleState({
        activeClass: temp,
      classList: newTempList,

      })
    }
  };
  const handleResetMulti = (index, key) => {
    let temp = JSON.parse(JSON.stringify(props.activeClass));
    let tempClassList = JSON.parse(JSON.stringify(props.classList));

    for (let x in temp.students) {
      if (temp.students[x].isChecked === true) {
        temp.count = temp.count - temp.students[x].count;
        temp.students[x].count = 0;
      }
    }
    let newTempList = checkActiveClass(tempClassList, temp);

    props.handleState({
      activeClass: temp,
      classList: newTempList,
    });
  };
  useEffect(()=> {
    for (let i in props.activeClass.students){
      if (props.activeClass.students[i].pointStyle === 'positive' || props.activeClass.students[i].pointStyle === 'negative'){
        setTimeout(()=>{
          handleClearPointStyle();
        },[2000])
        break;
      }
    }
  },[props.activeClass.students])
return (
  <React.Fragment>
              <IconButton className="iconbutton" onClick={() => {
                handleAddMulti();
                // setTimeout(()=>{
                // handleClearPointStyle();
                // },[2000])
                }}>
            <ThumbUp />
          </IconButton>
          <IconButton className="iconbutton" onClick={() => {
            handleSubMulti();
            // setTimeout(()=>{
            //   handleClearPointStyle();
            //   },[2000])
            }}>
            <ThumbDown />
          </IconButton>
          <IconButton className="iconbutton" onClick={handleResetMulti}>
            <Sync />
          </IconButton>
          <IconButton className="iconbutton" onClick={handleDeleteMulti}>
            <Delete />
          </IconButton>
          <IconButton className="iconbutton" onClick={handleDeselectAll}>
            <SelectAll />
          </IconButton>
          <IconButton className="iconbutton" onClick={handleSelectAll}>
            <LibraryAddCheckIcon/>
          </IconButton>
  </React.Fragment>
)
}

export default ClassButtons