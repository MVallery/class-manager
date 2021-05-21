import React, { useRef, useState } from "react";
import IconButton from "@material-ui/core/IconButton";
import ThumbDown from "@material-ui/icons/ThumbDown";
import ThumbUp from "@material-ui/icons/ThumbUp";
import Sync from "@material-ui/icons/Sync";
import SelectAll from "@material-ui/icons/SelectAll";
import LibraryAddCheckIcon from "@material-ui/icons/LibraryAddCheck";
import ShuffleIcon from "@material-ui/icons/Shuffle";
import Modal from "../../general/components/Modal";
import { connect } from 'react-redux';

import { checkActiveClass, colorPallet, randWhole, shuffleArray } from "../../app-files/general";
import "./GeneralClassButtons.css";
// Button bar that is displayed at the bottom of the Classes page. 
// This handles general button functionality that involves the entire class and
// would be more commonly used and therefore needs to be more accessible.

const ClassButtons = (props) => {
  const [showRandomStudentModal, setShowRandomStudentModal] = useState(false);
  const [randomStudent, setRandomStudent] = useState({ name: "" });

  // created refs to use with handleClearPointStyle because it needs to always maintain the 
  // most current state since the styles get applied and removed while new points may be added at the same time.
  // without the refs the handleClearPointStyle was resetting the state back to where it was when the setTimeout on the handleClick started.
  const activeClassRef = useRef(props.activeClass);
  activeClassRef.current = props.activeClass;
  const classListRef = useRef(props.classList);
  classListRef.current = props.classList;

  const handleClearPointStyle = () => {
    let temp = JSON.parse(JSON.stringify(activeClassRef.current));
    let tempClassList = JSON.parse(JSON.stringify(classListRef.current));
    for (let i in temp.students) {
      if (temp.students[i].name === "blank") {
        continue;
      }
      temp.students[i].pointStyle = null;
    }
    var newTempList = checkActiveClass(tempClassList, temp);
    props.handleUpdate(temp, newTempList)
  };

  const handleSelectAll = () => {
    let temp = JSON.parse(JSON.stringify(props.activeClass));
    for (let x = 0; x < temp.students.length; x++) {
      if (temp.students[x].name === "blank") {
        continue;
      }
      temp.students[x].isChecked = true;
    }
    props.handleUpdate(temp, props.classList)

  };
  const handleDeselectAll = () => {
    let temp = JSON.parse(JSON.stringify(props.activeClass));
    for (let x = 0; x < temp.students.length; x++) {
      if (temp.students[x].name === "blank") {
        continue;
      }
      temp.students[x].isChecked = false;
    }
    props.handleUpdate(temp, props.classList)
  };
  const handleAddMulti = () => {
    let temp = JSON.parse(JSON.stringify(props.activeClass));
    let tempClassList = JSON.parse(JSON.stringify(props.classList));

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
    let newTempList = checkActiveClass(tempClassList, temp);
    props.handleDatabaseUpdate();
    props.handleUpdate(temp, newTempList)
  };

  const handleSubMulti = () => {
    let temp = JSON.parse(JSON.stringify(props.activeClass));
    let tempClassList = JSON.parse(JSON.stringify(props.classList));

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
    let newTempList = checkActiveClass(tempClassList, temp);
    props.handleDatabaseUpdate(temp);
    props.handleUpdate(temp, newTempList)

  };

  const handleResetMulti = () => {
    let temp = JSON.parse(JSON.stringify(props.activeClass));
    let tempClassList = JSON.parse(JSON.stringify(props.classList));

    for (let x in temp.students) {
      if (temp.students[x].name === "blank") {
        continue;
      }
      if (temp.students[x].isChecked === true) {
        temp.count = temp.count - temp.students[x].count;
        temp.students[x].count = 0;
      }
    }
    let newTempList = checkActiveClass(tempClassList, temp);
    props.handleDatabaseUpdate(temp);
    props.handleUpdate(temp, newTempList)
  };

  const handleSelectRandomStudent = () => {
    let filterBlank = props.activeClass.students.filter(
      (student) => student.name !== "blank"
    );
    let randomStudent = shuffleArray(filterBlank)[0];
    setRandomStudent(randomStudent);
    setShowRandomStudentModal(true);
  };
  const cancelRandomStudentHandler = () => {
    setShowRandomStudentModal(false);
  };
  return (
    <React.Fragment>
      <Modal
        show={showRandomStudentModal}
        onCancel={cancelRandomStudentHandler}
        header={<div>Randomly Selected: </div>}
        footerClass="worksheet-item__modal-actions"
        contentClass="random-student-content-modal"
        footer={
          <React.Fragment>
            <div className="random-student-button">
              <IconButton onClick={handleSelectRandomStudent}>
                Get another random student <ShuffleIcon />
              </IconButton>
            </div>
          </React.Fragment>
        }
      >
        <div
          className="random-student"
          style={{ backgroundColor: `${randomStudent.background}` }}
        >
          {randomStudent.name}
        </div>
      </Modal>
      <div className="gcb-container">
          <IconButton onClick={handleResetMulti}>
            <span className="icon-button-text">Reset Points</span>
            <Sync />
          </IconButton>
          <IconButton onClick={handleSelectRandomStudent}>
            <span className="icon-button-text">Random Student</span>
            <ShuffleIcon />
          </IconButton>
          <IconButton onClick={handleDeselectAll}>
            <span className="icon-button-text">Deselect All</span>
            <SelectAll />
          </IconButton>
          <IconButton onClick={handleSelectAll}>
            <span className="icon-button-text">Select All</span>
            <LibraryAddCheckIcon />
          </IconButton>
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
      </div>
    </React.Fragment>
  );
};
const mapStateToProps = (state) => {
  return {
    activeClass: state.activeClass,
    classList: state.classList
  }
}
const mapDispatchToProps = (dispatch) => {
  return{
    handleUpdate: (temp, tempClassList) => {dispatch({type:'UPDATE_CLASS', temp,tempClassList })}
    
  }
}
export default connect(mapStateToProps, mapDispatchToProps)(ClassButtons);
