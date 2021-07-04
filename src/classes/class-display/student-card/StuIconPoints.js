import React from "react";
import PointButton from "./PointButton";
import ThumbDown from "@material-ui/icons/ThumbDown";
import ThumbUp from "@material-ui/icons/ThumbUp";
import { checkActiveClass } from "../../../app-files/general";
import { useSelector, useDispatch } from "react-redux";
import "./StudentCard.css";

//student icon and point buttons, displayed in StudentCard
const StuIconPoints = (props) => {
  const activeClass = useSelector((state) => state.activeClass);
  const classList = useSelector((state) => state.classList);
  const dispatch = useDispatch()
  const { index } = props;

  const handleAdd = (index) => {
    console.log('add')
    let temp = JSON.parse(JSON.stringify(activeClass));
    let tempClassList = JSON.parse(JSON.stringify(classList));
    temp.students[index].count = temp.students[index].count + 1;
    temp.count = temp.count + 1;
    temp.students[index].pointStyle = "positive";
    tempClassList = checkActiveClass(tempClassList, temp);
    if (props.userId) {
      props.handleDatabaseUpdate(temp);
    }
    dispatch({type:'UPDATE_CLASS',temp, tempClassList});
  };

  const handleSub = (index) => {
    let temp = JSON.parse(JSON.stringify(activeClass));
    let tempClassList = JSON.parse(JSON.stringify(classList));

    temp.students[index].count = temp.students[index].count - 1;
    temp.count = temp.count - 1;
    temp.students[index].pointStyle = "negative";

    tempClassList = checkActiveClass(tempClassList, temp);
    if (props.userId) {
      props.handleDatabaseUpdate(temp);
    }
    dispatch({type:'UPDATE_CLASS',temp, tempClassList});
  };

  return (
    <div className="student-icon-container">
      <div className="student-head-button-container">
        <div className="student-head"></div>
        <div className="pts-button-container">
          <PointButton index={index} onClick={handleSub} icon= {<ThumbDown/>} />
          <PointButton index={index} onClick={handleAdd} icon={<ThumbUp/>} />
        </div>
      </div>
      <div className="student-body"></div>
    </div>
  );
};

export default StuIconPoints;
