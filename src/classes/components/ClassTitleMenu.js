import React, { useState } from "react";
import MenuItem from "@material-ui/core/MenuItem";
import Menu from "@material-ui/core/Menu";
import MenuIcon from "@material-ui/icons/Menu";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";
import Radio from "@material-ui/core/Radio";
import RadioGroup from "@material-ui/core/RadioGroup";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import InputLabel from "@material-ui/core/InputLabel";
import IconButton from "@material-ui/core/IconButton";
import FormLabel from "@material-ui/core/FormLabel";
import TextField from "@material-ui/core/TextField";
import { connect } from 'react-redux';

import {
  cap,
  checkActiveClass,
  colorPallet,
  shuffleArray,
  randWhole
} from "../../app-files/general";
import Modal from "../../general/components/Modal";

import "./ClassTitleMenu.css";
const ClassTitleMenu = (props) => {
  const { activeClass, classList } = props;
  const [showAddStudentModal, setAddStudentModal] = useState(false);
  const [formatModal, setFormatModal] = useState(false);

  const handleCloseMenu = () => {
    setDropdownDisplay(null);
  };
  const showAddStudentHandler = () => {
    setAddStudentModal(true);
    handleCloseMenu();
  };
  const cancelAddStudentHandler = () => {
    setAddStudentModal(false);
  };


  const showFormatModalHandler = () => {
    setFormatModal(true);
    handleCloseMenu();
  };
  const submitFormatModalHandler = () => setFormatModal(false);

  const handleShuffleClass = () => {
    handleCloseMenu();
    let temp = JSON.parse(JSON.stringify(activeClass));
    let tempClassList = JSON.parse(JSON.stringify(classList));
    let shuffledTemp = shuffleArray(temp.students);
    temp.students = shuffledTemp;
    let newTempList = checkActiveClass(tempClassList, temp);
    props.handleDatabaseUpdate(temp);
    props.handleUpdate(temp, newTempList)

    // props.handleState({ activeClass: temp, classList: newTempList });
  };

  const [dropdownDisplay, setDropdownDisplay] = React.useState(null);

  const handleClick = (e) => {
    setDropdownDisplay(e.currentTarget);
  };
  const handleDeleteMulti = () => {
    let temp = JSON.parse(JSON.stringify(props.activeClass));
    let tempClassList = JSON.parse(JSON.stringify(props.classList));
    console.log(temp)
    console.log(tempClassList)
    if (window.confirm("Are you sure you want to delete these students?")) {
      for (let x = temp.students.length - 1; x >= 0; x--) {
        if (temp.students[x].name === "blank") {
          continue;
        }
        if (temp.students[x].isChecked === true) {
          temp.count = temp.count - temp.students[x].count;
          temp.students.splice(x, 1, { name: "blank", background:temp.students[x].background, key:randWhole(2,1000)});
        }
      }
      let newTempList = checkActiveClass(tempClassList, temp);
      props.handleDatabaseUpdate(temp);
      props.handleUpdate(temp, newTempList)

      // props.handleState({
      //   activeClass: temp,
      //   classList: newTempList,
      // });
    }
  };
  const handleChange = (e) => {
    const { name, value } = e.target;

    let temp = JSON.parse(JSON.stringify(activeClass));
    console.log(temp);
    let tempClassList = JSON.parse(JSON.stringify(classList));
    if (name === "groups") {
      let filteredTemp = temp.students.filter(
        (student) => student.name !== "blank"
      );
      temp.students = filteredTemp;
      console.log(temp);
      let blankDesks = value - (temp.students.length % value); //value - remainder= number of empty desks needed to fill the group
      temp.styling.groups = Number(value);
      if (temp.students.length % value > 0) {
        for (let i = 0; i < blankDesks; i++) {
          temp.students.push({
            name: "blank",
            key: Math.floor(Math.random()),
            background: colorPallet(activeClass.styling.theme),
          });
        }
      }
    }

    // temp.styling[name] = value;
    if (name === "format") {
      temp.styling.format = value;
    }

    if (name === "size") {
      if (value === "regular") {
        console.log(props)
        props.handleSmallStyle({
          smallGroup: null,
          smallIcon: null,
          smallButtons: null,
          smallFont: null,
        });
      }
      if (value === "small") {
        console.log(props)
        props.handleSmallStyle({
          ...props.smallStyle,
          smallIcon: "small-icon",
          smallButtons: "small-buttons",
          smallFont: "small-font",
        });
      }
    }
    let newTempList = checkActiveClass(tempClassList, temp);
    props.handleDatabaseUpdate(temp);
    props.handleUpdate(temp, newTempList)

    // props.handleState({
    //   activeClass: temp,
    //   classList: newTempList,
    // });
    // handleFormatting()
  };
  const handleNewStu = () => {
    const newNameArray = props.inputNames.replace(/ /g, "").split(",");
    let temp = JSON.parse(JSON.stringify(props.activeClass));
    let tempClassList = JSON.parse(JSON.stringify(props.classList));

    for (let i in newNameArray) {
      const id = cap(newNameArray[i]) + Math.floor(Math.random() * 20);
      let record = {
        name: cap(newNameArray[i]),
        count: 0,
        background: colorPallet(activeClass.styling.theme),
        key: id,
        isChecked: false,
        displayColorPicker: false,
      };
      // console.log(Object.values(temp.students).includes('blank'))
      if (temp.students.some((el) => el.name === "blank")) {
        for (let x in temp.students) {
          if (temp.students[x].name === "blank") {
            temp.students.splice(x, 1, record);
            break;
          }
        }
        continue;
      }
      temp.students.push(record);
    }

    let remainder = temp.students.length % temp.styling.groups;
    if (remainder !== 0) {
      for (let i = 0; i < temp.styling.groups - remainder; i++) {
        temp.students.push({
          name: "blank",
          background: colorPallet(activeClass.styling.theme),
          key: Math.floor(Math.random()),
        });
      }
    }

    let newTempList = checkActiveClass(tempClassList, temp);

    setAddStudentModal(false);
    props.handleDatabaseUpdate(temp);
    props.handleUpdate(temp, newTempList)

    props.handleState({
      // activeClass: temp,
      // classList: newTempList,
      inputNames: "",
    });
  };
  return (
    <React.Fragment>
      <div className="classes-title-menu-container">
          <div className="classes-chalkboard-container">
            <div className="classes-chalkboard-title-menu">
            
              <h1>{activeClass?activeClass.title:null}</h1>
              <IconButton style={{ color: "white", backgroundImage: 'linear-gradient(-20deg, transparent, #6d6b6b)', border: '3px ridge white'}} onClick={handleClick}>
                <MenuIcon />
              </IconButton>
            </div>

            <Menu
              id="simple-menu"
              anchorEl={dropdownDisplay}
              keepMounted
              open={Boolean(dropdownDisplay)}
              onClose={handleCloseMenu}
              getContentAnchorEl={null}
            >
              <MenuItem onClick={showAddStudentHandler}>Add Student</MenuItem>
              <MenuItem onClick={showFormatModalHandler}>
                Change Layout
              </MenuItem>
              <MenuItem onClick={handleShuffleClass}>Shuffle Class</MenuItem>

              <MenuItem onClick={handleDeleteMulti}>Delete Student(s)</MenuItem>
            </Menu>
          </div>
      </div>

      <Modal
        show={showAddStudentModal}
        onCancel={cancelAddStudentHandler}
        header={<div>Add students to {activeClass?activeClass.title:null} </div>}
        footerClass="worksheet-item__modal-actions"
        footer={
          <div className="add-student-button-container">
            <button className="add-student-button" onClick={handleNewStu}>ADD STUDENT(S)</button>
            </div>
        }
      >
        <TextField
          variant="filled"
          id="filled-basic"
          label={
            <span className="">Input student names, separated by a comma.</span>
          }
          name="inputNames"
          // type="number"
          value={props.inputNames}
          onChange={props.handleChange}
          className="text-area-styles"
          placeholder="John Smith, Jane Doe..."
          required
          style={{borderBottom: '2px solid purple !important',
            color:'purple'}}
          // style={{
          //     backgroundColor: "yellow"
          // }}
          // InputProps={{
          //     style: {
          //         color: "red"
          //     }
          // }}
          multiline
          rows={2}
          rowsMax={3}
        />
      </Modal>
      <Modal
        show={formatModal}
        onCancel={submitFormatModalHandler}
        header={<div>Change the layout of {activeClass?activeClass.title:null} </div>}
        footerClass="worksheet-item__modal-actions"
        // footer={
          // <React.Fragment>
          //   <button onClick={submitFormatModalHandler}>SUBMIT</button>
          // </React.Fragment>
        // }
      >
        <FormControl>
          <FormLabel>Icon Size</FormLabel>

          <RadioGroup
            aria-label="size"
            name="size"
            value={props.value}
            onChange={handleChange}
          >
            <FormControlLabel value="small" control={<Radio />} label="Small" />
            <FormControlLabel
              value="regular"
              control={<Radio />}
              label="Regular"
            />
          </RadioGroup>
        </FormControl>
        <FormControl>
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
          <InputLabel>Each {activeClass.styling.format === 'rows'?'row':'group'}</InputLabel>

          <Select
            className="select-form"
            value={activeClass?activeClass.styling.groups:null}
            name="groups"
            onChange={handleChange}
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
            style={{ width: "200px" }}
            value={activeClass?activeClass.styling.theme:null}
            onChange={props.handleThemeInput}
            width={20}
            displayEmpty
          >
            <MenuItem value="lightBlueGreen">Light Blue Green</MenuItem>
            <MenuItem value="lightBluePurple">Light Blue Purple</MenuItem>
            {/* <MenuItem value="darkPurpleBlue">Dark Blue Purple</MenuItem> */}
            <MenuItem value="brightRainbow">Bright Rainbow</MenuItem>
            <MenuItem value="pastelRainbow">Pastel Rainbow</MenuItem>
            <MenuItem value="green">Shades of Green</MenuItem>



          </Select>
          {/* <FormHelperText>Color Theme</FormHelperText> */}
        </FormControl>
      </Modal>

    </React.Fragment>
  );
};
const mapStateToProps = (state) => {
  return {
    activeClass: state.activeClass,
    classList: state.classList
  }
}
const mapDispatchToProps = (dispatch) => {
  return{
    handleUpdate: (temp, tempClassList) => {dispatch({type:'UPDATE_CLASS', temp,tempClassList })}
  }
}
export default connect(mapStateToProps, mapDispatchToProps)(ClassTitleMenu);
