import React, { useRef } from "react";
import IconButton from "@material-ui/core/IconButton";
import { useSelector, useDispatch } from "react-redux";
import { checkActiveClass } from "../../../app-files/general";

const PointButton = (props) => {
  const { index } = props;
  const activeClass = useSelector((state) => state.activeClass);
  const classList = useSelector((state) => state.classList);
  const dispatch = useDispatch()
  // created refs to use with handleClearPointStyle because it needs to always maintain the
  // most current state since the styles get applied and removed while new points may be added at the same time.
  // without the refs the handleClearPointStyle was resetting the state back to where it was when the setTimeout on the handleClick started.
  const activeClassRef = useRef(activeClass);
  activeClassRef.current = activeClass;
  const classListRef = useRef(classList);
  classListRef.current = classList;
  console.log(classListRef)
  const handleClearPointStyle = (index) => {
    //removes the point style after a setTimeout is triggered so that when a point is added a glow appears for a short time.
    let temp = JSON.parse(JSON.stringify(activeClassRef.current));
    let tempClassList = JSON.parse(JSON.stringify(classListRef.current));
    temp.students[index].pointStyle = null;
    tempClassList = checkActiveClass(tempClassList, temp);
    dispatch({type:'UPDATE_CLASS', temp, tempClassList})
  };
  return (
    <div className="pts-buttons">
      <IconButton
        className="icon"
        onClick={() => {
          props.onClick(index);
          setTimeout(() => {
            handleClearPointStyle(index);
          }, [2000]);
        }}
      >
        {props.icon}
      </IconButton>
    </div>
  );
};

export default PointButton;
