import React from "react";
import Grid from "../components/Grid";
import { cap } from "../app-files/general";
import MenuItem from "@material-ui/core/MenuItem";
import { makeStyles } from '@material-ui/core/styles';

import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";
import InputLabel from "@material-ui/core/InputLabel";

import {Link} from 'react-router-dom'
import './NewClass.css'
const useStyles = makeStyles((theme) => ({
  formControl: {
    margin: theme.spacing(1),
    minWidth: 100,
  },
  selectEmpty: {
    marginTop: theme.spacing(2),
  },
}));


const NewClass = (props) => {

  const classes = useStyles();

  // console.log(props.names);
  const handleSubmit = (props) => {
    // console.log(props.inputClassName)
    console.log('inputNames:',props.inputNames)
    console.log('classList:',props.classList)
    // if (
    //   (props.nameList.length > 0 &&
    //     window.confirm(
    //       "Are you sure? This will erase your other students! To add new students make sure to click Add Student instead"
    //     )) ||
    //   props.nameList.length === 0
    // ) {
      const nameArray = props.inputNames.replace(/, /g, ",").split(",");
      console.log('nameArray',nameArray)
      let nameOnlyResult = [];
      let result = [];

      for (let x = 0; x < nameArray.length; x++) {
        const randColor =
          "#" + Math.floor(Math.random() * 16777215).toString(16);
        const id = cap(nameArray[x]) + Math.floor(Math.random() * 20);
        let record = {
          name: cap(nameArray[x]),
          count: 0,
          background: randColor,
          key: id,
          isChecked: false,
          displayColorPicker: false,
        };
        result.push(record);
        nameOnlyResult.push(record.name);
      }
      // console.log('result:'+result)
      // console.log('inputClassName:'+props.inputClassName)
      let tempClassList = JSON.parse(JSON.stringify(props.classList))
      let tempClass = {title:props.inputClassName, students:result, count:0, generalSelection:{}, classSnapShot: []}

      tempClassList.push(tempClass)
      
      props.handleState({
        activeClass: tempClass,
        classList: tempClassList,
        nameOnlyList: nameOnlyResult,
        inputClassName: '',
        inputNames: "",
      });
    // }
  };
  const handleClassChange = (e) => {
    const {value}=e
    props.handleState({inputClassName:value})
  }
  return (
    <React.Fragment>
      <div className="new-class-container">
        <div className='names-rows-container'>
      <textarea
        onChange={props.handleChange}
        value={props.inputNames}
        name='inputNames'
        className="text-area-styles"
        placeholder="Separate names with Commas"
      />
      <input 
        onChange={props.handleChange}
        value={props.inputClassName}
        name='inputClassName'
        
      />
      <br />
      <FormControl className={classes.formControl}>
        <InputLabel>Rows:</InputLabel>

        <Select className={classes.formControl}
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
      {/* <input
        type="quantity"
        name="groups"
        onChange={props.handleInput}
        value={props.generalSelection.groups}
        placeholder="groups"
      ></input> */}
</div>
    <Link className="create-class-button" to='/classes'>      <button
        onClick={() => {
          handleSubmit(props);
        }}
      >Create Class
      </button>
</Link>

      {/* {props.names} */}
      {/* {newNameList} */}

      {/* <div className="new-name-list-container">{newNameList}</div> */}
      {/* <Grid names={props.names} handleClassDisplay={props.handleClassDisplay} /> */}
      </div>
    </React.Fragment>
  );
};

export default NewClass;
