import React, { useRef, useState } from "react";
import { Draggable } from "react-beautiful-dnd";
import Checkbox from "@material-ui/core/Checkbox";
import ColorLens from "@material-ui/icons/ColorLens";
import FormGroup from "@material-ui/core/FormGroup";
import IconButton from "@material-ui/core/IconButton";
import ThumbDown from "@material-ui/icons/ThumbDown";
import ThumbUp from "@material-ui/icons/ThumbUp";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import { SketchPicker } from "react-color";

// import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd-aligned-rbd';
import { checkActiveClass } from "../app-files/general";
import "../pages/Classes.css";
const StudentCard = (props) => {
  const { record, index, getStyle, smallStyle, classList, activeClass } = props;

  const [changePointsStyle, setChangePointStyle] = useState({});

  const popover = {
    position: "absolute",
    zIndex: "2",
  };
  const cover = {
    position: "fixed",
    top: "0px",
    right: "0px",
    bottom: "0px",
    left: "0px",
  };
  const handleSelection = (index, key) => {
    let temp = JSON.parse(JSON.stringify(activeClass));
    let tempClassList = JSON.parse(JSON.stringify(classList));
    temp.students[index].isChecked = !temp.students[index].isChecked;
    let newTempList = checkActiveClass(tempClassList, temp);
    props.handleState({ activeClass: temp, classList: newTempList });
  };

  const handleAdd = (index, key) => {
    // console.log('handleAdd',index,key)
    let temp = JSON.parse(JSON.stringify(activeClass));
    let tempClassList = JSON.parse(JSON.stringify(classList));

    // console.log(temp)
    temp.students[index].count = temp.students[index].count + 1;
    temp.count = temp.count + 1;
    temp.students[index].pointStyle = "positive";
    let newTempList = checkActiveClass(tempClassList, temp);

    props.handleState({
      activeClass: temp,
      classList: newTempList,
      // classDisplay:tempClassDisplay
    });
  };
  const activeClassRef = useRef(activeClass);
  activeClassRef.current = activeClass;
  const classListRef = useRef(classList);
  classListRef.current = classList;

  const handleClearPointStyle = (index) => {
    let temp = JSON.parse(JSON.stringify(activeClassRef.current));
    let tempClassList = JSON.parse(JSON.stringify(classListRef.current));
    temp.students[index].pointStyle = null;
    var newTempList = checkActiveClass(tempClassList, temp);
    // }
    props.handleState({
      activeClass: temp,
      classList: newTempList,
    });
  };
  const handleSub = (index, key) => {
    let temp = JSON.parse(JSON.stringify(activeClass));
    let tempClassList = JSON.parse(JSON.stringify(classList));

    temp.students[index].count = temp.students[index].count - 1;
    temp.count = temp.count - 1;
    temp.students[index].pointStyle = "negative";

    let newTempList = checkActiveClass(tempClassList, temp);

    props.handleState({
      activeClass: temp,
      classList: newTempList,
    });
  };
  const handleColorClick = (index, key) => {
    let tempClassList = JSON.parse(JSON.stringify(classList));

    let temp = JSON.parse(JSON.stringify(activeClass));
    temp.students[index].displayColorPicker = !temp.students[index]
      .displayColorPicker;
    let newTempList = checkActiveClass(tempClassList, temp);

    props.handleState({ activeClass: temp, classList: newTempList });
  };
  const handleClose = (index, key) => {
    let tempClassList = JSON.parse(JSON.stringify(classList));

    let temp = JSON.parse(JSON.stringify(activeClass));

    temp.students[index].displayColorPicker = false;
    let newTempList = checkActiveClass(tempClassList, temp);

    props.handleState({ activeClass: temp, classList: newTempList });
  };

  const handleColorSelect = (index, e) => {
    let temp = JSON.parse(JSON.stringify(activeClass));
    let tempClassList = JSON.parse(JSON.stringify(classList));

    temp.students[index].background = e.hex;
    let newTempList = checkActiveClass(tempClassList, temp);

    props.handleState({ activeClass: temp, classList: newTempList });
  };
  var key = record.key;
  let keyString = JSON.parse(JSON.stringify(key));
  var backgroundStyle = {
    backgroundColor: record.background,
    filter: "brightness(90%)",
  };
  var backgroundLightStyle = {
    backgroundColor: record.background,
    backgroundImage: `linear-gradient(181deg, rgb(117, 117, 117), ${record.background} 10%, ${record.background})`,
    // backgroundImage: `radial-gradient(
    //   circle at right, rgb(117, 117, 117), ${record.background} 40%)`,
    // filter:'brightness(105%)', //causing flicker on select
  };
  var selectStyle = {
    display: record.isChecked && "flex",
    justifyContent: record.isChecked && "end",
  };
  var pointStyle =
    record.pointStyle === "positive"
      ? {
          backgroundColor: "yellow",

          backgroundImage:
            "radial-gradient(circle, transparent 40%, #fffac4, #fffde6, white)",
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
  return (
    <Draggable key={record.key} draggableId={record.key} index={index}>
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
              style={backgroundLightStyle}
            >
              {record.name}
              <br />

              <div className="desk-button-main-container">
                <div className="desk-button-container">
                  <div className={`desk-button ${smallStyle.smallButtons}`}>
                    <IconButton
                      onClick={() => {
                        handleColorClick(index);
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
                          handleClose(index);
                        }}
                      />
                      <SketchPicker
                        color={activeClass.students[index].background}
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
                            ></Checkbox>
                          }
                        />
                      </div>
                    </FormGroup>
                  </div>
                </div>
                {record.count}
              </div>
            </div>
          </div>
        </div>
      )}
    </Draggable>
  );
};

export default StudentCard;
