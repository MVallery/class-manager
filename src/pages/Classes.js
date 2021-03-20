import React, { useEffect, useState } from "react";

import MenuItem from "@material-ui/core/MenuItem";
import FormHelperText from "@material-ui/core/FormHelperText";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";
import Radio from "@material-ui/core/Radio";
import RadioGroup from "@material-ui/core/RadioGroup";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import FormLabel from "@material-ui/core/FormLabel";
import InputLabel from "@material-ui/core/InputLabel";
import {cap} from '../app-files/general'
import ClassButtons from '../components/ClassButtons'
import "./Classes.css";
const Classes = (props) => {
  const [newNameListState, setNewNameListState] = useState([]);
  const [format, setFormat] = useState("");
  const [container, setContainer] = useState('row-container')
  console.log(props.names);
  console.log(props.generalSelection);
  // console.log(props.classDisplay[0]);
  // var newGridDisplay = props.classDisplay[0].map(row=>{ //did this bc styling wasn't working
  //   return <div className='grid-row'>{row}</div>
  // })

  let group;
  let groupContainer;
  const handleGroup = () => {
    if (format === "rows") {
      group = "row";
      groupContainer = "row-container";
      setContainer('row-container')
    } else {
      if (props.generalSelection.groups === 4) {
        group = "group4";
        groupContainer = "group-container4";
        setContainer('group-container4')
      } else if (
        props.generalSelection.groups === 5 ||
        props.generalSelection.groups === 6
      ) {
        group = "group56";
        groupContainer = "group-container56";
        setContainer('group-container56')
      } else if (props.generalSelection.groups === 7) {
        group = "group7";
        groupContainer = "group-container7";
        setContainer('group-container7')
      }
    }
  };
  const handleNewStu = () => {
    const newNameArray = this.state.inputNames.replace(/ /g, "").split(",");
    let temp = JSON.parse(JSON.stringify(this.state.nameList));

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
      temp.push(record);
    }
    this.setState({
      nameList: temp,
      inputNames: "",
    });
  };
  const handleFormatting = () => {
    console.log(format);
    console.log(props.names);
    console.log(props.generalSelection.groups);
    let formattedNameList = []; //this being there messes up the class showing? even if i'm not calling any of these variables
    for (let i = 0; i < props.names.length;i+=props.generalSelection.groups) {
      let newArray = props.names.slice(i, i+props.generalSelection.groups)
      // let newArray = props.names.splice(i, props.generalSelection.groups);
      formattedNameList.push(newArray);
    }
    console.log(formattedNameList);
    let newNameList = formattedNameList.map((array) => {
      return <div className={group}>{array}</div>;
    });
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
  }, [props.names, format, props.generalSelection.groups]);

  return (
    <React.Fragment>
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
      <div className={container}>{newNameListState}</div>
      <div className="multi-select-container">
        <div className="multi-select">
          <ClassButtons count={props.count} nameList = {props.nameList} handleState={props.handleState} />
        </div>
        <h1>Total Class Points: {props.count}</h1>
      </div>
    </React.Fragment>
  );
};

export default Classes;
