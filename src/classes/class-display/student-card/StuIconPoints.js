import React, { useRef } from "react";
import ThumbDown from "@material-ui/icons/ThumbDown";
import ThumbUp from "@material-ui/icons/ThumbUp";
import IconButton from "@material-ui/core/IconButton";
import { checkActiveClass } from "../../../app-files/general";
import { useSelector, connect } from "react-redux";
import "./StudentCard.css";

//student icon and point buttons, displayed in StudentCard
const StuIconPoints = (props) => {
  const activeClass = useSelector((state) => state.activeClass);
  const classList = useSelector((state) => state.classList);
  const { index } = props;
  // created refs to use with handleClearPointStyle because it needs to always maintain the
  // most current state since the styles get applied and removed while new points may be added at the same time.
  // without the refs the handleClearPointStyle was resetting the state back to where it was when the setTimeout on the handleClick started.
  const activeClassRef = useRef(activeClass);
  activeClassRef.current = activeClass;
  const classListRef = useRef(classList);
  classListRef.current = classList;

  const handleAdd = (index) => {
    let temp = JSON.parse(JSON.stringify(activeClass));
    let tempClassList = JSON.parse(JSON.stringify(classList));
    temp.students[index].count = temp.students[index].count + 1;
    temp.count = temp.count + 1;
    temp.students[index].pointStyle = "positive";
    let newTempList = checkActiveClass(tempClassList, temp);
    if (props.userId) {
      props.handleDatabaseUpdate(temp);
    }
    props.handleUpdate(temp, newTempList);
  };

  const handleSub = (index) => {
    let temp = JSON.parse(JSON.stringify(activeClass));
    let tempClassList = JSON.parse(JSON.stringify(classList));

    temp.students[index].count = temp.students[index].count - 1;
    temp.count = temp.count - 1;
    temp.students[index].pointStyle = "negative";

    let newTempList = checkActiveClass(tempClassList, temp);
    if (props.userId) {
      props.handleDatabaseUpdate(temp);
    }
    props.handleUpdate(temp, newTempList);
  };
  const handleClearPointStyle = (index) => {
    //removes the point style after a setTimeout is triggered so that when a point is added a glow appears for a short time.
    let temp = JSON.parse(JSON.stringify(activeClassRef.current));
    let tempClassList = JSON.parse(JSON.stringify(classListRef.current));
    temp.students[index].pointStyle = null;
    var newTempList = checkActiveClass(tempClassList, temp);
    props.handleUpdate(temp, newTempList);
  };

  return (
    <div className="student-icon-container">
      <div className="student-head-button-container">
        <div className="student-head"></div>
        <div className="pts-button-container">
          <div className="pts-buttons">
            <IconButton
              className="icon"
              onClick={() => {
                handleSub(index);
                setTimeout(() => {
                  handleClearPointStyle(index);
                }, [2000]);
              }}
            >
              <ThumbDown />
            </IconButton>
          </div>

          <div className="pts-buttons">
            <IconButton
              onClick={() => {
                handleAdd(index);
                setTimeout(() => {
                  handleClearPointStyle(index);
                }, [2000]);
              }}
            >
              <ThumbUp />
            </IconButton>
          </div>
        </div>
      </div>
      <div className="student-body"></div>
    </div>
  );
};
const mapDispatchToProps = (dispatch) => {
  return {
    handleUpdate: (temp, tempClassList) => {
      dispatch({ type: "UPDATE_CLASS", temp, tempClassList });
    },
  };
};
export default connect(null, mapDispatchToProps)(StuIconPoints);
