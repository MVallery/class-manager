import React, { useEffect, useState } from "react";
import {Link} from 'react-router-dom'

import FormHelperText from "@material-ui/core/FormHelperText";
import MenuItem from "@material-ui/core/MenuItem";
import ClassButtonList from '../components/ClassButtonList'
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";
import Radio from "@material-ui/core/Radio";
import RadioGroup from "@material-ui/core/RadioGroup";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import InputLabel from "@material-ui/core/InputLabel";
import Checkbox from "@material-ui/core/Checkbox";
import ColorLens from "@material-ui/icons/ColorLens";
import FormGroup from "@material-ui/core/FormGroup";
import IconButton from "@material-ui/core/IconButton";
import ThumbDown from "@material-ui/icons/ThumbDown";
import ThumbUp from "@material-ui/icons/ThumbUp";
import { SketchPicker } from "react-color";
import FormLabel from "@material-ui/core/FormLabel";
import StudentCard from '../components/StudentCard'
import {cap} from '../app-files/general'
import GeneralClassButtons from '../components/GeneralClassButtons'
import AddIcon from '@material-ui/icons/Add';
import Menu from '@material-ui/core/Menu';

import "./Classes.css";
 
const Classes = (props) => {
  const {activeClass, classList} = props
  console.log('classList inside Classes:',props.classList)
  const [newNameListState, setNewNameListState] = useState([]);
  const [format, setFormat] = useState("");
  // const [container, setContainer] = useState('row-container')
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
    let newTempList = checkActiveClass(tempClassList, temp)

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
  const [dropdownDisplay, setDropdownDisplay] = React.useState(null);

  const handleClick = (e) => {
    setDropdownDisplay(e.currentTarget);
  };
  const handleCloseMenu = () => {
    setDropdownDisplay(null);
  }
  let draggedItem
  let draggedIdx
  let dragIndex
  let newActiveClass = activeClass
  const onDragStart = (e, index) => {
    draggedItem = activeClass.students[index]; //griddisplay changed from nameList
    
    dragIndex = index
    e.dataTransfer.effectAllowed = "move";
    e.dataTransfer.setData("text/html", e.target.parentNode);
    e.dataTransfer.setDragImage(e.target.parentNode, 20, 20);
  };
  const onDragOver = (index) => {
    const draggedOverItem = activeClass.students[index];
    // if the item is dragged over itself, ignore
    if (draggedItem === draggedOverItem) {
      return;
    }
    // filter out the currently dragged item
    let swap = activeClass.students[index]
    newActiveClass.students = activeClass.students.filter(
      (item) => item !== draggedItem && item !== swap
    );

    // console.log(index)
    if (dragIndex>index) {
      newActiveClass.students.splice(index, 0, draggedItem); 
      newActiveClass.students.splice(dragIndex, 0, swap)
    } else {
      newActiveClass.students.splice(dragIndex, 0, swap)
      newActiveClass.students.splice(index, 0, draggedItem); 
    }
    // add the dragged item after the dragged over item

  };
  const onDragEnd = (index) => {
    let tempClassList = JSON.parse(JSON.stringify(classList))
    let newTempList = checkActiveClass(tempClassList, activeClass)
    props.handleState({ activeClass:activeClass, classList: newTempList });


    draggedIdx = null;
  };
  const { classes } = props;
  const popover = {
    position: "absolute",
    zIndex: "2",
  };
  const cover = {
    position: "fixed",
    top: "0px",
    right: "0px",
    bottom: "0px",
    left: "0px",
  };


  const names = props.activeClass.students.map((record, index) => {
    var key = record.key;
    let keyString = JSON.parse(JSON.stringify(key));
    var myStyle = {
      //changes style on top of card
      color: "black",
      fontSize: "20px",
      height: "160px",
      width: "160px",
      borderRadius: "20px",
      boxShadow: "10px 10px 10px grey",
      // margin: "0px 20px 20px",
      backgroundColor: record.background,
    };
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
          onDragStart={(e) => onDragStart(e, index)}
          onDragEnd={onDragEnd}
          onDragOver={() => onDragOver(index)}
          // className={classes.count}  className={classes.count} on record.name a& record.count
        >
          <div className="student-name-points-container">
            <div className="student-card-name">
              <div>{record.name}</div>
            </div>
          </div>
          <div className="student-card-points">
            <div>{record.count}</div>
          </div>
          <div className="student-card-popup">
            <IconButton
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
            </IconButton>
            <IconButton
              onClick={() => {
                handleColorClick(index);
              }}
            >
              <ColorLens />
            </IconButton>
            {/* <button onClick={() => {this.handleColorClick(index);}}>Color:</button> */}
  
            {activeClass.students[index].displayColorPicker ? (
              <div style={popover}>
                <div
                  style={cover}
                  onClick={() => {
                    handleClose(index);
                  }}
                />
                <SketchPicker
                  color={activeClass.students[index].background}
                  onChange={(e) => {
                    handleColorSelect(index, e);
                  }}
                />
              </div>
            ) : null}
            <div>
              <FormGroup row>
                <div key={record.key}>
                  <FormControlLabel
                    control={
                      <Checkbox
                        label={key}
                        checked={activeClass.students[index].isChecked}
                        onChange={() => {
                          handleSelection(index);
                        }}
                        value={keyString}
                      ></Checkbox>
                    }
                  />
                </div>
              </FormGroup>
            </div>
          </div>
        </div>
  
      </div>
    );
  }
  )
  
  // console.log(props.names);
  console.log('generalSelection:',props.generalSelection);
  // console.log(props.classDisplay[0]);
  // var newGridDisplay = props.classDisplay[0].map(row=>{ //did this bc styling wasn't working
  //   return <div className='grid-row'>{row}</div>
  // })

  let group;
  let groupContainer;
  let mainGroupContainer
  const handleGroup = () => {
    mainGroupContainer="group-main-container"

    if (format === "rows") {
      group = "row";
      groupContainer = "row-container";
      mainGroupContainer="row-main-container"
      // setContainer('row-container')
    } else {
      if (props.generalSelection.groups === 4) {
        group = "group4";
        groupContainer = "group-container4";
        // setContainer('group-container4')
      } else if (
        props.generalSelection.groups === 5 ||
        props.generalSelection.groups === 6
      ) {
        group = "group56";
        groupContainer = "group-container56";
        // setContainer('group-container56')
      } else if (props.generalSelection.groups === 7) {
        group = "group7";
        groupContainer = "group-container7";
        // setContainer('group-container7')
      }
    }
  };
  const handleNewStu = () => {
    const newNameArray = props.inputNames.replace(/ /g, "").split(",");
    let temp = JSON.parse(JSON.stringify(props.activeClass));

    for (let x = 0; x < newNameArray.length; x++) {
      const randColor = "#" + Math.floor(Math.random() * 16777215).toString(16);
      const id =
        cap(newNameArray[x]) + Math.floor(Math.random() * 20);
      let record = {
        name: cap(newNameArray[x]),
        count: 0,
        background: randColor,
        key: id,
        isChecked: false,
        displayColorPicker: false,
      };
      temp.students.push(record);
    }
    props.handleState({
      activeClass: temp,
      inputNames: "",
    });
  };
  const handleFormatting = () => {
    console.log(format);
    // console.log(props.generalSelection.groups);
    let formattedNameList = []; 
    for (let i = 0; i < names.length;i+=props.generalSelection.groups) {
      let newArray = names.slice(i, i+props.generalSelection.groups)
      // let newArray = props.names.splice(i, props.generalSelection.groups);
      formattedNameList.push(newArray);
    }
    console.log('names:',names)
    console.log('formattedNameList:',formattedNameList);
    let newNameList = formattedNameList.map((array) => {
      return <div className={group}>{array}</div>;
    });
    newNameList = <div className={mainGroupContainer}><div className={groupContainer}>{newNameList}</div></div>
    console.log(newNameList);
    setNewNameListState(newNameList);
  };
  const handleChange = (e) => {
    console.log("insidehandlechange");
    const { value } = e.target;
    setFormat(value);
    // handleFormatting()
  };
  useEffect(() => {
    handleGroup();
    handleFormatting();
  }, [format, props.activeClass, props.generalSelection.groups]);

  return (
    <React.Fragment>
      <div className="classes-container">
      <div className='classes-cb-list-container'>
        <ClassButtonList handleState= {props.handleState} activeClass = {props.activeClass} classList= {props.classList} />
        <IconButton>
      <Link to='/new-class'><AddIcon style={{ fontSize: 40 }}/></Link>

          {/* <AddIcon/> */}
        </IconButton>
        </div>
      <div className="classes-title-menu-container">
      <h1>{props.activeClass.title}</h1>
      <Menu
              id="simple-menu"
              anchorEl={dropdownDisplay}
              keepMounted
              open={Boolean(dropdownDisplay)}
              onClose={handleCloseMenu}
              getContentAnchorEl={null}
            >
              <MenuItem onClick={handleCloseMenu}>Add Student</MenuItem>
              <MenuItem onClick={handleCloseMenu}>Change Layout</MenuItem>
              <MenuItem onClick={handleCloseMenu}>New Version</MenuItem>
              
              <MenuItem onClick={handleCloseMenu}>Delete</MenuItem>

            </Menu>
      </div>
      

      <div>{newNameListState}</div>
      <div className="temp-container">
      <FormControl component="fieldset">
        <RadioGroup
          aria-label="format"
          name="format"
          value={props.value}
          onChange={handleChange}
        >
          <FormControlLabel value="groups" control={<Radio />} label="Groups" />
          <FormControlLabel value="rows" control={<Radio />} label="Rows" />
        </RadioGroup>
      </FormControl>

      <FormControl>
        <InputLabel></InputLabel>

        <Select className='select-form'
          value={props.generalSelection.groups}
          onChange={props.handleInput}
          displayEmpty
        >
          <MenuItem value={4}>4</MenuItem>
          <MenuItem value={5}>5</MenuItem>
          <MenuItem value={6}>6</MenuItem>
          <MenuItem value={7}>7</MenuItem>
        </Select>
        {/* <FormHelperText>Without label</FormHelperText> */}
      </FormControl>
      <button onClick={props.handleNewStu}>Add Student</button>
</div>
      <div className="multi-select-container">
        <div className="multi-select">
          <GeneralClassButtons activeClass = {props.activeClass} handleState={props.handleState} />
        </div>
        <h1>Total Class Points: {props.activeClass.count}</h1>
      </div>
      </div>
    </React.Fragment>
  );
};

export default Classes;
