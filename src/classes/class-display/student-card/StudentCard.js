import React from "react";
import { Draggable } from "react-beautiful-dnd";
import { useSelector } from "react-redux";
import StuIconPoints from "./StuIconPoints";
import Desk from "./desk/Desk";
import BlankStudentCard from "./BlankStudentCard";
import { getPointStyle } from "../../util";
import "../Classes.css";
import "./StudentCard.css";

// Gets mapped onto each student in the activeClass props from Classes component.
// returns either empty card, or displays full student card- StuIconPoints & Desk,

const StudentCard = (props) => {
  const { record, index, getStyle, smallStyle } = props;
  const activeClass = useSelector((state) => state.activeClass);
  var backgroundStyle = {
    backgroundColor: record.background,
    filter: "brightness(75%)",
  };
  var backgroundLightStyle = {
    backgroundColor: record.background,
    backgroundImage: `linear-gradient(181deg, rgb(117, 117, 117), ${record.background} 10%, ${record.background})`,
  };

  var pointStyle = getPointStyle(record);

  //return an empty desk to allow swapping of students in seating arrangement
  if (record.name === "blank") {
    return (
      <BlankStudentCard
        smallStyle={smallStyle}
        backgroundStyle={backgroundStyle}
        backgroundLightStyle={backgroundLightStyle}
        index={index}
        record={record}
      />
    );
  }

  return (
    <Draggable
      key={record.key}
      draggableId={record.key}
      index={index}
      isDragDisabled={activeClass.students[index].displayColorPicker}
    >
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
            style={getStyle(record, provided.draggableProps.style, snapshot)}
          >
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                height: "100%",
                alignItems: "center",
              }}
            >
              <StuIconPoints index={index} />
              <Desk
                smallStyle={smallStyle}
                backgroundStyle={backgroundStyle}
                backgroundLightStyle={backgroundLightStyle}
                record={record}
                index={index}
              />
            </div>
          </div>
        </div>
      )}
    </Draggable>
  );
};

export default StudentCard;
