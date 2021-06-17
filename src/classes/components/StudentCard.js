import React, { useRef } from "react";
import { Draggable } from "react-beautiful-dnd";
import { connect } from 'react-redux';

import Checkbox from "@material-ui/core/Checkbox";
import ColorLens from "@material-ui/icons/ColorLens";
import FormGroup from "@material-ui/core/FormGroup";
import IconButton from "@material-ui/core/IconButton";
import ThumbDown from "@material-ui/icons/ThumbDown";
import ThumbUp from "@material-ui/icons/ThumbUp";
import FormControlLabel from "@material-ui/core/FormControlLabel";

import {TwitterPicker } from 'react-color';
import {HuePicker} from 'react-color';
import { checkActiveClass } from "../../app-files/general";
import "../Classes.css";
import "./StudentCard.css"

// Gets mapped onto each student in the activeClass props from Classes component. 
// Handles all functionality involving student icons including selection, 
// adding/removing points, color picker, dynamic styling based on points, and icon draggability.

const StudentCard = (props) => {
  const { record, index, getStyle, smallStyle, classList, activeClass } = props;
  const popover = {
    position: "absolute",
    zIndex: "2",
    top:'950%',
    left: '0%'
  };
  const cover = {
    position: "fixed",
    top: "0px",
    right: "0px",
    bottom: "0px",
    left: "0px",
  };
  const handleSelection = (index) => {
    let temp = JSON.parse(JSON.stringify(activeClass));
    temp.students[index].isChecked = !temp.students[index].isChecked;
    props.handleUpdate(temp, classList)
  };

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
    props.handleUpdate(temp, newTempList)

  };

  // created refs to use with handleClearPointStyle because it needs to always maintain the 
  // most current state since the styles get applied and removed while new points may be added at the same time.
  // without the refs the handleClearPointStyle was resetting the state back to where it was when the setTimeout on the handleClick started.
  const activeClassRef = useRef(activeClass);
  activeClassRef.current = activeClass;
  const classListRef = useRef(classList);
  classListRef.current = classList;

  const handleClearPointStyle = (index) => { //removes the point style after a setTimeout is triggered so that when a point is added a glow appears for a short time.
    let temp = JSON.parse(JSON.stringify(activeClassRef.current));
    let tempClassList = JSON.parse(JSON.stringify(classListRef.current));
    temp.students[index].pointStyle = null;
    var newTempList = checkActiveClass(tempClassList, temp);
    props.handleUpdate(temp, newTempList)

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
    props.handleUpdate(temp, newTempList)

  };
  const handleOpenColorPicker = (index) => {
    let tempClassList = JSON.parse(JSON.stringify(classList));

    let temp = JSON.parse(JSON.stringify(activeClass));
    temp.students[index].displayColorPicker = !temp.students[index]
      .displayColorPicker;
    let newTempList = checkActiveClass(tempClassList, temp);
    props.handleUpdate(temp, newTempList)

  };
  const handleCloseColorPicker = (index) => {
    let tempClassList = JSON.parse(JSON.stringify(classList));
    let temp = JSON.parse(JSON.stringify(activeClass));

    temp.students[index].displayColorPicker = false;
    let newTempList = checkActiveClass(tempClassList, temp);
    props.handleUpdate(temp, newTempList)

  };

  const handleColorSelect = (index, e) => {
    let temp = JSON.parse(JSON.stringify(activeClass));
    let tempClassList = JSON.parse(JSON.stringify(classList));

    temp.students[index].background = e.hex;
    let newTempList = checkActiveClass(tempClassList, temp);
    if (props.userId) {
      props.handleDatabaseUpdate(temp);
    }
    props.handleUpdate(temp, newTempList)

  };
  var key = record.key;
  let keyString = JSON.parse(JSON.stringify(key));
  var backgroundStyle = {
    backgroundColor: record.background,
    filter: "brightness(75%)",
  };
  var backgroundLightStyle = {
    backgroundColor: record.background,
    backgroundImage: `linear-gradient(181deg, rgb(117, 117, 117), ${record.background} 10%, ${record.background})`,
  };
  var selectStyle = {
    display: record.isChecked && "flex",
    justifyContent: record.isChecked && "end",
  };
  var studentCountStyle = record.count>0?'student-count-style-positive':record.count<0?'student-count-style-negative':null
  var darkDesks = activeClass.styling.theme === 'darkPurpleBlue'? {color:'white'}:null
  var pointStyle =
    record.pointStyle === "positive"
      ? {
          backgroundColor: "#50f150",
          backgroundImage:
            "radial-gradient(circle, transparent 40%, #e3f7e3, #c8fdc8, #7ef17e, transparent)",
          transition: "background 1s",
          transitionTimingFunction: "ease-in",
          borderRadius: "45%",
        }
      : record.pointStyle === "negative"
      ? {
          backgroundColor: "red",
          backgroundImage:
            "radial-gradient(circle, transparent 40%, #ffc8c4, #ffe6e6, white)",
          transition: "background 0.5s",
          transitionTimingFunction: "ease-out",
          borderRadius: "45%",
        }
      : null;

        //return an empty desk to allow swapping of students in seating arrangement
      if (record.name === "blank") {
        return (
          <Draggable
            key={"blank" + index}
            draggableId={"blank" + index}
            index={index}
          >
            {(provided, snapshot) => (
              <div>
                <div
                  className={`student-card-container ${smallStyle.smallIcon} blank-student-card-container`}
                  {...provided.draggableProps}
                  style={getStyle(provided.draggableProps.style, snapshot)}
                  ref={provided.innerRef}
                  {...provided.dragHandleProps}
                >
                  <div className="student-icon-container"></div>
                  <div
                    className="desk-top blank-desk-top"
                    style={backgroundStyle}
                  ></div>
                  <div className={`desk blank-desk`} style={backgroundLightStyle}></div>
                </div>
              </div>
            )}
          </Draggable>
        );
      }



  return (
    <Draggable key={record.key} draggableId={record.key} index={index} isDragDisabled = {activeClass.students[index].displayColorPicker}>
      {(provided, snapshot) => (
        <div
          className={`student-card-container ${smallStyle.smallIcon}`}
          style={pointStyle}
        >
          <div
            ref={provided.innerRef}
            {...provided.draggableProps}
            {...provided.dragHandleProps}
            key={record.key}
            className="drag"
            style={getStyle(provided.draggableProps.style, snapshot)}
          >
            <div style={{display:'flex', flexDirection:'column', height:'100%', alignItems: 'center'}}>
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
            <div className="desk-top" style={backgroundStyle}></div>
            <div
              className={`desk ${smallStyle.smallFont}`}
              style={{...backgroundLightStyle, ...darkDesks}}
            >
              {smallStyle&& (<span className= {record.name.length<9?"student-name name-small":"student-name name-xsmall"}> {record.name}</span>)}
              {!smallStyle&&(<span className={record.name.length<9?"student-name name-large":"student-name name-medium"}>{record.name}</span>)}

              <div className={`desk-button-main-container`}>
                <div className="desk-button-container">
                  <div className={`desk-button ${smallStyle.smallButtons}`}>
                    <IconButton
                      onClick={() => {
                        handleOpenColorPicker(index);
                      }}
                    >
                      <ColorLens />
                    </IconButton>
                  </div>
                  {activeClass.students[index].displayColorPicker ? (
                    <div style={popover}>
                      <div
                        style={cover}
                        onClick={() => {
                          handleCloseColorPicker(index);
                        }}
                      />
                      <TwitterPicker
                        style={{zIndex:200, position:'absolute'}}
                        onChange={(e) => {
                          handleColorSelect(index, e);
                        }}
                      />
                    </div>
                  ) : null}
                  <div
                    className={`desk-button ${smallStyle.smallButtons}`}
                    style={selectStyle}
                  >
                    <FormGroup row>
                      <div key={record.key}>
                        <FormControlLabel
                          control={
                            <Checkbox
                              label={key}
                              checked={activeClass.students[index].isChecked}
                              onChange={() => {
                                handleSelection(index);
                              }}
                              value={keyString}
                              style={{color:'#065361'}}
                            ></Checkbox>
                          }
                        />
                      </div>
                    </FormGroup>
                  </div>
                </div>
                <p className={studentCountStyle}>
                {record.count}
                </p>
              </div>
            </div>
            </div>
          </div>
        </div>
      )}
    </Draggable>
  );
};
const mapStateToProps = (state) => {
  return {
    activeClass: state.activeClass,
    classList: state.classList,
    userId: state.userId
  }
}
const mapDispatchToProps = (dispatch) => {
  return{
    handleUpdate: (temp, tempClassList) => {dispatch({type:'UPDATE_CLASS', temp,tempClassList })}
    
  }
}
export default connect(mapStateToProps, mapDispatchToProps)(StudentCard);
