import React, {useRef} from 'react';
import { checkActiveClass } from '../../app-files/general';
import ThumbDown from "@material-ui/icons/ThumbDown";
import ThumbUp from "@material-ui/icons/ThumbUp";
import IconButton from "@material-ui/core/IconButton";

const GeneralPoints = props => {
  const {updateDispatch, activeClass, classList, userId} = props;
  
  const activeClassRef = useRef(activeClass);
  activeClassRef.current = activeClass;
  const classListRef = useRef(classList);
  classListRef.current = classList;

  const handleAddMulti = () => {
    let temp = JSON.parse(JSON.stringify(activeClass));
    let tempClassList = JSON.parse(JSON.stringify(classList));

    for (let x = 0; x < temp.students.length; x++) {
      if (temp.students[x].name === "blank") {
        continue;
      }
      if (temp.students[x].isChecked === true) {
        temp.students[x].count = temp.students[x].count + 1;
        temp.count = temp.count + 1;
        temp.students[x].pointStyle = "positive";
      }
    }
    tempClassList = checkActiveClass(tempClassList, temp);
    if (userId) {
      props.handleDatabaseUpdate(temp);
    }
    updateDispatch(temp, tempClassList)
  };

  const handleSubMulti = () => {
    let temp = JSON.parse(JSON.stringify(activeClass));
    let tempClassList = JSON.parse(JSON.stringify(classList));

    for (let x = 0; x < temp.students.length; x++) {
      if (temp.students[x].name === "blank") {
        continue;
      }
      if (temp.students[x].isChecked === true) {
        temp.students[x].count = temp.students[x].count - 1;
        temp.count = temp.count - 1;
        temp.students[x].pointStyle = "negative";
      }
    }
    tempClassList = checkActiveClass(tempClassList, temp);
    if (userId) {
      props.handleDatabaseUpdate(temp);
    }
    updateDispatch(temp, tempClassList)

  };
  const handleClearPointStyle = () => {
    let temp = JSON.parse(JSON.stringify(activeClassRef.current));
    let tempClassList = JSON.parse(JSON.stringify(classListRef.current));
    for (let i in temp.students) {
      if (temp.students[i].name === "blank") {
        continue;
      }
      temp.students[i].pointStyle = null;
    }
    tempClassList = checkActiveClass(tempClassList, temp);
    updateDispatch( temp, tempClassList)
  };
  return (
    <div style={{display:'flex'}}>
    <IconButton
      onClick={() => {
        handleAddMulti();
        setTimeout(() => {
          handleClearPointStyle();
        }, [2000]);
      }}
    >
      <ThumbUp />
    </IconButton>
    <IconButton
      onClick={() => {
        handleSubMulti();
        setTimeout(() => {
          handleClearPointStyle();
        }, [2000]);
      }}
    >
      <ThumbDown />
    </IconButton>
    </div>
  )
}

export default GeneralPoints;