import React, { useRef, useState } from "react";
import IconButton from "@material-ui/core/IconButton";
import ThumbDown from "@material-ui/icons/ThumbDown";
import ThumbUp from "@material-ui/icons/ThumbUp";
import Sync from "@material-ui/icons/Sync";
import SelectAll from "@material-ui/icons/SelectAll";
import LibraryAddCheckIcon from "@material-ui/icons/LibraryAddCheck";
import ShuffleIcon from "@material-ui/icons/Shuffle";
import Modal from "../../general/components/Modal";

import { checkActiveClass, colorPallet, randWhole, shuffleArray } from "../../app-files/general";
import "./GeneralClassButtons.css";
const ClassButtons = (props) => {
  const [randomStudentModal, setRandomStudentModal] = useState(false);
  const [randomStudent, setRandomStudent] = useState({ name: "" });

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

    props.handleState({
      activeClass: temp,
      classList: newTempList,
    });
  };

  const cancelRandomStudentHandler = () => {
    setRandomStudentModal(false);
  };

  const handleSelectAll = () => {
    let temp = JSON.parse(JSON.stringify(props.activeClass));
    for (let x = 0; x < temp.students.length; x++) {
      if (temp.students[x].name === "blank") {
        continue;
      }
      temp.students[x].isChecked = true;
    }
    props.handleState({
      activeClass: temp,
    });
  };
  const handleDeselectAll = () => {
    let temp = JSON.parse(JSON.stringify(props.activeClass));
    for (let x = 0; x < temp.students.length; x++) {
      if (temp.students[x].name === "blank") {
        continue;
      }
      temp.students[x].isChecked = false;
    }
    props.handleState({
      activeClass: temp,
    });
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

    props.handleState({
      activeClass: temp,
      classList: newTempList,
    });
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

    props.handleState({
      activeClass: temp,
      classList: newTempList,
    });
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

    props.handleState({
      activeClass: temp,
      classList: newTempList,
    });
  };
  const handleShuffle = () => {
    let filterBlank = props.activeClass.students.filter(
      (student) => student.name !== "blank"
    );
    let randomStudent = shuffleArray(filterBlank)[0];
    setRandomStudent(randomStudent);
    setRandomStudentModal(true);
  };

  return (
    <React.Fragment>
      <Modal
        show={randomStudentModal}
        onCancel={cancelRandomStudentHandler}
        header={<div>Randomly Selected: </div>}
        footerClass="worksheet-item__modal-actions"
        // headerClass="random-student-header"
        contentClass="random-student-content-modal"
        footer={
          <React.Fragment>
            <div className="random-student-button">
              <IconButton onClick={handleShuffle}>
                Get another random student <ShuffleIcon />
              </IconButton>
            </div>
            {/* <button onClick={handleShuffle}></button> */}
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
        <div className="multi-select">
          <IconButton onClick={handleResetMulti}>
            <span className="icon-button-text">Reset Points</span>
            <Sync />
          </IconButton>
          {/* <IconButton onClick={handleDeleteMulti}>
            <span className="icon-button-text">Delete Student(s)</span>

            <Delete />
          </IconButton> */}
          <IconButton onClick={handleShuffle}>
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

export default ClassButtons;
