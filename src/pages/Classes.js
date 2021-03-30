import React, { useEffect, useState } from "react";
import { SketchPicker } from "react-color";

import MenuItem from "@material-ui/core/MenuItem";
import Menu from "@material-ui/core/Menu";
import MenuIcon from '@material-ui/icons/Menu';
import ClassButtonList from "../components/ClassButtonList";
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
import FormLabel from "@material-ui/core/FormLabel";
import TextField from '@material-ui/core/TextField';

import { cap, checkActiveClass, colorPallet, shuffleArray } from "../app-files/general";
import Modal from "../components/Modal";
import NewClass from "./NewClass"
import GeneralClassButtons from "../components/GeneralClassButtons";
import "./Classes.css";
import { Brightness1 } from "@material-ui/icons";


const Classes = (props) => {
  const { activeClass, classList } = props;
  console.log("classList inside Classes:", props.classList);
  const [newNameListState, setNewNameListState] = useState([]);
  const [showAddStudentModal, setAddStudentModal] = useState(false);
  const [formatModal, setFormatModal] = useState(false);
  const [showAddNewClassModal, setAddNewClassModal] = useState(false);
  const [format, setFormat] = useState("");
  const [changePointsStyle, setChangePointStyle] = useState({})

  // const [container, setContainer] = useState('row-container')
  const showAddStudentHandler = () => {
    setAddStudentModal(true);
    handleCloseMenu();
  }
  const cancelAddStudentHandler = () => {
    setAddStudentModal(false);    
  }

  const showAddNewClassHandler = () => {
    setAddNewClassModal(true);
    handleCloseMainMenu();
  }
  const cancelAddNewClassHandler = () => {
    setAddNewClassModal(false)
  }

  const showFormatModalHandler = () => {
    setFormatModal(true);
    handleCloseMenu();
  }
  const submitFormatModalHandler = () => setFormatModal(false);

  const handleShuffleClass = () => {
    handleCloseMenu();
    let temp = JSON.parse(JSON.stringify(activeClass))
    let tempClassList = JSON.parse(JSON.stringify(classList));
    let shuffledTemp = shuffleArray(temp.students);
    temp.students = shuffledTemp
    let newTempList = checkActiveClass(tempClassList, temp);

    props.handleState({ activeClass:temp, classList:newTempList});
  }
  const handleSelection = (index, key) => {
    let temp = JSON.parse(JSON.stringify(activeClass));
    let tempClassList = JSON.parse(JSON.stringify(classList));
    temp.students[index].isChecked = !temp.students[index].isChecked;
    let newTempList = checkActiveClass(tempClassList, temp);
    props.handleState({ activeClass: temp, classList: newTempList });
  };

  const handleAdd = (index, key) => {
    // console.log('handleAdd',index,key)
    let temp = JSON.parse(JSON.stringify(activeClass));
    let tempClassList = JSON.parse(JSON.stringify(classList));

    // console.log(temp)
    temp.students[index].count = temp.students[index].count + 1;
    temp.count = temp.count + 1;
    temp.students[index].pointStyle = 'positive'
    let newTempList = checkActiveClass(tempClassList, temp);
    

    // setChangePointStyle({
    //   backgroundImage:'radial-gradient(circle, yellow,transparent)',
    // })
    // setTimeout(()=>{
    //   setChangePointStyle({
    //     backgroundImage:null,
    //   })
    // },2000)

    props.handleState({
      activeClass: temp,
      classList: newTempList,
      // classDisplay:tempClassDisplay
    });
  };
  const handleClearPointStyle = (index) => {
    let temp = JSON.parse(JSON.stringify(activeClass));
    let tempClassList = JSON.parse(JSON.stringify(classList));
    temp.students[index].pointStyle = null
    let newTempList = checkActiveClass(tempClassList, temp);


    props.handleState({
      activeClass: temp,
      classList: newTempList,
      // classDisplay:tempClassDisplay
    });
  }

  const handleSub = (index, key) => {
    let temp = JSON.parse(JSON.stringify(activeClass));
    let tempClassList = JSON.parse(JSON.stringify(classList));

    temp.students[index].count = temp.students[index].count - 1;
    temp.count = temp.count - 1;
    temp.students[index].pointStyle = 'negative'

    let newTempList = checkActiveClass(tempClassList, temp);

    props.handleState({
      activeClass: temp,
      classList: newTempList,
    });
  };

  const handleColorClick = (index, key) => {
    // console.log('handlecolorclicked')
    let tempClassList = JSON.parse(JSON.stringify(classList));

    let temp = JSON.parse(JSON.stringify(activeClass));
    temp.students[index].displayColorPicker = !temp.students[index]
      .displayColorPicker;
    let newTempList = checkActiveClass(tempClassList, temp);

    props.handleState({ activeClass: temp, classList: newTempList });
  };
  const handleClose = (index, key) => {
    let tempClassList = JSON.parse(JSON.stringify(classList));

    let temp = JSON.parse(JSON.stringify(activeClass));

    temp.students[index].displayColorPicker = false;
    let newTempList = checkActiveClass(tempClassList, temp);

    props.handleState({ activeClass: temp, classList: newTempList });
  };

  const handleColorSelect = (index, e) => {
    let temp = JSON.parse(JSON.stringify(activeClass));
    let tempClassList = JSON.parse(JSON.stringify(classList));

    temp.students[index].background = e.hex;
    let newTempList = checkActiveClass(tempClassList, temp);

    props.handleState({ activeClass: temp, classList: newTempList });
  };
  const [dropdownDisplay, setDropdownDisplay] = React.useState(null);
  const [mainDropdownDisplay, setMainDropdownDisplay] = React.useState(null);

  const handleClick = (e) => {
    setDropdownDisplay(e.currentTarget);
  };
  const handleMainMenuClick = (e) => {
    setMainDropdownDisplay(e.currentTarget);
  };
  const handleCloseMenu = () => {
    setDropdownDisplay(null);
  };
  const handleCloseMainMenu = () => {
    setMainDropdownDisplay(null);
  };
  let draggedItem;
  let dragIndex;
  let newActiveClass = activeClass;
  const onDragStart = (e, index) => {
    draggedItem = activeClass.students[index]; //griddisplay changed from nameList
    console.log('ondragstart', activeClass.students)
    dragIndex = index;
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
    let swap = activeClass.students[index];
    newActiveClass.students = activeClass.students.filter(
      (item) => item !== draggedItem && item !== swap
    );

    // console.log(index)
    if (dragIndex > index) {
      newActiveClass.students.splice(index, 0, draggedItem);
      newActiveClass.students.splice(dragIndex, 0, swap);
    } else {
      newActiveClass.students.splice(dragIndex, 0, swap);
      newActiveClass.students.splice(index, 0, draggedItem);
    }
    // add the dragged item after the dragged over item
  };
  const onDragEnd = (index) => {
    console.log('onDragEnd',newActiveClass.students)
    let tempClassList = JSON.parse(JSON.stringify(classList));

    let newTempList = checkActiveClass(tempClassList, newActiveClass);
    props.handleState({ activeClass: newActiveClass, classList: newTempList });
    handleGroup();
    handleFormatting();
    // draggedIdx = null;
  };
  // const { classes } = props;
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
      
  
  const studentCards = props.activeClass.students.map((record, index) => {
    // console.log('record:',record)
    console.log(record.pointStyle)
    var key = record.key;
    let keyString = JSON.parse(JSON.stringify(key));
    var backgroundStyle = {
      backgroundColor: record.background,
      filter:'brightness(90%)'

    };
    var backgroundLightStyle = {
      backgroundColor: record.background,
      backgroundImage: `linear-gradient(181deg, rgb(117, 117, 117), ${record.background} 10%, ${record.background})`,
      // backgroundImage: `radial-gradient(
      //   circle at right, rgb(117, 117, 117), ${record.background} 40%)`,
      // filter:'brightness(105%)', //causing flicker on select
    }
    var selectStyle = {
      display: record.isChecked && 'inline'
    };
    var pointStyle = record.pointStyle === 'positive' ? {
      
      backgroundImage: 'radial-gradient(circle, yellow, transparent)',
    }:record.pointStyle==='negative'? {backgroundImage:'radial-gradient(circle, red, transparent)'} :null

    return (
      
      <div className="student-card-container" style={pointStyle}>
        <div
          key={record.key}
          className="drag"
          draggable="true"
          onDragStart={(e) => onDragStart(e, index)}
          onDragEnd={onDragEnd}
          onDragOver={() => onDragOver(index)}
        >
          <div className="student-icon-container">
            <div className="student-head-button-container">
              <div className="pts-buttons">
                <IconButton
                  className="icon"
                  onClick={() => {
                    handleSub(index);
                    setTimeout(()=>{
                      handleClearPointStyle(index)
                    },[1000])
                  }}
                >
                  <ThumbDown />
                </IconButton>
              </div>
              <div className="student-head"></div>

              <div className="pts-buttons">
                <IconButton
                  onClick={() => {
                    handleAdd(index);
                    setTimeout(()=>{
                      handleClearPointStyle(index)
                    },[1000])
                  }}
                >
                  <ThumbUp />
                </IconButton>
              </div>
            </div>
            <div className="student-body"></div>
          </div>
          <div className="desk-top" style={backgroundStyle}></div>
          <div className="desk" style={backgroundLightStyle}>
            {record.name}
            <br />

            <div className="desk-button-main-container">
              <div className="desk-button-container">

                <div className="desk-button">
                <IconButton
                  onClick={() => {
                    handleColorClick(index);
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
              <div className="desk-button" style={selectStyle}>
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
              {record.count}           
            </div>
          </div>
        </div>
      </div>
      
    );
  });

  // console.log("generalSelection:", props.generalSelection);


  let group;
  let groupContainer;
  let mainGroupContainer;
  const handleGroup = () => {
    console.log('handleGroup',activeClass)
    mainGroupContainer = "group-main-container";

    if (format === "rows") {
      group = "row";
      groupContainer = "row-container";
      mainGroupContainer = "row-main-container";
      // setContainer('row-container')
    } else {
      if (activeClass.styling.groups === 4) {
        group = "group4";
        groupContainer = "group-container4";
        // setContainer('group-container4')
      } else if (
        activeClass.styling.groups === 5 ||
        activeClass.styling.groups === 6
      ) {
        group = "group56";
        groupContainer = "group-container56";
        // setContainer('group-container56')
      } else if (activeClass.styling.groups === 7) {
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
      // const randColor = "#" + Math.floor(Math.random() * 16777215).toString(16);
      const id = cap(newNameArray[x]) + Math.floor(Math.random() * 20);
      let record = {
        name: cap(newNameArray[x]),
        count: 0,
        background: colorPallet(activeClass.styling.theme),
        key: id,
        isChecked: false,
        displayColorPicker: false,
      };
      temp.students.push(record);
    }
    setAddStudentModal(false)
    props.handleState({
      activeClass: temp,
      inputNames: "",
    });
  };
  const handleFormatting = () => {
    console.log(format);
    // console.log(props.generalSelection.groups);
    let formattedNameList = [];
    for (
      let i = 0;
      i < studentCards.length;
      i += activeClass.styling.groups
    ) {
      let newArray = studentCards.slice(i, i + activeClass.styling.groups);
      // let newArray = props.studentCards.splice(i, props.generalSelection.groups);
      formattedNameList.push(newArray);
    }
    console.log("studentCards:", studentCards);
    console.log("formattedNameList:", formattedNameList);
    let newNameList = formattedNameList.map((array) => {
      return <div className={group}>{array}</div>;
    });
    newNameList = (
      <div className={mainGroupContainer}>
        <div className={groupContainer}>{newNameList}</div>
      </div>
    );
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
    console.log('useEffect')
    handleGroup();
    handleFormatting();
  }, [format, props.activeClass,]); //props.generalSelection.groups

  return (
    <React.Fragment>
      <Modal
        show={showAddStudentModal}
        onCancel={cancelAddStudentHandler}
        header= {<div>Add students to {activeClass.title} </div>}
        footerClass="worksheet-item__modal-actions"
        footer={
          <React.Fragment>
            <button onClick={handleNewStu}>
              ADD STUDENT(S)
            </button>
          </React.Fragment>
        }
      >
      <TextField 
        variant='filled'
        id = 'filled-basic'
        label={<span className= ''>Student Names:</span>}
        name="inputNames"
        // type="number"
        value={props.inputNames}
        onChange={props.handleChange}
        className='text-area-styles'
        placeholder="Input student names, separated by a comma"
        required
        multiline
        rows={2}
        rowsMax={3}
        /> 
      </Modal>
      <Modal
        show={formatModal}
        onCancel={submitFormatModalHandler}
        header= {<div>Change the class layout of {activeClass.title} </div>}
        footerClass="worksheet-item__modal-actions"
        footer={
          <React.Fragment>
            <button onClick={submitFormatModalHandler}>
              SUBMIT
            </button>
          </React.Fragment>
        }
      >
          <FormControl component="fieldset">
          <FormLabel>Layout</FormLabel>

            <RadioGroup
              aria-label="format"
              name="format"
              value={props.value}
              onChange={handleChange}
            >
              <FormControlLabel
                value="groups"
                control={<Radio />}
                label="Groups"
              />
              <FormControlLabel value="rows" control={<Radio />} label="Rows" />
            </RadioGroup>
          </FormControl>

          <FormControl>
            <InputLabel>Amount in each group/row</InputLabel>

            <Select
              className="select-form"
              value={activeClass.styling.groups}
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
          <FormControl>
            <InputLabel>Color Theme</InputLabel>

            <Select
              className="select-form"
              style={{width:'200px'}}
              value={activeClass.styling.theme}
              onChange={props.handleThemeInput}
              width={10}
              displayEmpty
            >
              <MenuItem value='lightBlueGreen'>Light Blue Green</MenuItem>
              <MenuItem value='lightBluePurple'>Light Blue Purple</MenuItem>
              <MenuItem value='darkBluePurple'>Dark Blue Purple</MenuItem>
            </Select>
            {/* <FormHelperText>Color Theme</FormHelperText> */}
          </FormControl>
      </Modal>
      <Modal
        show={showAddNewClassModal}
        onCancel={cancelAddNewClassHandler}
        header= {<div>Create a new class: </div>}
        footerClass="worksheet-item__modal-actions"
        // footer={}
      >
        <NewClass
                    inputNames={props.inputNames}
                    handleChange={props.handleChange}
                    activeClass = {activeClass}
                    handleState={props.handleState}
                    handleInput = {props.handleInput}
                    inputClassName={props.inputClassName}
                    classList={props.classList}
                    cancelAddNewClassHandler = {cancelAddNewClassHandler}
                    
        />
      </Modal>
      <div className="classes-container">
        <div className="classes-title-menu-container">
          <h1>{props.activeClass.title}</h1>
          <div className="classes-count">{props.activeClass.count}</div>
          <IconButton
              onClick={handleClick}>
            <MenuIcon/>
          </IconButton>
          <Menu
            id="simple-menu"
            anchorEl={dropdownDisplay}
            keepMounted
            open={Boolean(dropdownDisplay)}
            onClose={handleCloseMenu}
            getContentAnchorEl={null}
          >
            <MenuItem onClick={showAddStudentHandler}>Add Student</MenuItem>
            <MenuItem onClick={showFormatModalHandler}>Change Layout</MenuItem>
            <MenuItem onClick={handleShuffleClass}>Shuffle Class</MenuItem>

            <MenuItem onClick={handleCloseMenu}>Delete</MenuItem>
          </Menu>
          <IconButton
              onClick={handleMainMenuClick}>
            Classes
          </IconButton>
          <Menu
            id="simple-menu"
            anchorEl={mainDropdownDisplay}
            keepMounted
            open={Boolean(mainDropdownDisplay)}
            onClose={handleCloseMainMenu}
            getContentAnchorEl={null}
          >
            <ClassButtonList
                        handleState={props.handleState}
                        activeClass={props.activeClass}
                        classList={props.classList}
                        handleCloseMainMenu={handleCloseMainMenu}
            />
            <MenuItem onClick={showAddNewClassHandler}>Add New Class</MenuItem>


          </Menu>
        </div>

        <div>{newNameListState}</div>

        <div className="multi-select-container">
          <div className="multi-select">
            <GeneralClassButtons
              activeClass={props.activeClass}
              classList={props.classList}
              handleState={props.handleState}
            />
          </div>
        </div>
      </div>
    </React.Fragment>
  );
};

export default Classes;
