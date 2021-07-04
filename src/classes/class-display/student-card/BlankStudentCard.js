import React from "react";
import { Draggable } from "react-beautiful-dnd";
import { getStyle } from "../../util";

const BlankStudentCard = (props) => {
  const { index } = props;
  return (
    <Draggable
      key={"blank" + index}
      draggableId={"blank" + index}
      index={index}
    >
      {(provided, snapshot) => (
        <div>
          <div
            className={`student-card-container ${props.smallStyle.smallIcon} blank-student-card-container`}
            {...provided.draggableProps}
            style={getStyle(
              props.record,
              provided.draggableProps.style,
              snapshot
            )}
            ref={provided.innerRef}
            {...provided.dragHandleProps}
          >
            <div className="student-icon-container"></div>
            <div
              className="desk-top blank-desk-top"
              style={props.backgroundStyle}
            ></div>
            <div
              className={`desk blank-desk`}
              style={props.backgroundLightStyle}
            ></div>
          </div>
        </div>
      )}
    </Draggable>
  );
};

export default BlankStudentCard;
