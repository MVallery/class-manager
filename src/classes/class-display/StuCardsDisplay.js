import React from "react";
import { DragDropContext, Droppable } from "react-beautiful-dnd";
import { CSSTransition } from "react-transition-group";

//wraps final student groups into droppable containers for displaying in Classes component.
const StudentCardsDisplay = (props) => {
  return (
    <CSSTransition
      in={true}
      mountOnEnter
      unmountOnExit
      timeout={500}
      classNames="transition-classes"
    >
      <DragDropContext onDragEnd={props.handleOnDragEnd}>
        <Droppable droppableId="students">
          {(provided) => (
            <div {...provided.droppableProps} ref={provided.innerRef}>
              {props.newNameListState}
              {provided.placeholder}
            </div>
          )}
        </Droppable>
      </DragDropContext>
    </CSSTransition>
  );
};

export default StudentCardsDisplay;
