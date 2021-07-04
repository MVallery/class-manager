import React from 'react';
import ColorLens from "@material-ui/icons/ColorLens";
import IconButton from "@material-ui/core/IconButton";
import { TwitterPicker } from "react-color";
import { checkActiveClass } from '../../../../app-files/general';
import { useSelector, useDispatch } from 'react-redux';

const ButtonColor = props => {
  const {smallStyle, index} = props;
  const activeClass = useSelector((state)=>state.activeClass)
  const classList = useSelector((state)=>state.classList)
  const dispatch = useDispatch();
  const popover = {
    position: "absolute",
    zIndex: "2",
    top: "950%",
    left: "0%",
  };
  const cover = {
    position: "fixed",
    top: "0px",
    right: "0px",
    bottom: "0px",
    left: "0px",
  };

  const handleCloseColorPicker = (index) => {
    let tempClassList = JSON.parse(JSON.stringify(classList));
    let temp = JSON.parse(JSON.stringify(activeClass));

    temp.students[index].displayColorPicker = false;
    tempClassList = checkActiveClass(tempClassList, temp);
    dispatch({type:"UPDATE_CLASS", temp, tempClassList})
  };

  const handleColorSelect = (index, e) => {
    let temp = JSON.parse(JSON.stringify(activeClass));
    let tempClassList = JSON.parse(JSON.stringify(classList));

    temp.students[index].background = e.hex;
    tempClassList = checkActiveClass(tempClassList, temp);
    if (props.userId) {
      props.handleDatabaseUpdate(temp);
    }
    dispatch({type:"UPDATE_CLASS", temp, tempClassList})
  };

  const handleOpenColorPicker = (index) => {
    let tempClassList = JSON.parse(JSON.stringify(classList));
    let temp = JSON.parse(JSON.stringify(activeClass));
    temp.students[index].displayColorPicker =
      !temp.students[index].displayColorPicker;
    tempClassList = checkActiveClass(tempClassList, temp);
    dispatch({type:"UPDATE_CLASS", temp, tempClassList})
  };

  return(
    <React.Fragment>
    <div className={`desk-button ${smallStyle.smallButtons}`}>
      <IconButton
        onClick={() => {
          handleOpenColorPicker(index);
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
            handleCloseColorPicker(index);
          }}
        />
        <TwitterPicker
          style={{ zIndex: 200, position: "absolute" }}
          onChange={(e) => {
            handleColorSelect(index, e);
          }}
        />
      </div>
    ) : null}
    </React.Fragment>
  )
}

export default ButtonColor;