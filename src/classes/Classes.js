import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import MainMenu from "./Menu/MainMenu";
import Logo from "../general/components/Logo";
import StudentCard from "./class-display/student-card/StudentCard";
import { DragDropContext } from "react-beautiful-dnd";
import { checkActiveClass } from "../app-files/general";

import { useHttpClient } from "../general/http-hook";
import ClassTitleMenu from "./Menu/edit-class/ClassTitleMenu";
import GeneralClassButtons from "./general-class-buttons/GeneralClassButtons";
import StudentCardsDisplay from "./class-display/StuCardsDisplay";
import StudentContainer from "./class-display/StudentContainer";
import NewClass from "./new-class/NewClass";
import "./Classes.css";
import { getStyle } from "./util";
// Connects all components in subfolder together and acts as the main display page.

const Classes = (props) => {
  const activeClass = useSelector((state) => state.activeClass);
  const classList = useSelector((state) => state.classList);
  const userId = useSelector(state=>state.userId)
  const dispatch = useDispatch()
  const { sendRequest } = useHttpClient();
  const [newNameListState, setNewNameListState] = useState([]);

  const [smallStyle, setSmallStyle] = useState({
    smallIcon: "small-icon",
    smallButtons: "small-buttons",
    smallFont: "small-font",
  });

  const handleSmallStyle = (state) => {
    setSmallStyle(state);
  };
  //a generic database function that is used for any PATCH updates involving the activeClass
  const handleDatabaseUpdate = async (tempActiveClass) => {
    try {
      await sendRequest(
        `${process.env.REACT_APP_API}/api/users/${userId}/${activeClass.id}`,
        "PATCH",

        JSON.stringify({
          title: tempActiveClass.title,
          students: tempActiveClass.students,
          styling: tempActiveClass.styling,
          count: tempActiveClass.count,
        }),
        {
          "Content-Type": "application/json",
        }
      );
    } catch (err) {
      console.log(err);
    }
  };

  const handleDatabaseDelete = async () => {
    try {
      await sendRequest(
        `${process.env.REACT_APP_API}/api/users/${userId}/${activeClass.id}`,
        "DELETE",

        null,
        { Authorization: "Bearer " + props.token }
      );
    } catch (err) {
      console.log(err);
    }
  };

  const studentCards = activeClass
    ? activeClass.students.map((record, index) => {
        return (
          <StudentCard
            smallStyle={smallStyle}
            getStyle={getStyle}
            handleDatabaseUpdate={handleDatabaseUpdate}
            record={record}
            index={index}
          />
        );
      })
    : null;

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
      group = `group${activeClass.styling.groups}`;
      groupContainer = `group-container${activeClass.styling.groups}`;
      if (activeClass.styling.size === "small") {
        smallGroup = `small-group${activeClass.styling.groups}`;
      }
    }
  };

  const handleFormatting = () => {
    let groups = activeClass?.styling.groups;
    let formattedNameList = [];
    //splitting studentCards into separate groups based on amount in each group to make formatting easier later.
    for (let i = 0; i < studentCards.length; i += groups) {
      let half = Math.ceil(groups / 2);
      let newArray = studentCards.slice(i, i + half);
      let newArray2 = studentCards.slice(i + half, i + groups);
      let combinedArray = [newArray, newArray2];

      formattedNameList.push(combinedArray);
    }

    let newNameList = formattedNameList.map((array, index) => {
      return (
        <div className="droppable-container" key={index}>
          <StudentContainer
            index={index}
            group={group}
            smallGroup={smallGroup}
            array={array[0]}
          />
          <StudentContainer
            index={index}
            group={group}
            smallGroup={smallGroup}
            array={array[1]}
          />
        </div>
      );
    });
    newNameList = (
      <DragDropContext onDragEnd={handleOnDragEnd}>
        <div className={mainGroupContainer}>
          <div className={groupContainer}>{newNameList}</div>
        </div>
      </DragDropContext>
    );

    setNewNameListState(newNameList);
  };

  useEffect(() => {
    if (activeClass) {
      handleGroupStyling();
      handleFormatting();
    }
  }, [activeClass]); //props.generalSelection.groups
  const handleOnDragEnd = (result) => {
    
    const dragEndSwap = (activeClass, classList, result)=>{
      let temp = JSON.parse(JSON.stringify(activeClass));
      let tempClassList = JSON.parse(JSON.stringify(classList));
      if (!result.destination) {
        //if outside draggable container dont swap.
        return;
      }
      let draggedItem = temp.students[result.source.index];
      let swappedItem = temp.students[result.destination.index];
      if (draggedItem === swappedItem) {
        return;
      }
      temp.students = temp.students.filter(
        (item) => item !== draggedItem && item !== swappedItem
      );
      //ensuring that the splice does not change the index of the swapped/dragged item.
      if (result.source.index > result.destination.index) {
        temp.students.splice(result.destination.index, 0, draggedItem);
        temp.students.splice(result.source.index, 0, swappedItem);
      } else {
        temp.students.splice(result.source.index, 0, swappedItem);
        temp.students.splice(result.destination.index, 0, draggedItem);
      }
  
      tempClassList = checkActiveClass(tempClassList, temp);
      return {temp, tempClassList}
    }
    const {temp, tempClassList} = dragEndSwap(activeClass, classList, result)
    if (props.userId) {
      props.handleDatabaseUpdate(temp);
    }
    dispatch({type:"UPDATE_CLASS", temp, tempClassList})
  };
  return activeClass ? (
    <React.Fragment>
      <MainMenu
        handleChange={props.handleChange}
      >
        <ClassTitleMenu
          {...props}
          handleDatabaseUpdate={handleDatabaseUpdate}
          handleDatabaseDelete={handleDatabaseDelete}
          handleSmallStyle={handleSmallStyle}
        />
      </MainMenu>
      <div className="classes-container">
        <StudentCardsDisplay
          handleOnDragEnd={handleOnDragEnd}
          handleDatabaseUpdate={handleDatabaseUpdate}
          newNameListState={newNameListState}
        />
        <GeneralClassButtons handleDatabaseUpdate={handleDatabaseUpdate} />
      </div>
    </React.Fragment>
  ) : (
    <React.Fragment>
      <div className="no-classes-container">
        <div className="no-classes-logo-container">
          <Logo logoStyle="navbar" />
        </div>

        <h1>Please create a class to get started!</h1>
        <NewClass {...this} {...props} />
      </div>
    </React.Fragment>
  );
};

export default Classes;
