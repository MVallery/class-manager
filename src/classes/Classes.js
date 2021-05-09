import React, { useEffect, useState, useContext } from "react";
import { connect } from 'react-redux';
import NavBar from "../general/components/NavBar";

import {CSSTransition} from 'react-transition-group';
import StudentCard from "./components/StudentCard";
import { DragDropContext, Droppable } from "react-beautiful-dnd";
import {
  cap,
  checkActiveClass,

} from "../app-files/general";

import {useHttpClient} from '../general/http-hook';
import Modal from "../general/components/Modal";
import ClassTitleMenu from "./components/ClassTitleMenu";
import GeneralClassButtons from "./components/GeneralClassButtons";
import NewClass from './components/NewClass'
import "./Classes.css";

const Classes = (props) => {
  const { activeClass, classList } = props;
  console.log("classList inside Classes:", props.classList);

  const {isLoading, error, sendRequest, clearError } = useHttpClient();
  const [newNameListState, setNewNameListState] = useState([]);

  const [showAddNewClassModal, setAddNewClassModal] = useState(false);
  const [mounted, setMounted] = useState(false);
  const cancelAddNewClassHandler = () => {
    setAddNewClassModal(false);
  };
  const [smallStyle, setSmallStyle] = useState({
    smallGroup: null,
    smallIcon: null,
    smallButtons: null,
    smallFont: null,
  });
  // const [container, setContainer] = useState('row-container')

  const showAddNewClassHandler = () => {
    setAddNewClassModal(true);
  };
  const handleSmallStyle = (state) => {
    setSmallStyle(state)
  }
  const handleDatabaseUpdate= async(tempActiveClass)=> {
    console.log(activeClass)
    console.log('inside handledatabaseupdate', activeClass.id)
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
  // useEffect(()=>{
  //   if (mounted === true){
  //     const updateClass = async () => {
  //       try {
  //         await sendRequest('http://localhost:5000/api/users/'+auth.userId+'/'+activeClass.id, "PATCH", 
  //          JSON.stringify({
  //            title: activeClass.title,
  //            students: activeClass.students,
  //            styling: activeClass.styling,
  //            count: activeClass.count,
     
  //          }), {
  //            'Content-Type': 'application/json'
  //          }
  //          )
     
  //        } catch(err) {
  //          console.log(err)
  //        }
  //        updateClass();
  //     }

  //   } else {
  //     setMounted(true)
  //     return 
  //   }


  // }, [activeClass])
  const handleOnDragEnd = (result) => {
    console.log(result);
    if (!result.destination) {
      return;
    }
    console.log(activeClass);
    let temp = JSON.parse(JSON.stringify(activeClass));
    let tempClassList = JSON.parse(JSON.stringify(classList));
    console.log(temp);

    let draggedItem = activeClass.students[result.source.index];
    let swap = activeClass.students[result.destination.index];
    console.log(result.source.index, result.destination.index);
    // console.log(draggedItem,swap)
    if (draggedItem === swap) {
      return;
    }
    temp.students = activeClass.students.filter(
      (item) => item !== draggedItem && item !== swap
    );
    if (
      result.destination.index > temp.length - 1 ||
      result.destination.index
    ) {
      if (result.source.index > result.destination.index) {
        temp.students.splice(result.destination.index, 0, draggedItem);
        temp.students.splice(result.source.index, 0, swap);
      } else {
        temp.students.splice(result.source.index, 0, swap);
        temp.students.splice(result.destination.index, 0, draggedItem);
      }
    } else {
      if (result.source.index > result.destination.index) {
        temp.students.splice(result.destination.index, 0, draggedItem);
        temp.students.splice(result.source.index, 0, swap);
      } else {
        temp.students.splice(result.source.index, 0, swap);
        temp.students.splice(result.destination.index, 0, draggedItem);
      }
    }

    let newTempList = checkActiveClass(tempClassList, temp);
    handleDatabaseUpdate(temp);
    props.handleUpdate(temp, newTempList)

  };
  const handleOnDragStart = (result) => {};

  const studentCards = activeClass?props.activeClass.students.map((record, index) => {
    function getStyle(style, snapshot) {
      //ensures that icons do not shift when moving other ones since we are swapping versus reordering all students.
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

    // console.log('record:',record)
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
    console.log(activeClass.styling.size);
    console.log("handleGroupStyling", activeClass);
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
    console.log(activeClass.styling.groups);
    let remainder = activeClass.length % activeClass.styling.groups;
    let formattedNameList = [];
    let temp = JSON.parse(JSON.stringify(props.activeClass));
    let tempClassList = JSON.parse(JSON.stringify(props.classList));

    for (let i = 0; i < studentCards.length; i += activeClass.styling.groups) {
      let [newArray, newArray2] = [[], []];
      if (activeClass.styling.groups === 4) {
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

    console.log("studentCards:", studentCards);
    console.log("formattedNameList:", formattedNameList);
    let newNameList = formattedNameList.map((array, index) => {
      return (
        <div className="droppable-container">
          <Droppable
            droppableId={`group-${index}`}
            index={index}
            direction={
              activeClass.styling.format === "rows" ? "horizontal" : "vertical"
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
              activeClass.styling.format === "rows" ? "horizontal" : "vertical"
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
        onDragStart={handleOnDragStart}
        onDragEnd={handleOnDragEnd}
      >
        <div className={mainGroupContainer}>
          <div className={groupContainer}>{newNameList}</div>
        </div>
      </DragDropContext>
    );
    let newTempList = checkActiveClass(tempClassList, temp);

    console.log(newNameList);
    setNewNameListState(newNameList);
  };

  useEffect(() => {
    console.log("useEffect");
    handleGroupStyling();
    handleFormatting();
  }, [props.activeClass]); //props.generalSelection.groups

  return (
    <React.Fragment>
        <Modal
        show={showAddNewClassModal}
        onCancel={cancelAddNewClassHandler}
        header={<div>Create a new class: </div>}
        contentClass="addNewStu-modal"
        footerClass="worksheet-item__modal-actions"
        // footer={}
      >
        <NewClass {...props} cancelAddNewClassHandler={cancelAddNewClassHandler} />
      </Modal>
      <NavBar
        handleState={props.handleState}
        showAddNewClassHandler={showAddNewClassHandler}
      >
        <ClassTitleMenu {...props} handleDatabaseUpdate={handleDatabaseUpdate} handleSmallStyle={handleSmallStyle}/>
      </NavBar>

      <div className="classes-container">
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
