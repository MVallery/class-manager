import React from "react";
import { Droppable } from "react-beautiful-dnd";
import { useSelector } from "react-redux";
import "../Classes.css";
let x = 0;
//Splits student cards into droppable containers, added to StuCardsDisplay through Classes handleFormatting function.

const StudentContainer = (props) => {
  const activeClass = useSelector((state) => state.activeClass);
  x++;
  return (
    <Droppable
      droppableId={`group-${props.index + x}`}
      index={props.index}
      direction={
        activeClass?.styling.format === "rows" ? "horizontal" : "vertical"
      }
    >
      {(provided) => (
        <div
          {...provided.droppableProps}
          ref={provided.innerRef}
          className={`${props.group} ${props.smallGroup}`}
        >
          {props.array}
        </div>
      )}
    </Droppable>
  );
};

export default StudentContainer;
