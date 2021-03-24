import React from 'react'
import Checkbox from "@material-ui/core/Checkbox";
import ColorLens from "@material-ui/icons/ColorLens";
import FormGroup from "@material-ui/core/FormGroup";
import IconButton from "@material-ui/core/IconButton";
import ThumbDown from "@material-ui/icons/ThumbDown";
import ThumbUp from "@material-ui/icons/ThumbUp";
import { SketchPicker } from "react-color";
import FormLabel from "@material-ui/core/FormLabel";
import FormControlLabel from "@material-ui/core/FormControlLabel";


const StudentCard = (props) => {
  const {key, keyString, record, myStyle, index, popover, cover,
      classList, activeClass} = props
  const checkActiveClass = (array, obj) => {
    // let newArray
    for (let i in array) {
      if (array[i].title ===obj.title) {
        array[i] = obj
      }
    }
    return array

  }
  const handleSelection = (index, key) => {
    let temp = JSON.parse(JSON.stringify(activeClass));
    let tempClassList = JSON.parse(JSON.stringify(classList))
    temp.students[index].isChecked = !temp.students[index].isChecked;
    let newTempList = checkActiveClass(tempClassList, temp)
    props.handleState({ activeClass: temp, classList: newTempList});
  };

  const handleAdd = (index,key) => {
    // console.log('handleAdd',index,key)
    let temp = JSON.parse(JSON.stringify(activeClass));
    let tempClassList = JSON.parse(JSON.stringify(classList))

    // console.log(temp)
    temp.students[index].count = temp.students[index].count + 1;
    temp.count = temp.count+1
    let newTempList = checkActiveClass(tempClassList, temp)

    props.handleState({
      activeClass: temp,
      classList: newTempList
      // classDisplay:tempClassDisplay
    });
  };

  const handleSub = (index,key) => {
    let temp = JSON.parse(JSON.stringify(activeClass));
    let tempClassList = JSON.parse(JSON.stringify(classList))

    temp.students[index].count = temp.students[index].count - 1;
    temp.count = temp.count -1
    let newTempList = checkActiveClass(tempClassList, temp)

    props.handleState({
      activeClass: temp,
      classList: newTempList
    });
  };

  const handleReset = (index,key) => {
    let temp = JSON.parse(JSON.stringify(activeClass));
    let tempClassList = JSON.parse(JSON.stringify(classList))

    temp.students[index].count = 0;
    let newTempList = checkActiveClass(tempClassList, temp)

    props.handleStatee({
      activeClass: temp,
      classList: newTempList
      //count: 0
    });
  };
  const handleResetMulti = (index, key) => {
    let temp = JSON.parse(JSON.stringify(activeClass));
    let tempClassList = JSON.parse(JSON.stringify(classList))

    for (let x in temp.students) {
      if (temp.students[x].isChecked === true) {
        temp.count = temp.count-temp.students[x].count
        temp.students[x].count = 0;
      }
    }
    let newTempList = checkActiveClass(tempClassList, temp)

    props.handleState({
      activeClass: temp,
      classList: newTempList
    });
  };
  const handleDelete = (rowIndex,index) => {
    let temp = JSON.parse(JSON.stringify(activeClass));
    let tempClassList = JSON.parse(JSON.stringify(classList))

    if (window.confirm("Are you sure you want to delete this student?")) {
      temp.students[index].name = 0;
      temp.students.splice(index, 1);
    let newTempList = this.checkActiveClass(tempClassList, temp)

    props.handleState({
        activeClass: temp,
        classList: newTempList
      });
    } else {
    }
  };



  const handleBottomNav = () => {};

  const handleColorClick = (index,key) => {
    // console.log('handlecolorclicked')
    let tempClassList = JSON.parse(JSON.stringify(classList))

    let temp = JSON.parse(JSON.stringify(activeClass));
    temp.students[index].displayColorPicker = !temp.students[index].displayColorPicker;
    let newTempList = checkActiveClass(tempClassList, temp)

    props.handleState({ activeClass: temp, classList: newTempList});
  };
  const handleClose = (index,key) => {
    let tempClassList = JSON.parse(JSON.stringify(classList))

    let temp = JSON.parse(JSON.stringify(activeClass));

    temp.students[index].displayColorPicker = false;
    let newTempList = checkActiveClass(tempClassList, temp)

    props.handleState({ activeClass: temp, classList: newTempList});
  };

  const handleColorSelect = (index,key, e) => {
    let temp = JSON.parse(JSON.stringify(activeClass));
    let tempClassList = JSON.parse(JSON.stringify(classList))

    temp.students[index].background = e.hex;
    let newTempList = checkActiveClass(tempClassList, temp)

    props.handleState({ activeClass: temp,classList: newTempList });
  };
  // const onDragStart = (e, index) => {
  //   this.draggedItem = this.state.activeClass.students[index]; //griddisplay changed from nameList
    
  //   this.dragIndex = index
  //   e.dataTransfer.effectAllowed = "move";
  //   e.dataTransfer.setData("text/html", e.target.parentNode);
  //   e.dataTransfer.setDragImage(e.target.parentNode, 20, 20);
  // };
  // const onDragOver = (index) => {
  //   const draggedOverItem = this.state.activeClass.students[index];
  //   // if the item is dragged over itself, ignore
  //   if (this.draggedItem === draggedOverItem) {
  //     return;
  //   }
  //   // filter out the currently dragged item
  //   let swap = this.state.activeClass.students[index]
  //   this.activeClass.students = this.state.activeClass.students.filter(
  //     (item) => item !== this.draggedItem && item !== swap
  //   );

  //   // console.log(index)
  //   if (this.dragIndex>index) {
  //     this.activeClass.students.splice(index, 0, this.draggedItem); 
  //     this.activeClass.students.splice(this.dragIndex, 0, swap)
  //   } else {
  //     this.activeClass.students.splice(this.dragIndex, 0, swap)
  //     this.activeClass.students.splice(index, 0, this.draggedItem); 
  //   }
  //   // add the dragged item after the dragged over item

  // };
  // const onDragEnd = (index) => {
  //   let tempClassList = JSON.parse(JSON.stringify(this.state.classList))
  //   let newTempList = this.checkActiveClass(tempClassList, this.activeClass)
  //   props.handleState({ activeClass:this.activeClass, classList: newTempList });


  //   this.draggedIdx = null;
  // };


  return (
    <div
      className="student-card-container"
      key={record.key}
      // style={hideStyle}
    >
      <div
        style={myStyle}
        className="drag"
        draggable="true"
        // onDragStart={(e) => onDragStart(e, index)}
        // onDragEnd={onDragEnd}
        // onDragOver={() => onDragOver(index)}
        // className={classes.count}  className={classes.count} on record.name a& record.count
      >
        {/* <div className="student-name-points-container">
          <div className="student-card-name">
            <div>{record.name}</div>
          </div>
        </div>
        <div className="student-card-points">
          <div>{record.count}</div>
        </div> */}
        {/* <div className="student-card-popup"> */}
          {/* <IconButton
            onClick={() => {
              handleAdd(index);
            }}
          >
            <ThumbUp />
          </IconButton>
          <IconButton className="icon"
            onClick={() => {
              handleSub(index);
            }}
          >
            <ThumbDown />
          </IconButton> */}
          {/* <IconButton
            onClick={() => {
              handleColorClick(index);
            }}
          >
            <ColorLens />
          </IconButton> */}
          {/* <button onClick={() => {this.handleColorClick(index);}}>Color:</button> */}

          {/* {activeClass.students[index].displayColorPicker ? (
            <div style={popover}>
              <div
                style={cover}
                onClick={() => {
                  handleClose(index);
                }}
              />
              {/* <SketchPicker
                color={activeClass.students[index].background}
                onChange={(e) => {
                  handleColorSelect(index, e);
                }}
              /> */}
            {/* </div> */}
          {/* ) : null} */}
          {/* </div> */}
          <div>
            <FormGroup row>
              <div key={record.key}>
                <FormControlLabel
                  // control={
                    // <Checkbox
                    //   label={key}
                    //   checked={activeClass.students[index].isChecked}
                    //   onChange={() => {
                    //     handleSelection(index);
                    //   }}
                    //   value={keyString}
                    // ></Checkbox>
                  // }
                />
              </div>
            </FormGroup>
          </div>
        {/* </div> */}
      </div>

    </div>
  );
}

export default StudentCard