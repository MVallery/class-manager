import React, { useEffect, useState } from "react";
import { connect } from 'react-redux';
import NavBar from "../general/components/NavBar";
import Logo from "../general/components/Logo";
import {CSSTransition} from 'react-transition-group';
import StudentCard from "./components/StudentCard";
import { DragDropContext, Droppable } from "react-beautiful-dnd";
import { checkActiveClass } from "../app-files/general";

import {useHttpClient} from '../general/http-hook';
import Modal from "../general/components/Modal";
import ClassTitleMenu from "./components/ClassTitleMenu";
import GeneralClassButtons from "./components/GeneralClassButtons";
import NewClass from './components/NewClass'
import "./Classes.css";

// Connects all components in subfolder together and acts as the main display page.

const Classes = (props) => {
  const { activeClass, classList } = props;
  const { sendRequest } = useHttpClient();
  const [newNameListState, setNewNameListState] = useState([]);

  const [showAddNewClassModal, setAddNewClassModal] = useState(false);
  const cancelAddNewClassHandler = () => {
    setAddNewClassModal(false);
  };
  const [smallStyle, setSmallStyle] = useState({
    smallIcon: "small-icon",
    smallButtons: "small-buttons",
    smallFont: "small-font",
  });

  const showAddNewClassHandler = () => {
    setAddNewClassModal(true);
  };
  const handleSmallStyle = (state) => {
    setSmallStyle(state)
  }
  //a generic database function that is used for any PATCH updates involving the activeClass 
  const handleDatabaseUpdate= async(tempActiveClass)=> {
      try {
        await sendRequest(`https://classmanagerbackend.herokuapp.com/api/users/${props.userId}/${activeClass.id}`, "PATCH", 

         JSON.stringify({
           title: tempActiveClass.title,
           students: tempActiveClass.students,
           styling: tempActiveClass.styling,
           count: tempActiveClass.count,
   
         }), {
           'Content-Type': 'application/json'
         }
         )
   
       } catch(err) {
         console.log(err)
       }
    }

    const handleDatabaseDelete = async()=> {
      try{
        await sendRequest(`https://classmanagerbackend.herokuapp.com/api/users/${props.userId}/${activeClass.id}`, 'DELETE',

        null,
        { Authorization: "Bearer " + props.token }
  
        )
      } catch(err) {
        console.log(err)
      }
    }
  const handleOnDragEnd = (result) => {
    if (!result.destination) { //if outside draggable container do thing.
      return;
    }
    let temp = JSON.parse(JSON.stringify(activeClass));
    let tempClassList = JSON.parse(JSON.stringify(classList));

    let draggedItem = activeClass.students[result.source.index];
    let swappedItem = activeClass.students[result.destination.index];
    if (draggedItem === swappedItem) {
      return;
    }
    temp.students = activeClass.students.filter(
      item => item !== draggedItem && item !== swappedItem
    );
    //ensuring that the splice does not change the index of the swapped/dragged item.
      if (result.source.index > result.destination.index) { 
        temp.students.splice(result.destination.index, 0, draggedItem);
        temp.students.splice(result.source.index, 0, swappedItem);
      } else {
        temp.students.splice(result.source.index, 0, swappedItem);
        temp.students.splice(result.destination.index, 0, draggedItem);
      }

    let newTempList = checkActiveClass(tempClassList, temp);
    if (props.userId) {
      handleDatabaseUpdate(temp);
    }
    props.handleUpdate(temp, newTempList)

  };

  const studentCards = activeClass?props.activeClass.students.map((record, index) => {
    function getStyle(style, snapshot) {
      //ensures that icons do not shift up when moving other ones since we are swapping versus reordering all students.
      if (!snapshot.isDragging) {
        if (record.name === "blank") {
          return { display: "flex" };
        }
        return {
          display: "inline",
        };
      }
      if (!snapshot.isDropAnimating) {
        return style;
      }

      return {
        ...style,
        // cannot be 0, but make it super tiny
        transitionDuration: `0.001s`,
      };
    }

    return (
      <StudentCard
        smallStyle={smallStyle}
        getStyle={getStyle}
        handleDatabaseUpdate={handleDatabaseUpdate}
        record={record}
        index={index}
      />
    );
  }):null;

  let group;
  let groupContainer;
  let mainGroupContainer;
  let smallGroup;
  const handleGroupStyling = () => {
    mainGroupContainer = "group-main-container";

    if (activeClass.styling.format === "rows") {
      group = "row";
      groupContainer = "row-container";
      mainGroupContainer = "row-main-container";
    } else {
      if (activeClass.styling.groups === 4) {
        group = "group4";
        groupContainer = "group-container4";
        if (activeClass.styling.size === "small") {
          smallGroup = "small-group4";
        }
      } else if (
        activeClass.styling.groups === 5 ||
        activeClass.styling.groups === 6
      ) {
        group = "group56";
        groupContainer = "group-container56";
        if (activeClass.styling.size === "small") {
          smallGroup = "small-group56";
        }
      } else if (activeClass.styling.groups === 7) {
        group = "group7";
        groupContainer = "group-container7";
        if (activeClass.styling.size === "small") {
          smallGroup = "small-group7";
        }
      }
    }
  };

  const handleFormatting = () => {
    let formattedNameList = [];
    //splitting studentCards into separate groups based on amount in each group to make formatting easier later.
    for (let i = 0; i < studentCards.length; i += activeClass?.styling.groups) {
      let [newArray, newArray2] = [[], []];
      if (activeClass?.styling.groups === 4) {
        newArray = studentCards.slice(i, i + 2);
        newArray2 = studentCards.slice(i + 2, i + 4);
      } else if (activeClass.styling.groups === 5) {
        newArray = studentCards.slice(i, i + 3);
        newArray2 = studentCards.slice(i + 3, i + 5);
      } else if (activeClass.styling.groups === 6) {
        newArray = studentCards.slice(i, i + 3);
        newArray2 = studentCards.slice(i + 3, i + 6);
      } else if (activeClass.styling.groups === 7) {
        newArray = studentCards.slice(i, i + 4);
        newArray2 = studentCards.slice(i + 4, i + 7);
      }
      let combinedArray = [newArray, newArray2];
      formattedNameList.push(combinedArray);
    }

    let newNameList = formattedNameList.map((array, index) => {
      return (
        <div className="droppable-container">
          <Droppable
            droppableId={`group-${index}`}
            index={index}
            direction={
              activeClass?.styling.format === "rows" ? "horizontal" : "vertical"
            }
          >
            {(provided) => (
              <div
                {...provided.droppableProps}
                ref={provided.innerRef}
                className={`${group} ${smallGroup}`}
              >
                {array[0]}
              </div>
            )}
          </Droppable>
          <Droppable
            droppableId={`group-${index}-a`}
            index={index * 20}
            direction={
              activeClass?.styling.format === "rows" ? "horizontal" : "vertical"
            }
          >
            {(provided) => (
              <div
                {...provided.droppableProps}
                ref={provided.innerRef}
                className={`${group} ${smallGroup}`}
              >
                {array[1]}
              </div>
            )}
          </Droppable>
        </div>
      );
    });
    newNameList = (
      <DragDropContext
        onDragEnd={handleOnDragEnd}
      >
        <div className={mainGroupContainer}>
          <div className={groupContainer}>{newNameList}</div>
        </div>
      </DragDropContext>
    );

    setNewNameListState(newNameList);
  };

  useEffect(() => {
    if(activeClass){
      handleGroupStyling();
      handleFormatting();
    }
    
  }, [props.activeClass]); //props.generalSelection.groups

  return (
    activeClass?
      <React.Fragment>

        <Modal
          show={showAddNewClassModal}
          onCancel={cancelAddNewClassHandler}
          header={<div>Create a new class: </div>}
          contentClass="addNewStu-modal"
          footerClass="worksheet-item__modal-actions"
        >
          <NewClass {...props} cancelAddNewClassHandler={cancelAddNewClassHandler} />
        </Modal>

        <NavBar
                handleState={props.handleState}
                showAddNewClassHandler={showAddNewClassHandler}
              >
                <ClassTitleMenu {...props} handleDatabaseUpdate={handleDatabaseUpdate} handleDatabaseDelete= {handleDatabaseDelete} handleSmallStyle={handleSmallStyle}/>
              </NavBar>
      <div className="classes-container">

        
        <React.Fragment>

                <CSSTransition
                in={true}
                mountOnEnter
                unmountOnExit
                timeout={500}
                classNames="transition-classes"
              >
                <DragDropContext onDragEnd={handleOnDragEnd}>
                  <Droppable droppableId="students">
                    {(provided) => (
                      <div {...provided.droppableProps} ref={provided.innerRef}>
                        {newNameListState}
                        {provided.placeholder}
                      </div>
                    )}
                  </Droppable>
                </DragDropContext>
              </CSSTransition>
              <GeneralClassButtons
                    handleDatabaseUpdate={handleDatabaseUpdate}
                  />
        </React.Fragment>
      
      
      


      </div>
    </React.Fragment>
    :
    <React.Fragment>
      <div className="no-classes-container">
        <div className="no-classes-logo-container"><Logo logoStyle="navbar"/></div>

        <h1>Please create a class to get started!</h1>
        <NewClass {...this} {...props} />

      </div>
    </React.Fragment>
  );
};

const mapStateToProps = (state) => {
  return {
    activeClass: state.activeClass,
    classList: state.classList,
    userId:state.userId
  }
}
const mapDispatchToProps = (dispatch) => {
  return{
    handleUpdate: (temp, tempClassList) => {dispatch({type:'UPDATE_CLASS', temp,tempClassList })}
    
  }
}
export default connect(mapStateToProps, mapDispatchToProps)(Classes);
